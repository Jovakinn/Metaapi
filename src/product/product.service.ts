import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  public async insertProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title: title,
      description: desc,
      price: price,
    });
    const result = await newProduct.save();
    return result.id;
  }

  public async getAllProducts(): Promise<any> {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  public async getSingleProduct(productId: string): Promise<{
    id: string;
    title: string;
    description: string;
    price: number;
  }> {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  public async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<any> {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    await updatedProduct.save();
    return { message: 'An object was successfully updated.' };
  }

  public async deleteProduct(productId: string): Promise<any> {
    await this.productModel.deleteOne({ _id: productId }).exec();
    return { message: 'An object was successfully deleted.' };
  }

  private async findProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }
}
