import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { userEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { switchMap, map, catchError } from 'rxjs/operators';
import DataService from 'src/data/service/data.service';

@Injectable()
export class UserServiceService {

    constructor(
        @InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>,
        private authService:AuthService,
        private readonly dataService: DataService
    ){}

    create(user:User):Observable<User>{
        //return from(this.userRepository.save(user));
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new userEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = user.role;
               // newUser.role = UserRole.USER;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    // findOne(id:number): Observable<User>{
    //     return from(this.userRepository.findOne(id));
    // }

    // findAll(): Observable<User[]>{
    //     return from(this.userRepository.find());
    // }

    update(id:number,user:User): Observable<any>{
        return from(this.userRepository.update(id,user));
    }

    updateUserRole(id:number,user:User):Observable<any>{
        return from(this.userRepository.update(id,user));
    }
    // delete(id:number): Observable<any>{
    //     return from(this.userRepository.delete(id));
    // }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({id})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            } )
        )
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) {/*delete v.password*/});
                return users;
            })
        );
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        //delete user.role;

        return from(this.userRepository.update(id, user)).pipe(
            switchMap(() => this.findOne(id))
        );
    }

    
    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepository.findOne({email})).pipe(map((user:User) => {
            if(user)
            return user;
            else
            throw new UnauthorizedException("wrong username")}),
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw new UnauthorizedException("wrong password");
                    }
                })
            ))
        )

    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOne({email}));
    }
    
    uploadFile(filename:string,buffer:any){
        return this.dataService.uploadDatabaseFile(filename,buffer);
    }
}
