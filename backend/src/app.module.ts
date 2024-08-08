import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './database/datasource'
import { RouterModule, Routes } from '@nestjs/core'
import { DummyModuleModule } from './dummy-module/dummy-module.module'

const routes: Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'dummy-module',
        module: DummyModuleModule,
      },
    ],
  },
]

@Module({
  imports: [
    RouterModule.register(routes),
    TypeOrmModule.forRootAsync({
      useFactory: () => config,
    }),
    DummyModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
