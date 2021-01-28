import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservations.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';


@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>) {}

    async findOne(params): Promise<Reservation>{
        return this.ReservationModel.findOne(params)
    }

    private async dateIsAvailable(dateParam){
        const found = await this.ReservationModel.findOne({date: dateParam }).exec();
        return (found == null);
    }

    async create(createReservationDto: CreateReservationDto, user?: any): Promise<any> {
      const available = await this.dateIsAvailable(createReservationDto.date);
        if(available){
        let createdReservation = new this.ReservationModel(createReservationDto);
        if(user)
          createdReservation.user = user

        createdReservation.save()
        //await (await this.ReservationModel.findOneAndUpdate({_id: createdReservation._id}, {user: user} ).exec()).save();
        return createdReservation;
      }
      return -1;
    }

    private async getUserFromReservationId(id): Promise<any>{
      return (await this.ReservationModel.findById(id).exec()).user;
    }

    async findAll(): Promise<Reservation[]> {
      return this.ReservationModel.find().exec();
    }

    async findAllFromUser(user): Promise<Reservation[]>{
      return this.ReservationModel.find({user: user}).exec();
    }

    async removeReservation(reservation: any, user: any): Promise<string>{ 
      
      // if(user != this.getUserFromReservationId(reservation._id)) return "Not allowed";
      const done = await this.ReservationModel.findOneAndDelete(reservation).exec();
      if(done) return "Success";
      return "Failed.";

    }

    async updateReservation(reservation: any, user: any): Promise<string>{
      let available = true;
      if(reservation.date)
         available = await this.dateIsAvailable(reservation.date);
      
      //if(user != await this.getUserFromReservationId(reservation._id) ) {return "Not allowed";}
      const toModify = await this.ReservationModel.findById(reservation._id);
      let done = null;
      if (await this.dateIsAvailable(reservation.date) || (toModify.date == reservation.date) ){
         done = await this.ReservationModel.findOneAndUpdate({ _id : reservation._id}, reservation).exec();
        if(done) return "Success";
      }
      return "Failed";    
    }

    async getInterval(reservation_id: any, user: any): Promise<any>{
    //if(user != await this.getUserFromReservationId(reservation_id) ) {return "Not allowed";}
    const reservation = await this.ReservationModel.findById(reservation_id);
    var end = new Date(new Date(reservation.date.toString()).getTime() + reservation.duration*60000)
    
    return {
        "start" : reservation.date,
        "end" : end.toISOString()
      }
    }

    /*
    private resetDB(){
      for (let x of await this.ReservationModel.find().exec())
        await x.remove();
        return 0;
    }
    */
}
