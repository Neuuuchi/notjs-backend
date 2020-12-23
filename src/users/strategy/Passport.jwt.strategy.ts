import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


export class PassportJwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // token must be added in auth bearer token in req
      secretOrKey: process.env.SECRET_KEY
    });
  }

  async validate(payload) {
    const user = await this.userModel.findOne({email: payload.email});
    if (user) {
      return user._id; //Add what u want to be returned in ny request user.id for exple
    } else {
      throw new UnauthorizedException();
    }
  }
}