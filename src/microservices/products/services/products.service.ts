import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
      updatedAt: new Date(),
    };
    
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  remove(id: string): { success: boolean } {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    this.products.splice(productIndex, 1);
    return { success: true };
  }
}