import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = service.create(createUserDto);
      expect(user).toHaveProperty('id');
      expect(user.name).toEqual(createUserDto.name);
      expect(user.email).toEqual(createUserDto.email);
      expect(user.password).toEqual(createUserDto.password);
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      service.create(createUserDto);
      const users = service.findAll();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a user if it exists', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
}).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: process.env.TEST_USER_PASSWORD, // Use environment variable for test password
      };

      const user = service.create(createUserDto);
      expect(user).toHaveProperty('id');
      expect(user.name).toEqual(createUserDto.name);
      expect(user.email).toEqual(createUserDto.email);
      expect(user.password).toEqual(createUserDto.password);
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: process.env.TEST_USER_PASSWORD, // Use environment variable for test password
      };

      service.create(createUserDto);
      const users = service.findAll();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a user if it exists', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: process.env.TEST_USER_PASSWORD, // Use environment variable for test password
      };

      const createdUser = service.create(createUserDto);
      const foundUser = service.findOne(createdUser.id);
      expect(foundUser).toEqual(createdUser);
    });

    it('should throw NotFoundException if user does not exist', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user if it exists', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: process.env.TEST_USER_PASSWORD, // Use environment variable for test password
      };

      const updateUserDto = {
        name: 'Updated User',
      };

      const createdUser = service.create(createUserDto);
      const updatedUser = service.update(createdUser.id, updateUserDto);
      expect(updatedUser.name).toEqual(updateUserDto.name);
      expect(updatedUser.email).toEqual(createdUser.email);
    });

    it('should throw NotFoundException if user does not exist', () => {
      const updateUserDto = {
        name: 'Updated User',
      };

      expect(() => service.update('non-existent-id', updateUserDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user if it exists', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: process.env.TEST_USER_PASSWORD, // Use environment variable for test password
      };

      const createdUser = service.create(createUserDto);
      const result = service.remove(createdUser.id);
      expect(result).toEqual({ success: true });
      expect(() => service.findOne(createdUser.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user does not exist', () => {
      expect(() => service.remove('non-existent-id')).toThrow(NotFoundException);
    });
  });
});
      };

      const createdUser = service.create(createUserDto);
      const foundUser = service.findOne(createdUser.id);
      expect(foundUser).toEqual(createdUser);
    });

    it('should throw NotFoundException if user does not exist', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user if it exists', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const updateUserDto = {
        name: 'Updated User',
      };

      const createdUser = service.create(createUserDto);
      const updatedUser = service.update(createdUser.id, updateUserDto);
      expect(updatedUser.name).toEqual(updateUserDto.name);
      expect(updatedUser.email).toEqual(createdUser.email);
    });

    it('should throw NotFoundException if user does not exist', () => {
      const updateUserDto = {
        name: 'Updated User',
      };

      expect(() => service.update('non-existent-id', updateUserDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user if it exists', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const createdUser = service.create(createUserDto);
      const result = service.remove(createdUser.id);
      expect(result).toEqual({ success: true });
      expect(() => service.findOne(createdUser.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user does not exist', () => {
      expect(() => service.remove('non-existent-id')).toThrow(NotFoundException);
    });
  });
});