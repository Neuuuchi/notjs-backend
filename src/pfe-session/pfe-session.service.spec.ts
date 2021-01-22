import { Test, TestingModule } from '@nestjs/testing';
import { PfeSessionService } from './pfe-session.service';

describe('PfeSessionService', () => {
  let service: PfeSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PfeSessionService],
    }).compile();

    service = module.get<PfeSessionService>(PfeSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
