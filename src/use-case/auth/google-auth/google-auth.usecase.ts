import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { IUsersRepository } from 'src/database/repository/iusers.repository';
import jwt from 'jsonwebtoken';

@Injectable()
export class GoogleAuthUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(userData: User): Promise<any> {
    const user = await this.userRepository.findOne(userData.email);

    if (!user) {
      const { tkn, ...newUser } = await this.userRepository.create(userData);
      console.log(newUser);
      const token = jwt.sign(newUser, process.env.JWT_SECRET || '');
      return `?token=${token}`;
    }

    const { tkn, ...existingUser } = user;
    const token = jwt.sign(existingUser, process.env.JWT_SECRET || '');
    return `?token=${token}`;
  }
}
