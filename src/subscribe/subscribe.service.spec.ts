import { SubscribeService } from './subscribe.service';
import { User } from '../user/entities/user.entity';
import { School } from '../school/entities/school.entity';
import { getTestModule } from '../test-utils/test-module-setup';
import { setTestSeedData } from '../test-utils/test-dataset';
import { plainToInstance } from 'class-transformer';
import { CreateSubscribeDTO } from './dto/create-subscribe-dto';
import { isInstance } from 'class-validator';
import { AlreadySubsribedError } from './exceptions/already-subscribe-exception';
import { PaginationRequestDto } from '../dto/pagination-request-dto';

describe('SubscribeService', () => {
  let service: SubscribeService;
  let adminUser: User;
  let studentUser: User;
  let schoolOwnedUser: User;
  let newSchool: School;
  let createSubscribeDTO: CreateSubscribeDTO;

  beforeEach(async () => {
    const module = await getTestModule();
    service = module.get<SubscribeService>(SubscribeService);
    ({ adminUser, schoolOwnedUser, studentUser, newSchool } =
      await setTestSeedData(module));
    createSubscribeDTO = plainToInstance(CreateSubscribeDTO, {
      schoolId: newSchool.id,
    });
  });

  const subscirbe = async () => {
    await service.subscirbe(studentUser.id, createSubscribeDTO);
  };

  it('subscribe school', async () => {
    const result = await service.subscirbe(studentUser.id, createSubscribeDTO);
    expect(result.user.id === studentUser.id);
    expect(result.school.id === newSchool.id);
  });

  it('subscribe already subscribed', async () => {
    await subscirbe();
    try {
      await subscirbe;
    } catch (error) {
      expect(isInstance(error, AlreadySubsribedError));
    }
  });

  it('unsubscribe', async () => {
    await subscirbe();
    const result = await service.unSubscirbe(
      studentUser.id,
      createSubscribeDTO,
    );
    expect(result.success);
  });

  it('find subscribed', async () => {
    await subscirbe();
    const result = await service.findSubscribed(
      studentUser.id,
      plainToInstance(PaginationRequestDto, { take: 10, page: 1 }),
    );
    expect(isInstance(result.results, Array));
    expect(isInstance(result.total, Number));
    expect(result.total === 1);
  });
});
