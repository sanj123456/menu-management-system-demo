import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'Title of the menu item' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Parent menu ID (optional)', required: false })
  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
