import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company, CompanyDocument } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { AddEmployeeInput } from './dto/add-employee-company.input';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<CompanyDocument> {
    const createdCompany = new this.companyModel(createCompanyInput);
    return createdCompany.save();
  }

  async findAll(): Promise<CompanyDocument[]> {
    return this.companyModel.find().populate('employees').skip(0).limit(10).exec();
  }

  async findOneById(id: MongooSchema.Types.ObjectId): Promise<CompanyDocument> {
    return this.companyModel.findById(id).populate('employees').exec();
  }

  async update(updateCompanyInput: UpdateCompanyInput): Promise<CompanyDocument> {
    const { _id, ...inputData } = updateCompanyInput;
    return this.companyModel.findByIdAndUpdate(_id, inputData, { new: true }).exec();
  }

  async addEmployee(addEmployeeInput: AddEmployeeInput) {
    const { companyId, userId } = addEmployeeInput;

    const company = await this.findOneById(companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    company.employees.push(userId);

    const updatedCompany = await this.companyModel.findOneAndUpdate({_id: companyId }, company, { new: true }).exec();
    console.log(updatedCompany);

    return updatedCompany;
  }

  async remove(id: MongooSchema.Types.ObjectId): Promise<any> {
    return this.companyModel.deleteOne({ _id: id }).exec();
  }
}