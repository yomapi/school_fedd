import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailAlreadyExistException } from './exceptions/email-already-exist-exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const duplicatedEmailUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (duplicatedEmailUser) {
      throw new EmailAlreadyExistException();
    }
    const user = new User();
    user.email = createUserDto.email;
    // TODO: 비밀번호 암호화
    user.password = createUserDto.password;
    user.userType = createUserDto.userType;
    await this.userRepository.save(user);
    return { success: true };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    // TODO: 비밀번호 암호화 적용
    if (loginDto.password == user?.password) {
      const payload = { id: user.id, email: loginDto.email };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('인증되지 않은 사용자입니다.');
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
