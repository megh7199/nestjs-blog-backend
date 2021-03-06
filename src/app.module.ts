import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { DataModule } from './data/data.module';

require('dotenv').config();

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      synchronize:true,
      autoLoadEntities:true,
      url: process.env.DATABASE_URL
      //'postgres://vfrisdgx:bPljy1eQJNbNYmhokjnbOhPBKgRFgwjn@satao.db.elephantsql.com/vfrisdgx'
    }),
    UserModule,
    AuthModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
