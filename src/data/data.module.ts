import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFile from './models/databaseFile.entity';
import DataService from './service/data.service';

@Module({
  imports:[TypeOrmModule.forFeature([DatabaseFile])],
  providers: [DataService]
})
export class DataModule {}
