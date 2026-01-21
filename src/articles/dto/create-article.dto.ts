// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString,  } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  authorId?: number;
  
}
