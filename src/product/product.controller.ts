import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): Promise<any> {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  public async getAllProducts(): Promise<any> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  public async getProduct(@Param('id') productId: string): Promise<any> {
    return await this.productService.getSingleProduct(productId);
  }

  @Patch(':id')
  public async updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): Promise<any> {
    return await this.productService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
  }

  @Delete(':id')
  public async deleteProduct(@Param('id') productId: string): Promise<any> {
    return await this.productService.deleteProduct(productId);
  }
}
