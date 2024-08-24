import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  userId: string; // id of the user who created the event
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  type:
    | 'Wedding'
    | 'Kids Show'
    | 'Church Events'
    | 'Adult Show'
    | 'All Ages'
    | 'Educational'
    | 'Conference'
    | 'Entertainment';
  @Prop({ required: true })
  noOfAttendees: number;
  @Prop({ required: true })
  date: string;
  @Prop({ required: true })
  startTimes: string[];
  @Prop({ required: true })
  endTimes: string[];
  @Prop({ required: true })
  eventImg: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  // Add a virtual field to populate the user document
  // @Prop({
  //   virtual: true,
  //   ref: 'User',
  //   localField: 'userId',
  //   foreignField: '_id',
  // })
  // @Prop({virtual: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;


}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('user', {
  ref: 'User',               // The model to use
  localField: 'userId',         // The field in the Event schema
  foreignField: '_id',    // The field in the User schema that matches `localField`
});

EventSchema.set('toJSON', { virtuals: true });
EventSchema.set('toObject', { virtuals: true });
