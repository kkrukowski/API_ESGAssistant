import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@InputType()
export class CreateCompanyInput {
  @Field(() => String)
  name: string;

  // @Field(() => [User])
  // employees: User[];
}
