/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateProductImagesDto {
  @IsString()
  imageUrl: string;

  @IsNumber()
  productID: number;


}