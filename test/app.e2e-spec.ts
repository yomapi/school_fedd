import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('signup and signin (e2e)', () => {
  let jwtToken: string;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${__dirname}/../env/.${process.env.NODE_ENV}.env`,
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        UserModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'test@test.com',
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
        email: 'test@test.com',
        password: 'test',
      })
      .expect(201);
    jwtToken = response.body.accessToken;
  });

  // access 토큰 사용
  it('get user info', () => {
    request(app.getHttpServer())
      .get('/me')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200);
  });

  it('signup with duplicated email', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'test@test.com',
        password: 'test',
        userType: 'B',
      })
      .expect(400);
  });

  it('signup with Invalid user type', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'test1@test.com',
        password: 'test',
        userType: 'B',
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
