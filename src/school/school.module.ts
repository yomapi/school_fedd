import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Notice } from './entities/school-notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Notice])],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService, TypeOrmModule],
})
export class SchoolModule {}
