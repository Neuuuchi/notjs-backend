import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { exception } from 'console';

@Injectable()
export class UsersService {
  wasAltered: Boolean;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = new this.userModel(createUserDto);
    userCreated.password = await hash(userCreated.password,10);
    return userCreated.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
  async getUser(userId: any): Promise<User> {
    return await this.userModel.findOne({_id: userId}).exec();
  }

  async userLogin(loginDto: UserLoginDto): Promise<any> {
    let user = await this.userModel.findOne({ email: loginDto.email }).exec();
    if (!user)
      throw new NotFoundException('Email not found');
    if(await compare(loginDto.password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
      }
      const jwt = this.jwtService.sign(payload);
      return {
        "access_token": jwt
      }
    }
    else
      throw new NotFoundException('Incorrect Pass');
  }

  async removeUser(userId: any): Promise<string>{
    
    var user = this.getUser(userId);
    var name = ""
    try{
      name = (await user).name
    }catch(TypeError){
      throw new NotFoundException("User not found");
    }
    this.userModel.findOneAndDelete({_id: userId}).exec();
    /*
      * Consider adding a mechanism that notifies the AuthToken that this user is not longer
      * connected, and the token should no longer be accepted.
    */
    return "Successfully deleted user: "+name;
  }


  async updateUser(userId: any, payload: any): Promise<string>{
    //var user = this.getUser(userId);
    const filter = {_id: userId}
    let user = await this.userModel.findOneAndUpdate(filter, payload, {new:false})

    if(user) return "Updated user name successfully.";
    //else
      throw new NotFoundException("User not found");
    
  }

}
