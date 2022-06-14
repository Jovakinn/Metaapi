import { Test, TestingModule } from '@nestjs/testing';
import { Auth.ControllerController } from './auth.controller.controller';

describe('Auth.ControllerController', () => {
  let controller: Auth.ControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth.ControllerController],
    }).compile();

    controller = module.get<Auth.ControllerController>(Auth.ControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
