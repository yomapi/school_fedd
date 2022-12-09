import { Module } from '@nestjs/common';
import { MySqlConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
