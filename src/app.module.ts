import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';

require('dotenv').config();

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      synchronize:true,
      autoLoadEntities:true,
      url: ''
    }),
    UserModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
