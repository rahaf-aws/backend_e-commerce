/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors,
  UploadedFile,
  ParseIntPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductImagesService } from './product-images.service';
import { CreateProductImagesDto } from './dto/create-product-images.dto';
import { UpdateProductImagesDto } from './dto/update-product-images.dto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductImagesDto: CreateProductImagesDto
  ) {
    if (file) {
      createProductImagesDto.imageUrl = `uploads/products/${file.filename}`;
    }
    return this.productImagesService.create(createProductImagesDto);
  }

  @Get()
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productImagesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductImagesDto: UpdateProductImagesDto
  ) {
    if (file) {
      updateProductImagesDto.imageUrl = `uploads/products/${file.filename}`;
    }
    return this.productImagesService.update(id, updateProductImagesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productImagesService.remove(id);
  }
}