import { InputType, Int, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class AddEmployeeInput {
  @Field(() => String)
  companyId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;
}
