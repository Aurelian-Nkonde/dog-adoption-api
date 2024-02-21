import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('first function', () => {
    it('should return the string', () => {
      expect(appController.getFirst()).toBe('this is the first');
    });
  });

  describe('last function', () => {
    it('should receive the boolean true', () => {
      expect(appController.getLast()).toBe(true);
    });
  });
});
