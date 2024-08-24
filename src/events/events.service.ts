import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './schemas/events.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    try {
      // create the event obj from the this.eventModel
      const event = new this.eventModel(createEventDto);
      // save the event to the database
      const saveEvent = await event.save();
      // if successful then return the saved event
      return { message: 'Event Created', event: saveEvent };
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

  async findAll() {
    try {
      const events = await this.eventModel.find().populate('user').exec();
      // const events = await this.eventModel.find().populate({
      //   path: 'user',
      //   model: 'User',
      //   select: '_id name email',
      // });

      // console.log(events);

      if (!events) {
        throw new NotFoundException('Resources not found');
      }

      return { message: 'successful', data: events };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.eventModel
        .findById({ _id: id })
        .populate('user');
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException('Invalid request', error.errors);
      } else if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestException('Incorrect user id data type');
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: string) {
    try {
      const deletedEvent = await this.eventModel
        .findByIdAndDelete({ _id: id })
        .exec();
      if (!deletedEvent) {
        throw new NotFoundException('Event not found');
      }
      return { message: 'Event deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
