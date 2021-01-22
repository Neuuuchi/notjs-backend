import { Test, TestingModule } from '@nestjs/testing';
import { FilierService } from './filier.service';

describe('FilierService', () => {
  let service: FilierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilierService],
    }).compile();

    service = module.get<FilierService>(FilierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
