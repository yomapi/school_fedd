import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  getEmptySchoolEntity,
  getEmptyUserEntity,
} from '../common/typeorm-utils/generate-empty-entity';
import { CreateSubscribeDTO } from './dto/create-subscribe-dto';
import { Subscribe } from './entities/subscribe.entity';
import { AlreadySubsribedError } from './exceptions/already-subscribe-exception';
import { PaginationRequestDto } from '../dto/pagination-request-dto';
import { SubscirbeNotExistError } from './exceptions/subscribe-not-exist-error';
import { Notice } from '../school/entities/school-notice.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepositry: Repository<Subscribe>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}
  private async getSubscribeByUserAndSchool(
    userId: number,
    schoolId: number,
    include_deleted: boolean = false,
  ) {
    return await this.subscribeRepositry.findOne({
      withDeleted: include_deleted,
      where: {
        user: { id: userId },
        school: { id: schoolId },
      },
    });
  }
  async subscirbe(userId: number, createSubscribeDTO: CreateSubscribeDTO) {
    const { schoolId } = createSubscribeDTO;
    const duplicatedSubscribe = await this.getSubscribeByUserAndSchool(
      userId,
      schoolId,
      true,
    );

    if (duplicatedSubscribe?.deletedAt === null)
      throw new AlreadySubsribedError();

    if (duplicatedSubscribe) {
      duplicatedSubscribe.deletedAt = null;
      await this.subscribeRepositry.save(duplicatedSubscribe);
    } else {
      const user = getEmptyUserEntity(userId);
      const school = getEmptySchoolEntity(schoolId);
      await this.subscribeRepositry.save({ user, school });
    }
    return { success: true };
  }

  async unSubscirbe(userId: number, subscirbeId: number) {
    const existSubscribe = await this.subscribeRepositry.findOne({
      where: {
        id: subscirbeId,
        user: { id: userId },
      },
    });
    if (!existSubscribe) throw new SubscirbeNotExistError();

    // soft delete
    existSubscribe.deletedAt = new Date();
    await this.subscribeRepositry.save(existSubscribe);
    return { success: true };
  }

  async findSubscribed(userId: number, requestDto: PaginationRequestDto) {
    const { take, page } = requestDto;
    const [results, total] = await this.subscribeRepositry.findAndCount({
      select: {
        school: {
          id: true,
          name: true,
          location: true,
        },
      },
      where: { user: { id: userId } },
      relations: ['school'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * take,
      take: take,
    });
    return { total, results };
  }

  async findNotice(schoolId: number, requestDto: PaginationRequestDto) {
    const { take, page } = requestDto;
    const [results, total] = await this.noticeRepository.findAndCount({
      select: {
        school: { id: true },
      },
      where: { school: { id: schoolId } },
      relations: ['school'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * take,
      take: take,
    });
    return { total, results };
  }
}
