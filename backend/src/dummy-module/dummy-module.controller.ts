import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DummyModuleService } from './dummy-module.service'
import { CreateDummyModuleDto } from './dto/create-dummy-module.dto'
import { UpdateDummyModuleDto } from './dto/update-dummy-module.dto'

@Controller()
export class DummyModuleController {
  constructor(private readonly dummyModuleService: DummyModuleService) {}

  @Post()
  create(@Body() createDummyModuleDto: CreateDummyModuleDto) {
    return this.dummyModuleService.create(createDummyModuleDto)
  }

  @Get()
  findAll() {
    return this.dummyModuleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dummyModuleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDummyModuleDto: UpdateDummyModuleDto) {
    return this.dummyModuleService.update(+id, updateDummyModuleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dummyModuleService.remove(+id)
  }
}
