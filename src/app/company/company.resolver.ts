import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company, CompanyDocument } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Schema as MongooSchema } from 'mongoose';
import { AddEmployeeInput } from './dto/add-employee-company.input';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  async createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput): Promise<CompanyDocument> {
    return this.companyService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'company' })
  async findAll(): Promise<CompanyDocument[]> {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'companyById' })
  async findOneById(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId): Promise<CompanyDocument> {
    return this.companyService.findOneById(id);
  }


  @Mutation(() => Company)
  async updateCompany(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput): Promise<CompanyDocument> {
    return this.companyService.update(updateCompanyInput);
  }

  @Mutation(() => Company)
  async addEmployee(@Args('addEmployeeInput') addEmployeeInput: AddEmployeeInput) {
    return this.companyService.addEmployee(addEmployeeInput);
  }

  @Mutation(() => Company)
  async remove(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId): Promise<any> {
    return this.companyService.remove(id);
  }
}
