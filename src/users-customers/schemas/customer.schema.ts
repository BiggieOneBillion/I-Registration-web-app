import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose,  { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

export class Customer {
  @Prop({ required: true, ref: 'Event', type: mongoose.Schema.Types.ObjectId })
  eventId: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phoneNumber: number;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  barcodeId: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
