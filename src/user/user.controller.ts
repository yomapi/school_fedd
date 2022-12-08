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
import { JwtAuthGuard } from '../jwt/jwt.gurad';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signin')
  signin(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  get(@Request() req) {
    return {
      email: req.user.email,
    };
  }
}
