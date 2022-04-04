import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { get } from 'http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserServiceService } from '../user-service/user-service.service';
import { catchError, map, tap } from 'rxjs/operators';

@Controller('users')
export class UserControllerController {

    constructor(private userService: UserServiceService){}

    // @Post()
    // create(@Body() user:User): Observable<User>{
    //     return this.userService.create(user);
    // }

    @Get()
    findAll(): Observable<User[]>{
        return this.userService.findAll();
    }

    // @Get(':id')
    // findOne(@Param() param): Observable<User>{
    //     return this.userService.findOne(param.id);
    // }

    // @Delete(':id')
    // delete(@Param('id') id:string): Observable<any>{
    //     return this.userService.delete(Number(id));
    // }

    @Put(':id')
    update(@Param('id') id:string, @Body() user:User): Observable<any>{
        return this.userService.update(Number(id),user);
    }

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }


}
