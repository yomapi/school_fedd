import { Body, Controller, Param, Patch, Post, Request } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolService } from './school.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { isAdminGuard } from '../permission/permission.guard';
import { CreateSchoolNoticeDto } from './dto/create-school-notice.dto';

@Controller('school')
@UseGuards(isAdminGuard)
@UseGuards(JwtAuthGuard)
export class SchoolController {
  constructor(private readonly service: SchoolService) {}
  @Post('')
  create(@Request() req, @Body() createSchoolDto: CreateSchoolDto) {
    return this.service.createSchool(req.user.id, createSchoolDto);
  }

  @Post('/:schoolId/notice')
  createNotice(
    @Request() req,
    @Param('schoolId') schoolId,
    @Body() createNoticeDto: CreateSchoolNoticeDto,
  ) {
    return this.service.createNotice(req.user.id, schoolId, createNoticeDto);
  }

  @Patch('/:schoolId/notice/:noticeId')
  updateNotice(
    @Request() req,
    @Param('schoolId') schoolId,
    @Param('noticeId') noticeId,
    @Body() createNoticeDto: CreateSchoolNoticeDto,
  ) {
    return this.service.updateNotice(
      req.user.id,
      schoolId,
      noticeId,
      createNoticeDto,
    );
  }
  @Patch('/:schoolId/notice/:noticeId')
  deleteNotice(
    @Request() req,
    @Param('schoolId') schoolId,
    @Param('noticeId') noticeId,
  ) {
    return this.service.deleteNotice(req.user.id, schoolId, noticeId);
  }
}
