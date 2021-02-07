import { Controller, Get,Post,Put,Delete, Body, Req, UseGuards, Param } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {UpdateReservationDto} from './dto/update-reservation.dto';
import {DateDto} from './dto/date.dto';

import {ReservationsService} from './reservations.service'
import { Request } from 'express';
import { Schema as MongooseSchema } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';



@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}


@UseGuards(AuthGuard('jwt'))
@Get()
async me(@Req() request: Request): Promise<any>{
    return this.reservationsService.findAllFromUser(request.user);
}

@UseGuards(AuthGuard('jwt'))
@Post()
async create(@Body() createDto: CreateReservationDto, @Req() request: Request): Promise<any> {
    const userId = request.user;
    return await this.reservationsService.create(createDto, userId);
    
    
}

@Get('/date')
    get_date(@Body() date: DateDto): Promise<any> {
    return this.reservationsService.findAllFromDate(date.before, date.after);
}

@Get('all')
    async getAll(): Promise<any> {
    return this.reservationsService.findAll();
}
@Get()
    getByRoom(): string {
    return 'get all Reservations';
}
@UseGuards(AuthGuard('jwt'))
@Put()
    async update(@Body() reservation: UpdateReservationDto, @Req() request: Request): Promise<string> {
        /*
        Need if user has rights mechanism
        */
        return this.reservationsService.updateReservation(reservation, request.user);
}
@UseGuards(AuthGuard('jwt'))
@Delete()
    async delete(@Body() reservation: UpdateReservationDto, @Req() request: Request): Promise<string> {
        /*
        Need if user has rights mechanism
        */

    return this.reservationsService.removeReservation(reservation, request.user);
}

@UseGuards(AuthGuard('jwt'))
@Get('interval')
    async interval(@Body() reservation: any, @Req() request: Request): Promise<any>{       
        return this.reservationsService.getInterval(reservation._id, request.user)
    }
}
// 3cup 6$ 50
// 8.5 cup 16$ 50
 