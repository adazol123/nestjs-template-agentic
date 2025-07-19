import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'find_all_products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'find_product' })
  findOne(data: { id: string }) {
    return this.productsService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(data: { id: string } & UpdateProductDto) {
    const { id, ...updateProductDto } = data;
    return this.productsService.update(id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(data: { id: string }) {
    return this.productsService.remove(data.id);
  }
}