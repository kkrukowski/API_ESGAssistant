import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Schema as MongooSchema } from 'mongoose';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput): Promise<Company> {
    return this.companyService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'company' })
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'companyById' })
  findOneById(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId): Promise<Company> {
    return this.companyService.findOneById(id);
  }

  //
  // @Mutation(() => Company)
  // updateCompany(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
  //   return this.companyService.update(updateCompanyInput);
  // }

  @Mutation(() => Company)
  remove(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId) {
    return this.companyService.remove(id);
  }
}
