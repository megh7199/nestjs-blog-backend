import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { get } from 'http';
import { Observable, of } from 'rxjs';
import { SampleDto, User, userRoles } from '../models/user.interface';
import { UserServiceService } from '../user-service/user-service.service';
import { catchError, map, tap } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
const fs = require('fs')
var nxlsx = require('node-xlsx');
var XLSX = require("xlsx");

export const storage = {
    storage: diskStorage({
        destination: './upload',
        // filename: (req, file, cb) => {
        //     const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        //     const extension: string = path.parse(file.originalname).ext;

        //     cb(null, `${filename}${extension}`)
        // }
    })

}

@Controller('users')
export class UserControllerController {

    constructor(private userService: UserServiceService){}

    // @Post()
    // create(@Body() user:User): Observable<User>{
    //     return this.userService.create(user);
    // }
    @hasRoles(userRoles.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
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
    @hasRoles(userRoles.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(':id/role')
    updateUserRole(@Param('id') id:string, @Body() user:User): Observable<User>{
        return this.userService.updateUserRole(Number(id),user);
    }

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


    
    // @Post('file')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile( @UploadedFile() file: Express.Multer.File) {
    // return {"message":"success"};
    // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file): any {
        //let data = fs.createReadStream(file.path,'utf8');
        
        // const data = fs.readFileSync(file.path);
        // console.log(data);
        
        // fs.readFile(file.path, function(err,data){
        //     if (!err) {
        //         console.log('received data: ' + data);
        //     } else {
        //         console.log(err);
        //     }
        // });
        
        var data = nxlsx.parse(file.path);
        var d0=data[0];
        console.log(d0);
        // for(var d=0;d<d0.data.length; d++){
        //     console.log(d0.data[d][0]);
        // }

        //data.toString('utf8');
        
        //console.log(data['Sheets']['Sheet1']['!ref']);
        // console.log(range['e']['r']);
        
        //return this.userService.uploadFile(file.originalname,data);

        // const data = XLSX.readFile(file.path)
        // const range = XLSX.utils.decode_range(data['Sheets']['Sheet1']['!ref']);
        // console.log(data['SheetNames']);
    }

}
