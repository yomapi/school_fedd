import { SchoolService } from './school.service';
import { CreateSchoolDto } from '../school/dto/create-school.dto';
import { plainToInstance } from 'class-transformer';
import { setTestSeedData } from '../test-utils/test-dataset';
import { CreateSchoolNoticeDto } from './dto/create-school-notice.dto';
import { User } from '../user/entities/user.entity';
import { School } from './entities/school.entity';
import { isInstance } from 'class-validator';
import { NotSchoolOwnerError } from './exceptions/not-school-owner-exception';
import { getTestModule } from '../test-utils/test-module-setup';

describe('SchoolService', () => {
  let service: SchoolService;
  let adminUser: User;
  let studentUser: User;
  let schoolOwnedUser: User;
  let newSchool: School;

  beforeEach(async () => {
    const module = await getTestModule();
    service = module.get<SchoolService>(SchoolService);
    ({ adminUser, schoolOwnedUser, studentUser, newSchool } =
      await setTestSeedData(module));
  });

  it('create school', async () => {
    const data = {
      location: '인천',
      name: '떡잎초등학교',
    };
    const dto = plainToInstance(CreateSchoolDto, data);
    const result = await service.createSchool(adminUser.id, dto);
    expect(result.user.id === adminUser.id);
    expect(result.location === data.location);
    expect(result.name === data.name);
  });

  it('create school notice', async () => {
    const dto = plainToInstance(CreateSchoolNoticeDto, { contents: 'asd' });
    const newNotice = await service.createNotice(
      schoolOwnedUser.id,
      newSchool.id,
      dto,
    );
    expect(newNotice.school.id === newSchool.id);
    expect(newNotice.contents === 'asd');
  });

  it('create school notice with invalid user', async () => {
    const dto = plainToInstance(CreateSchoolNoticeDto, { contents: 'asd' });
    try {
      await service.createNotice(adminUser.id, newSchool.id, dto);
    } catch (error) {
      expect(isInstance(error, NotSchoolOwnerError));
    }
  });

  it('delete school notice', async () => {
    const dto = plainToInstance(CreateSchoolNoticeDto, { contents: 'asd' });
    const newNotice = await service.createNotice(
      schoolOwnedUser.id,
      newSchool.id,
      dto,
    );
    service.deleteNotice(schoolOwnedUser.id, newSchool.id, newNotice.id);
    const deletedNotice = await service.getNoticeOrReject(
      schoolOwnedUser.id,
      newSchool.id,
      newNotice.id,
      true,
    );
    expect(newNotice.updatedAt.getTime() === deletedNotice.updatedAt.getTime());
    expect(deletedNotice.deletedAt !== null);
  });

  it('update school notice', async () => {
    let dto = plainToInstance(CreateSchoolNoticeDto, { contents: 'asd' });
    const updateText = 'update text!';
    const newNotice = await service.createNotice(
      schoolOwnedUser.id,
      newSchool.id,
      dto,
    );

    dto = plainToInstance(CreateSchoolNoticeDto, { contents: updateText });
    const updatedNotice = await service.updateNotice(
      schoolOwnedUser.id,
      newSchool.id,
      newNotice.id,
      dto,
    );
    expect(updatedNotice.updatedAt.getTime() !== newNotice.updatedAt.getTime());
    expect(updatedNotice.contents == updateText);
  });

  it('update school notice with invalid user', async () => {
    let dto = plainToInstance(CreateSchoolNoticeDto, { contents: 'asd' });
    const newNotice = await service.createNotice(
      schoolOwnedUser.id,
      newSchool.id,
      dto,
    );
    try {
      const updatedNotice = await service.updateNotice(
        schoolOwnedUser.id,
        newSchool.id,
        newNotice.id,
        dto,
      );
    } catch (error) {
      expect(isInstance(error, NotSchoolOwnerError));
    }
  });

  it('update school notice with non exist notice', async () => {
    const dto = plainToInstance(CreateSchoolNoticeDto, { contents: 'asd' });
    try {
      const updatedNotice = await service.updateNotice(
        schoolOwnedUser.id,
        newSchool.id,
        0,
        dto,
      );
    } catch (error) {
      expect(isInstance(error, NotSchoolOwnerError));
    }
  });
});
