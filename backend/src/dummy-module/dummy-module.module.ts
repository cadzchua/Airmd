import { Module } from '@nestjs/common'
import { DummyModuleService } from './dummy-module.service'
import { DummyModuleController } from './dummy-module.controller'

@Module({
  controllers: [DummyModuleController],
  providers: [DummyModuleService],
})
export class DummyModuleModule {}
