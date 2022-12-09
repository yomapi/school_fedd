import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getTestModule } from '../src/test-utils/typeorm-inmemory-setup';
import { User } from '../src/user/entities/user.entity';
import { School } from '../src/school/entities/school.entity';
import { setTestSeedData } from '../src/test-utils/test-dataset';

describe('signup and signin (e2e)', () => {
  let jwtToken: string;
  let app: INestApplication;
  let adminUser: User;
  let studentUser: User;
  let schoolOwnedUser: User;
  let newSchool: School;

  beforeEach(async () => {
    const module = await getTestModule();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    ({ adminUser, schoolOwnedUser, studentUser, newSchool } =
      await setTestSeedData(module));
  });

  const getUserToken = async (user: User) => {
    const response = await request(app.getHttpServer()).post('/signin').send({
      email: user.email,
      password: user.password,
    });
    return `Bearer ${response.body.accessToken}`;
  };

  it('signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'new@test.com',
        password: 'test',
        userType: 'A',
      })
      .expect(201)
      .expect({ success: true });
  });

  it('signin', async () => {
    const response = await request(app.getHttpServer())
      .post('/signin')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      })
      .expect(201);
  });

  it('get user info', async () => {
    const jwtToken = await getUserToken(adminUser);
    request(app.getHttpServer())
      .get('/me')
      .set('Authorization', jwtToken)
      .expect(200);
  });

  it('signup with duplicated email', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: adminUser.email,
        password: 'test',
        userType: 'A',
      })
      .expect(400);
  });

  it('signup with Invalid user type', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'new@test.com',
        password: 'test',
        userType: 'B',
      })
      .expect(400);
  });

  it('create school', async () => {
    const jwtToken = await getUserToken(adminUser);
    const response = await request(app.getHttpServer())
      .post('/school')
      .set('Authorization', jwtToken)
      .send({
        location: '인천 송도',
        name: '떡잎대학교',
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
