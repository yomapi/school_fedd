import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { School } from '../school/entities/school.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SchoolModule } from '../school/school.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';
import { SchoolService } from '../school/school.service';
import { Notice } from '../school/entities/school-notice.entity';
import { Test, TestingModule } from '@nestjs/testing';

export const getTypeOrmModuleForTest = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, School],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([User, School]),
];
export const getTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: `${__dirname}/../env/.test.env`,
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER_NAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, School, Notice],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
          logging: true,
        }),
        inject: [ConfigService],
      }),
      UserModule,
      SchoolModule,
    ],
    controllers: [AppController],
    providers: [AppService, UserService, JwtService, SchoolService],
  }).compile();

  return module;
};
export const getTestModuleMetaData = async () => {
  return {
    imports: [
      ConfigModule.forRoot({
        envFilePath: `${__dirname}/../env/.${process.env.NODE_ENV}.env`,
        isGlobal: true,
      }),
      // TypeOrmModule.forRoot({
      //   type: 'sqlite',
      //   database: ':memory:',
      //   entities: [User, School],
      //   synchronize: true,
      //   logging: true,
      // }),
      TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER_NAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, School, Notice],
          synchronize: process.env.NODE_ENV != 'prod',
          namingStrategy: new SnakeNamingStrategy(),
          logging: true,
        }),
        inject: [ConfigService],
      }),
      UserModule,
      SchoolModule,
    ],
    controllers: [AppController],
    providers: [AppService, UserService, JwtService, SchoolService],
  };
};
