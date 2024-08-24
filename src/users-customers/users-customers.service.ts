import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUsersCustomerDto } from './dto/create-users-customer.dto';
import { UpdateUsersCustomerDto } from './dto/update-users-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UsersCustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}
  async create(createUsersCustomerDto: CreateUsersCustomerDto) {
    try {
      // check if customer already exist for this particular event
      // we do this by checking if the customer is in the db, and if so, we check if it is for the same event and if true. We stop the registeration process and throw an error. 
      const check = await this.customerModel.findOne({
        email: createUsersCustomerDto.email,
        eventId: createUsersCustomerDto.eventId,
      });

      console.log(check);

      if (check) {
        throw new NotAcceptableException('User Already Exits');
      }
      // create customer
      const customer = new this.customerModel(createUsersCustomerDto);
      // save the customer object in the database
      await customer.save();
      // if saved properly, then return the customer object
      return { message: 'Customer registered successfully', customer };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        // Handle validation errors
        const errorMessages = Object.values(error.errors).map(
          (error) => error.message,
        );
        throw new BadRequestException(
          'Invalid request',
          errorMessages.join(', '),
        );
      } else {
        // handle other errors (e.g database connection issues)
        console.error(error);
        throw new InternalServerErrorException('Internal Server Error');
        // return { message: 'Internal Server Error' };
      }
    }
  }

  findAll() {
    return `This action returns all usersCustomers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersCustomer`;
  }

  update(id: number, updateUsersCustomerDto: UpdateUsersCustomerDto) {
    return `This action updates a #${id} usersCustomer`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersCustomer`;
  }
}
