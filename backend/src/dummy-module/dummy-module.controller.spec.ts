import { Test, TestingModule } from '@nestjs/testing'
import { DummyModuleController } from './dummy-module.controller'
import { DummyModuleService } from './dummy-module.service'

describe('DummyModuleController', () => {
  let controller: DummyModuleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DummyModuleController],
      providers: [DummyModuleService],
    }).compile()

    controller = module.get<DummyModuleController>(DummyModuleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
