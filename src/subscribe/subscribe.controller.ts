import {
  Body,
  Controller,
  UseGuards,
  Post,
  Request,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDTO } from './dto/create-subscribe-dto';
import { PaginationRequestDto } from '../dto/pagination-request-dto';

@Controller('')
@UseGuards(JwtAuthGuard)
export class SubscribeController {
  constructor(private readonly service: SubscribeService) {}
  @Post('/subscribe')
  create(@Request() req, @Body() createSubscribeDto: CreateSubscribeDTO) {
    return this.service.subscirbe(req.user.id, createSubscribeDto);
  }

  @Delete('subscribe/:subscribeId')
  createNotice(@Request() req, @Param('subscribeId') subscribeId) {
    return this.service.unSubscirbe(req.user.id, subscribeId);
  }

  @Get('/subscribe')
  find(@Request() req, @Body() paginationRequestDto: PaginationRequestDto) {
    return this.service.findSubscribed(req.user.id, paginationRequestDto);
  }

  @Get('school/:schoolId/notice')
  findNotice(
    @Param('schoolId') schoolId,
    @Body() paginationRequestDto: PaginationRequestDto,
  ) {
    return this.service.findNotice(schoolId, paginationRequestDto);
  }
}
