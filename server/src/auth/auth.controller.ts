import { Controller, Get, Req, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    //google 로그인페이지로 리다이렉트
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.validateUser(req.user);
  }

  @Post('refresh')
  async refresh(@Body() body: { email: string; refreshToken: string }) {
    return this.authService.refreshToken(body.email, body.refreshToken);
  }
}
