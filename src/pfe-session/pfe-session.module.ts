import { Module } from '@nestjs/common';
import { PfeSession, PfeSessionSchema } from './schemas/pfe-session.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PfeSessionController } from './pfe-session.controller';
import { PfeSessionService } from './pfe-session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PfeSession.name, schema: PfeSessionSchema },
    ]),
  ],
  providers: [PfeSessionService],
  exports: [PfeSessionService],
  controllers: [PfeSessionController],
})
export class PfeSessionModule {}
