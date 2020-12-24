import { Controller, Get, Post, Put, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersModule } from './users.module';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { request, Request } from 'express';
import { strict } from 'assert';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@UseGuards(AuthGuard('jwt'))
@Get('me')
 async me(@Req() request: Request): Promise<User> {
    return await this.usersService.getUser(request.user);
  }

// Create
@Post('signup')
async register(@Body() createUserDto: CreateUserDto): Promise<string> {
    var result = await this.usersService.create(createUserDto);
    return result.name + ' created';
}
@Post('login')
async login(@Body() loginDto: UserLoginDto): Promise<any> {

    return await this.usersService.userLogin(loginDto);
}

@UseGuards(AuthGuard('jwt')) // To add guard on the token
@Get('testauth')
    get(@Req() request: Request
): string {
    return request.body.test ;
}
@Get('test')
    getAll(): Promise<User[]> {
    return this.usersService.getAll();
}

// Update
/*
* updates occur only in the following order:
email -> name -> role.
*/
@UseGuards(AuthGuard('jwt'))
@Put('update')
async update(@Req() request: Request): Promise<string> {
    var userName = request.body.name ;
    var userEmail = request.body.email ;
    var userRole = request.body.role;
    var userId = request.user;
    var payload = {}
    
    if(userEmail != undefined){
        payload["email"] = userEmail;
    }
    if(userName != undefined){
        payload["name"] = userName;
    }
    if(userRole != undefined){
        payload["role"] = userRole;
    }
    return this.usersService.updateUser(userId, payload);
}

// Remove
@UseGuards(AuthGuard('jwt'))
@Delete('delete')
    async delete(@Req() request: Request): Promise<string> {
        var userId = request.user;
        return this.usersService.removeUser(userId);
}

@Post()
    import(): String {
        return 'import users from xmls';
    }
@Get()
    export(): String {
        return 'import users from xmls';
    }
}
