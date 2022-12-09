import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from './entities/subscribe.entity';
import { SubscribeController } from './subscribe.controller';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe]), SchoolModule],
  providers: [SubscribeService],
  exports: [SubscribeService, TypeOrmModule],
  controllers: [SubscribeController],
})
export class SubscribeModule {}
