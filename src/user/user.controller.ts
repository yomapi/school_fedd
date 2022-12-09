import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserInfoDto } from './dto/user-info-res-dto';
import { AuthTokenDto } from './dto/auth-token-dto';
import { SuccessResDto } from '../dto/success-response-dto';

@Controller('')
@ApiTags('사용자')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthTokenDto })
  async signin(@Body() loginDto: LoginDto) {
    return { accessToken: await this.userService.login(loginDto) };
  }

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: SuccessResDto })
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserInfoDto })
  @ApiBearerAuth('Authorization')
  get(@Request() req) {
    return {
      email: req.user.email,
    };
  }
}
