import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservations.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
    private readonly userService: UsersService ) {}

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
        
        const userModel = await this.userService.find(user);
        // if (!student) throw new NotFoundException('Student not found');
        if(userModel)
          createdReservation.user = userModel

        createdReservation.save()
        //await (await this.ReservationModel.findOneAndUpdate({_id: createdReservation._id}, {user: user} ).exec()).save();
        
        return {
          "duration": createdReservation.duration,
          "date": createdReservation.date,
          "subject": createdReservation.subject,
          "user": userModel.name
        }
        
      }
    }

    async findAllFromDate(before: Date,after: Date): Promise<any>{
      return  this.ReservationModel.find({
        "date": {
          $gte: before,
          $lte: after
          }
        })
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


      if(user.toString() !== (await this.getUserFromReservationId(reservation._id)).toString() ) {return "Not allowed";}
      const toModify = await this.ReservationModel.findById(reservation._id);
      let done = null;
   
      // toModify.date === reservation.date NOT WORKING SMH
      if (await this.dateIsAvailable(reservation.date) || (toModify.date.toISOString() == reservation.date.toString() ) ){
         done = await this.ReservationModel.findOneAndUpdate({ _id : reservation._id}, reservation).exec();
        if (done) return "Success";
      }
      return "Failed";    
    }

    async getInterval(reservation_id: any, user: any): Promise<any>{

    //don't touch this
    if(user.toString() !== (await this.getUserFromReservationId(reservation_id)).toString() ) {return "Not allowed";}
    const reservation = await this.ReservationModel.findById(reservation_id).exec();
    var end = new Date(new Date(reservation.date).getTime() + reservation.duration*60000)
    
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
