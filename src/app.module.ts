import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

require('dotenv').config();

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      synchronize:true,
      autoLoadEntities:true,
      url: 'postgres://vfrisdgx:bPljy1eQJNbNYmhokjnbOhPBKgRFgwjn@satao.db.elephantsql.com/vfrisdgx'
    }),
    UserModule,
    AuthModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
