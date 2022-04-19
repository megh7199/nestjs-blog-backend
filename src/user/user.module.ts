import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service/user-service.service';
import { UserControllerController } from './user-controller/user-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './models/user.entity';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { DataModule } from 'src/data/data.module';
import DataService from 'src/data/service/data.service';
import DatabaseFile from 'src/data/models/databaseFile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    TypeOrmModule.forFeature([DatabaseFile]),
    AuthModule,
    DataModule
  ],
  providers: [UserServiceService,DataService],
  controllers: [UserControllerController],
  exports:[UserServiceService]
})
export class UserModule {}
