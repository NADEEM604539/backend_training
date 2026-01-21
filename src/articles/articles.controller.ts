import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { retry } from 'rxjs';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(await this.articlesService.create(createArticleDto));
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
     const articles =await this.articlesService.findAll();
     return articles.map((article) => new ArticleEntity(article));

  }
  
  @Get(':id')
 @ApiOkResponse({ type: ArticleEntity }) 
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article= await this.articlesService.findOne(id);
    if(!article){
      throw new NotFoundException(`Article not found with id ${id}`);
    }
    // return new ArticleEntity(article);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
