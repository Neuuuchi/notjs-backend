import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { UsersModule } from 'src/users/users.module';


// Mongoose :
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservations.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]), UsersModule],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
