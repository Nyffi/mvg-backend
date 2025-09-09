import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { UserSchema } from '../../schemas/user.schema';
import { IUsersRepository } from './iusers.repository';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    return (await this.userModel.create(user)).toJSON();
  }

  async findOne(email: string): Promise<User | undefined> {
    return (await this.userModel.findOne({ email }))?.toJSON();
  }
}
