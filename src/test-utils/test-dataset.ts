import { UserService } from '../user/user.service';
import { SchoolService } from '../school/school.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateSchoolDto } from '../school/dto/create-school.dto';
import { TestingModule } from '@nestjs/testing';

export const setTestSeedData = async (module: TestingModule) => {
  const userService = module.get<UserService>(UserService);
  const schoolService = module.get<SchoolService>(SchoolService);
  const adminUser = await userService.create(
    plainToInstance(CreateUserDto, {
      email: 'admin@test.com',
      password: 'admin',
      userType: 'A',
    }),
  );
  const schoolOwnedUser = await userService.create(
    plainToInstance(CreateUserDto, {
      email: 'admin2@test.com',
      password: 'admin',
      userType: 'A',
    }),
  );
  const studentUser = await userService.create(
    plainToInstance(CreateUserDto, {
      email: 'student@test.com',
      password: 'student',
      userType: 'S',
    }),
  );
  const newSchool = await schoolService.createSchool(
    schoolOwnedUser.id,
    plainToInstance(CreateSchoolDto, {
      location: '서울',
      name: '떡잎초등학교',
    }),
  );
  return { adminUser, schoolOwnedUser, studentUser, newSchool };
};
