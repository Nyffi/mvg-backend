import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { IUsersRepository } from './repository/iusers.repository';
import { UsersRepository } from './repository/users.repository';

@Module({
  providers: [
    ...databaseProviders,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
  exports: [...databaseProviders, IUsersRepository],
  imports: [],
})
export class DatabaseModule {}
