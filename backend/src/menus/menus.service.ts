import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from '@prisma/client';

interface PrismaMenu extends Menu {
  path: any;
  children?: PrismaMenu[];
}

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get the menu tree
   * @param depth Maximum depth of the tree
   * @param parent_id ID of the parent menu
   */
  async getMenu({ depth, parent_id }: { depth?: number; parent_id?: number }): Promise<PrismaMenu[]> {
    let query = `
      WITH RECURSIVE menu_tree AS (
        SELECT 
          id,
          title,
          parent_id,  
          0 AS depth,
          ARRAY[]::integer[] AS path
        FROM "Menu"
        WHERE ${parent_id !== undefined ? `parent_id = ${parent_id}` : `parent_id IS NULL`}
  
        UNION ALL
    
        SELECT 
          m.id,
          m.title,
          m.parent_id,  
          mt.depth + 1 AS depth,
          mt.path || m.parent_id AS path
        FROM "Menu" m
        INNER JOIN menu_tree mt ON m.parent_id = mt.id
      )
      SELECT * FROM menu_tree
    `;

    const conditions: string[] = [];

    if (depth !== undefined) {
      conditions.push(`depth <= ${depth}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY id`;

    return this.prisma.$queryRawUnsafe<PrismaMenu[]>(query);
  }

  /**
   * Get the list of available parents for a given menu
   * Excludes the menu itself and its descendants
   * @param id ID of the menu for which to get available parents
   */
  async getAvailableParents(id: number): Promise<PrismaMenu[]> {
    const query = `
      WITH RECURSIVE menu_tree AS (
        SELECT id, parent_id
        FROM "Menu"
        WHERE id = ${id}
        
        UNION ALL
        
        SELECT m.id, m.parent_id
        FROM "Menu" m
        INNER JOIN menu_tree mt ON m.parent_id = mt.id
      )
      SELECT * 
      FROM "Menu"
      WHERE id NOT IN (SELECT id FROM menu_tree)
      ORDER BY title
    `;

    return this.prisma.$queryRawUnsafe<PrismaMenu[]>(query);
  }

  /**
   * Get all menus including their children (recursive)
   */
  async findAll({ depth, parent_id }: { depth?: number; parent_id?: number }): Promise<PrismaMenu[]> {
    const menus = await this.getMenu({ depth, parent_id });
    return this.buildMenuTree(menus);
  }

  private buildMenuTree(menus: PrismaMenu[]): PrismaMenu[] {
    const menuMap = new Map<number, PrismaMenu>();
    const rootMenus: PrismaMenu[] = [];

    menus.forEach(menu => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });

    menus.forEach(menu => {
      if (menu.path.length === 0) {
        rootMenus.push(menuMap.get(menu.id)!);
      } else {
        const parent = menuMap.get(menu.parent_id);
        if (parent) {
          parent.children!.push(menuMap.get(menu.id)!);
        }
      }
    });

    return rootMenus;
  }

  /**
   * Get a single menu by ID
   * @param id ID of the menu
   */
  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  /**
   * Create a new menu
   * @param createMenuDto Data to create the menu
   */
  async create(createMenuDto: CreateMenuDto) {
    const { title, parent_id } = createMenuDto;
    return this.prisma.menu.create({
      data: {
        title,
        parent_id,
      },
    });
  }

  /**
   * Update an existing menu by ID
   * @param id ID of the menu to update
   * @param updateMenuDto Data to update the menu
   */
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menuToUpdate = await this.prisma.menu.findUnique({
      where: { id },
    });

    if (!menuToUpdate) {
      throw new NotFoundException('Menu not found');
    }

    if (updateMenuDto.parent_id === id) {
      throw new BadRequestException('Menu cannot be its own parent');
    }

    if (updateMenuDto.parent_id) {
      const availableParents = await this.getAvailableParents(id);
      const parentIds = availableParents.map(parent => parent.id);
      if (!parentIds.includes(updateMenuDto.parent_id)) {
        throw new BadRequestException('Menu cannot be its own descendant');
      }
    }

    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  /**
   * Delete a menu by ID
   * @param id ID of the menu to delete
   */
  async remove(id: number) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
