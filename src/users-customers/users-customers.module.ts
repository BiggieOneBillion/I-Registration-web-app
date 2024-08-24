import { Module } from '@nestjs/common';
import { UsersCustomersService } from './users-customers.service';
import { UsersCustomersController } from './users-customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [UsersCustomersController],
  providers: [UsersCustomersService],
})
export class UsersCustomersModule {}
