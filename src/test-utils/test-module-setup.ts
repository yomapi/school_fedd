import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { School } from '../school/entities/school.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SchoolModule } from '../school/school.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';
import { SchoolService } from '../school/school.service';
import { Notice } from '../school/entities/school-notice.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { MySqlConfigModule } from '../config/db/config.module';
import { MySqlConfigService } from '../config/db/config.service';
import { SubscribeModule } from '../subscribe/subscribe.module';
import { SubscribeService } from '../subscribe/subscribe.service';
export const getTypeOrmModuleForTest = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, School, Notice],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([User, School, Notice]),
];
export const getTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: `${__dirname}/../../env/.test.env`,
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
        imports: [MySqlConfigModule],
        useClass: MySqlConfigService,
        inject: [MySqlConfigService],
      }),
      UserModule,
      SchoolModule,
      SubscribeModule,
    ],
    controllers: [AppController],
    providers: [
      AppService,
      UserService,
      JwtService,
      SchoolService,
      SubscribeService,
    ],
  }).compile();
  return module;
};
