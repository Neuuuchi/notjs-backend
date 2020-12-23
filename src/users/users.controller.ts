import { Controller, Get, Post, Put, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersModule } from './users.module';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@UseGuards(AuthGuard('jwt'))
@Get('me')
 async me(@Req() request: Request): Promise<User> {
        return await this.usersService.getUser(request.user);
  }

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
@Put()
    update(): string {
    return 'get user info';
}
@Delete()
    delete(): string {
    return 'remove';
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
