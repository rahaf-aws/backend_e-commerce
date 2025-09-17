/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-images.entitiy';
import { CreateProductImagesDto } from './dto/create-product-images.dto';
import { UpdateProductImagesDto } from './dto/update-product-images.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly repo: Repository<ProductImage>,
  ) {}

  create(dto: CreateProductImagesDto) {
    const image = this.repo.create({
      ...dto,
      product: { id: dto.productID } as ProductImage['product'], // ربط بالمنتج
    });
    return this.repo.save(image);
  }

  findAll() {
    return this.repo.find({ relations: ['product'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['product'] });
  }

  async update(id: number, dto: UpdateProductImagesDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}