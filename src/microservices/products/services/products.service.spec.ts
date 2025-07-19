import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
      };

      const product = service.create(createProductDto);
      expect(product).toHaveProperty('id');
      expect(product.name).toEqual(createProductDto.name);
      expect(product.description).toEqual(createProductDto.description);
      expect(product.price).toEqual(createProductDto.price);
      expect(product.stock).toEqual(createProductDto.stock);
      expect(product).toHaveProperty('createdAt');
      expect(product).toHaveProperty('updatedAt');
    });
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
      };

      service.create(createProductDto);
      const products = service.findAll();
      expect(products).toBeInstanceOf(Array);
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a product if it exists', () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
      };

      const createdProduct = service.create(createProductDto);
      const foundProduct = service.findOne(createdProduct.id);
      expect(foundProduct).toEqual(createdProduct);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product if it exists', () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
      };

      const updateProductDto = {
        name: 'Updated Product',
        price: 199.99,
      };

      const createdProduct = service.create(createProductDto);
      const updatedProduct = service.update(createdProduct.id, updateProductDto);
      expect(updatedProduct.name).toEqual(updateProductDto.name);
      expect(updatedProduct.price).toEqual(updateProductDto.price);
      expect(updatedProduct.description).toEqual(createdProduct.description);
    });

    it('should throw NotFoundException if product does not exist', () => {
      const updateProductDto = {
        name: 'Updated Product',
      };

      expect(() => service.update('non-existent-id', updateProductDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product if it exists', () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
      };

      const createdProduct = service.create(createProductDto);
      const result = service.remove(createdProduct.id);
      expect(result).toEqual({ success: true });
      expect(() => service.findOne(createdProduct.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.remove('non-existent-id')).toThrow(NotFoundException);
    });
  });
});