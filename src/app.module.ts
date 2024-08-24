import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { UsersCustomersModule } from './users-customers/users-customers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // this settings is optional -- would work  without it
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI,
      // 'mongodb+srv://chuksmanray94:QrDUm5c0pTGgHDeP@cluster0.hwixx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),

    UsersModule,
    EventsModule,
    UsersCustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
