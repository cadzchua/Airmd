import { Test, TestingModule } from '@nestjs/testing'
import { DummyModuleService } from './dummy-module.service'

describe('DummyModuleService', () => {
  let service: DummyModuleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DummyModuleService],
    }).compile()

    service = module.get<DummyModuleService>(DummyModuleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
