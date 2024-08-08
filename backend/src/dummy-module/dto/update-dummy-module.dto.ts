import { PartialType } from '@nestjs/mapped-types'
import { CreateDummyModuleDto } from './create-dummy-module.dto'

export class UpdateDummyModuleDto extends PartialType(CreateDummyModuleDto) {}
