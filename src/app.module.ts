import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { DocumentsModule } from './documents/documents.module';
import { ArchivedDocumentsModule } from './archived-documents/archived-documents.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureService } from './azure/azure.service';
import { PfeModule } from './pfe/pfe.module';
import { CompanyModule } from './company/company.module';
import { FilierService } from './filier/filier.service';
import { TagService } from './tag/tag.service';
import { PfeSessionService } from './pfe-session/pfe-session.service';
import { PfeSessionController } from './pfe-session/pfe-session.controller';
import { PfeSessionModule } from './pfe-session/pfe-session.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    ReservationsModule,
    DocumentsModule,
    ArchivedDocumentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.ofoym.mongodb.net/pfeDatabase?retryWrites=true&w=majority',
    ),
    PfeModule,
    CompanyModule,
    PfeSessionModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService, AzureService, FilierService],
})
export class AppModule {}
