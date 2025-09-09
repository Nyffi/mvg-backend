import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google.strategy';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { GoogleAuthUseCase } from './use-case/auth/google-auth/google-auth.usecase';
import { usersProviders } from './users/users.providers';

@Module({
  imports: [PassportModule, DatabaseModule],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, GoogleStrategy, GoogleAuthUseCase, ...usersProviders],
})
export class AppModule {}
