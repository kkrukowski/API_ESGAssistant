import { Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company, CompanyDocument } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schema as MongooSchema } from 'mongoose';


@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {
  }

  create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyInput);
    return createdCompany.save();
  }

  findAll(): Promise<Company[]> {
    return this.companyModel.find().skip(0).limit(10);
  }

  findOneById(id: MongooSchema.Types.ObjectId): Promise<Company>{
    return this.companyModel.findById(id).exec();
  }

  // update(updateCompanyInput: UpdateCompanyInput) {
  //   return `This action updates a #${updateCompanyInput._id} company`;
  // }

  remove(id: MongooSchema.Types.ObjectId) {
    return this.companyModel.deleteOne({_id: id})
  }
}
