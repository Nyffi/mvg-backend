// auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthUseCase } from 'src/use-case/auth/google-auth/google-auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private googleAuthUseCase: GoogleAuthUseCase) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google OAuth page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // req.user contains Google user info
    console.log(req.user);
    const data = await this.googleAuthUseCase.execute({ ...req.user, tkn: 0 });
    return res.redirect(`http://localhost:3000/${data}`);
  }
}
