import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Company, CompanySchema } from './entities/company.entity';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    forwardRef(() => AuthModule)
  ],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
