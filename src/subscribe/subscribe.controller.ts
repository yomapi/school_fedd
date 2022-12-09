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
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SuccessResDto } from '../dto/success-response-dto';
import { Subscribe } from './entities/subscribe.entity';
import { Notice } from '../school/entities/school-notice.entity';
@Controller('')
@ApiTags('구독 기능')
@UseGuards(JwtAuthGuard)
export class SubscribeController {
  constructor(private readonly service: SubscribeService) {}

  @Post('/subscribe')
  @ApiBody({ type: CreateSubscribeDTO })
  @ApiCreatedResponse({ type: SuccessResDto })
  @ApiBearerAuth('Authorization')
  create(@Request() req, @Body() createSubscribeDto: CreateSubscribeDTO) {
    return this.service.subscirbe(req.user.id, createSubscribeDto);
  }

  @Delete('subscribe/:subscribeId')
  @ApiOkResponse({ type: SuccessResDto })
  @ApiBearerAuth('Authorization')
  createNotice(@Request() req, @Param('subscribeId') subscribeId) {
    return this.service.unSubscirbe(req.user.id, subscribeId);
  }

  @Get('/subscribe')
  @ApiOkResponse({ type: [Subscribe] })
  @ApiBody({ type: PaginationRequestDto })
  @ApiBearerAuth('Authorization')
  find(@Request() req, @Body() paginationRequestDto: PaginationRequestDto) {
    return this.service.findSubscribed(req.user.id, paginationRequestDto);
  }

  @Get('school/:schoolId/notice')
  @ApiOkResponse({ type: [Notice] })
  @ApiBody({ type: PaginationRequestDto })
  @ApiBearerAuth('Authorization')
  findNotice(
    @Param('schoolId') schoolId,
    @Body() paginationRequestDto: PaginationRequestDto,
  ) {
    return this.service.findNotice(schoolId, paginationRequestDto);
  }
}
