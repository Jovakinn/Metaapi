import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  public insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  public getAllProducts(): Product[] {
    return [...this.products];
  }

  public getSingleProduct(productId: string): any {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  public updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): any {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
    return { message: 'An object was successfully updated.' };
  }

  public deleteProduct(productId: string): any {
    const index = this.findProduct(productId)[1];
    this.products.splice(index, 1);
    return { message: 'An object was successfully deleted.' };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
