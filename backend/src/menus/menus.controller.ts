import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Menu } from '@prisma/client';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'List of menus retrieved successfully.' })
  @ApiQuery({ name: 'depth', required: false, description: 'Filter menus by depth level', type: Number })
  @ApiQuery({ name: 'parent_id', required: false, description: 'Filter menus by depth level', type: Number })
  @Get()
  findAll(
    @Query('depth') depth?: number,
    @Query('parent_id') parent_id?: number,
  ): Promise<Menu[]> {
    return this.menusService.findAll({
      depth: depth ?? undefined,
      parent_id: parent_id ?? undefined
    });
  }

  @ApiOperation({ summary: 'Get a specific menu by ID' })
  @ApiParam({ name: 'id', description: 'ID of the menu item' })
  @ApiResponse({ status: 200, description: 'Menu retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Menu> {
    const menu = await this.menusService.findOne(+id);
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return menu;
  }

  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({ status: 201, description: 'Menu created successfully.' })
  @ApiResponse({ status: 404, description: 'Parent menu item not found.' })
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    if (createMenuDto.parent_id !== undefined && createMenuDto.parent_id !== null) {
      await this.menusService.findOne(createMenuDto.parent_id); // Common check
    }
    return this.menusService.create(createMenuDto);
  }

  @ApiOperation({ summary: 'Update a menu item' })
  @ApiParam({ name: 'id', description: 'ID of the menu item to update' })
  @ApiResponse({ status: 200, description: 'Menu updated successfully.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @ApiResponse({ status: 404, description: 'Parent menu item not found.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {

    // If the update contains a parent_id, check if it exists
    if (updateMenuDto.parent_id) {
      await this.menusService.findOne(updateMenuDto.parent_id);
    }

    return this.menusService.update(+id, updateMenuDto);
  }

  @ApiOperation({ summary: 'Delete a menu item' })
  @ApiParam({ name: 'id', description: 'ID of the menu item to delete' })
  @ApiResponse({ status: 200, description: 'Menu deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }

  @ApiOperation({ summary: 'Get available parent menus for a specific menu' })
  @ApiParam({ name: 'id', description: 'ID of the menu item' })
  @ApiResponse({ status: 200, description: 'List of available parents retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @Get(':id/available-parents')
  async getAvailableParents(@Param('id') id: string): Promise<Menu[]> {
    const availableParents = await this.menusService.getAvailableParents(+id);
    if (!availableParents) {
      throw new NotFoundException('Menu not found');
    }
    return availableParents;
  }
}
