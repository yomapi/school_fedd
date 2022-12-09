import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolService } from './school.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { isAdminGuard } from '../permission/permission.guard';
@Controller('school')
export class SchoolController {
  constructor(private readonly service: SchoolService) {}
  @Post('')
  @UseGuards(isAdminGuard)
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createSchoolDto: CreateSchoolDto) {
    return this.service.createSchool(req.user?.id, createSchoolDto);
  }
}
