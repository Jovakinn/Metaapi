import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  public getAllProducts(): any {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  public getProduct(@Param('id') productId: string): any {
    return this.productService.getSingleProduct(productId);
  }

  @Patch(':id')
  public updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): any {
    return this.productService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
  }

  @Delete(':id')
  public deleteProduct(@Param('id') productId: string): any {
    return this.productService.deleteProduct(productId);
  }
}
