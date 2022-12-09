import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { validateOrReject } from 'class-validator';
import { Notice } from './entities/school-notice.entity';
import { CreateSchoolNoticeDto } from './dto/create-school-notice.dto';
import { NotSchoolOwnerError } from './exceptions/not-school-owner-exception';
import { NoticeNotExistError } from './exceptions/school-notice-not-exist-exception';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}
  private async isUserOwnSchoolOrReject(userId: number, schoolId: number) {
    const school = await this.schoolRepository.findOne({
      where: {
        user: { id: userId },
        id: schoolId,
      },
    });
    if (school) {
      return true;
    } else {
      throw new NotSchoolOwnerError();
    }
  }

  async getNoticeOrReject(
    userId: number,
    schoolId: number,
    noticeId: number,
    include_deleted: boolean = false,
  ) {
    await this.isUserOwnSchoolOrReject(userId, schoolId);
    const notice = await this.noticeRepository.findOne({
      withDeleted: include_deleted,
      where: {
        school: { id: schoolId },
        id: noticeId,
      },
    });

    if (notice) {
      return notice;
    } else {
      throw NoticeNotExistError;
    }
  }

  async createSchool(userId: number, createschoolDto: CreateSchoolDto) {
    await validateOrReject(createschoolDto);
    const user = new User();
    user.id = userId;
    const school = {
      location: createschoolDto.location,
      name: createschoolDto.name,
      user: user,
    };
    return await this.schoolRepository.save(school);
  }
  async createNotice(
    userId: number,
    schoolId: number,
    createNoticeDto: CreateSchoolNoticeDto,
  ) {
    await validateOrReject(CreateSchoolNoticeDto);

    // 학교 관리자가 아닌경우 error throw
    await this.isUserOwnSchoolOrReject(userId, schoolId);

    const school = new School();
    school.id = schoolId;
    return await this.noticeRepository.save({
      contents: createNoticeDto.contents,
      school: school,
    });
  }

  async deleteNotice(userId: number, schoolId: number, noticeId: number) {
    // 공지글이 존재하지 않을경우 throw error 합니다
    const notice = await this.getNoticeOrReject(userId, schoolId, noticeId);
    // soft delete
    notice.deletedAt = new Date();
    await this.noticeRepository.save(notice);
    return { success: true };
  }

  async updateNotice(
    userId: number,
    schoolId: number,
    noticeId: number,
    updateNoticeDto: CreateSchoolNoticeDto,
  ) {
    await validateOrReject(CreateSchoolNoticeDto);
    const notice = await this.getNoticeOrReject(userId, schoolId, noticeId);
    notice.contents = updateNoticeDto.contents;
    return await this.noticeRepository.save(notice);
  }
}
