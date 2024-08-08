import { Injectable } from '@nestjs/common'
import { CreateDummyModuleDto } from './dto/create-dummy-module.dto'
import { UpdateDummyModuleDto } from './dto/update-dummy-module.dto'

@Injectable()
export class DummyModuleService {
  create(createDummyModuleDto: CreateDummyModuleDto) {
    return 'This action adds a new dummyModule'
  }

  findAll() {
    return `This action returns all dummyModule`
  }

  findOne(id: number) {
    return `This action returns a #${id} dummyModule`
  }

  update(id: number, updateDummyModuleDto: UpdateDummyModuleDto) {
    return `This action updates a #${id} dummyModule`
  }

  remove(id: number) {
    return `This action removes a #${id} dummyModule`
  }
}
