import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from 'src/database/repository/iusers.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
