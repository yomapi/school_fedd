import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  Delete,
} from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolService } from './school.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { isAdminGuard } from '../permission/permission.guard';
import { CreateSchoolNoticeDto } from './dto/create-school-notice.dto';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { School } from './entities/school.entity';
import { Notice } from './entities/school-notice.entity';
import { SuccessResDto } from '../dto/success-response-dto';
@Controller('school')
@ApiTags('학교 페이지')
@UseGuards(isAdminGuard)
@UseGuards(JwtAuthGuard)
export class SchoolController {
  constructor(private readonly service: SchoolService) {}
  @Post('')
  @ApiBody({ type: CreateSchoolDto })
  @ApiCreatedResponse({ type: School })
  @ApiBearerAuth('Authorization')
  create(@Request() req, @Body() createSchoolDto: CreateSchoolDto) {
    return this.service.createSchool(req.user.id, createSchoolDto);
  }

  @Post('/:schoolId/notice')
  @ApiBody({ type: CreateSchoolNoticeDto })
  @ApiCreatedResponse({ type: Notice })
  @ApiBearerAuth('Authorization')
  createNotice(
    @Request() req,
    @Param('schoolId') schoolId,
    @Body() createNoticeDto: CreateSchoolNoticeDto,
  ) {
    return this.service.createNotice(req.user.id, schoolId, createNoticeDto);
  }

  @Patch('/:schoolId/notice/:noticeId')
  @ApiBody({ type: CreateSchoolNoticeDto })
  @ApiCreatedResponse({ type: Notice })
  @ApiBearerAuth('Authorization')
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

  @Delete('/:schoolId/notice/:noticeId')
  @ApiCreatedResponse({ type: SuccessResDto })
  @ApiBearerAuth('Authorization')
  deleteNotice(
    @Request() req,
    @Param('schoolId') schoolId,
    @Param('noticeId') noticeId,
  ) {
    return this.service.deleteNotice(req.user.id, schoolId, noticeId);
  }
}
