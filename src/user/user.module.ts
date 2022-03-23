import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service/user-service.service';
import { UserControllerController } from './user-controller/user-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './models/user.entity';
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
  ],
  providers: [UserServiceService],
  controllers: [UserControllerController]
})
export class UserModule {}
