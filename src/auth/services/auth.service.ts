import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly JWTService:JwtService){}

    generateJWT(user: User): Observable <string> {
        return from(this.JWTService.signAsync({user}));
    }

    hashPassword(password: string): Observable <string> {
        return from<string>(bcrypt.hash(password, 12));

    }

    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(bcrypt.compare(newPassword, passwortHash));
    }
}