import { Module } from '@nestjs/common';
import { PfeController } from './pfe.controller';
import { PfeService } from './pfe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pfe, PfeSchema } from './schemas/pfe.schema';
import { PfeSessionModule } from 'src/pfe-session/pfe-session.module';
import { UsersModule } from 'src/users/users.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pfe.name, schema: PfeSchema }]),
    PfeSessionModule,
    UsersModule,
    TagModule,
  ],
  providers: [PfeService],
  controllers: [PfeController],
})
export class PfeModule {}
