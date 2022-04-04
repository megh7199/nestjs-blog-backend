import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service/user-service.service';
import { UserControllerController } from './user-controller/user-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './models/user.entity';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    AuthModule
  ],
  providers: [UserServiceService],
  controllers: [UserControllerController]
})
export class UserModule {}
