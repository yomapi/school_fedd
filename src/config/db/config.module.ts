import { Module } from '@nestjs/common';
import { MySqlConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  //   imports: [
  //     ConfigModule.forRoot({
  //       envFilePath: `${__dirname}/../../../env/.test.env`,
  //       isGlobal: true,
  //     }),
  //   ],
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
