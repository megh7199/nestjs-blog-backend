import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './guards/jwt-guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserServiceService } from 'src/user/user-service/user-service.service';
import { UserModule } from 'src/user/user.module';


@Module({
    imports:[forwardRef(()=>UserModule),
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory :async (configService:ConfigService) => ({
            secret:configService.get('JWT_SECRET') ,
            signOptions: {expiresIn:'10000s'}
        })
    })],
    providers: [AuthService,JwtAuthGuard,RolesGuard,JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
