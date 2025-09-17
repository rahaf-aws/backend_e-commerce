/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductImagesDto } from './create-product-images.dto';

export class UpdateProductImagesDto extends PartialType(CreateProductImagesDto) {}