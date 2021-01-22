import { Test, TestingModule } from '@nestjs/testing';
import { PfeSessionController } from './pfe-session.controller';

describe('PfeSessionController', () => {
  let controller: PfeSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PfeSessionController],
    }).compile();

    controller = module.get<PfeSessionController>(PfeSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
