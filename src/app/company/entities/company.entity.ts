import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Schema()
export class Company {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  // @Field(() => [User])
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }]})
  // employees: User[];

  // @Field(() => Date)
  // @Prop({ required: true })
  // createdDate: string;
}

export type CompanyDocument = Company & Document;
export const CompanySchema = SchemaFactory.createForClass(Company);
