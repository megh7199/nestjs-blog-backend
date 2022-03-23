import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserServiceService } from '../user-service/user-service.service';

@Controller('users')
export class UserControllerController {

    constructor(private userService: UserServiceService){}

    @Post()
    create(@Body() user:User): Observable<User>{
        return this.userService.create(user);
    }

    @Get()
    findAll(): Observable<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() param): Observable<User>{
        return this.userService.findOne(param.id);
    }

    @Delete(':id')
    delete(@Param('id') id:string): Observable<any>{
        return this.userService.delete(Number(id));
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() user:User): Observable<any>{
        return this.userService.update(Number(id),user);
    }
}
