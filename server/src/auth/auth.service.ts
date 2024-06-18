import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  //메모리 사용 차후 db로 변경
  private users = new Map<string, any>();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.accessToken };
    this.users.set(user.email, user);
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: user.refreshToken,
    };
  }

  async refreshToken(email: string, refreshToken: string): Promise<any> {
    const user = this.users.get(email);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        null,
        {
          params: {
            client_id: this.configService.get('GOOGLE_CLIENT_ID'),
            client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          },
        },
      );

      const newAccessToken = response.data.access_token;

      user.accessToken = newAccessToken;
      this.users.set(email, user); // 유저 정보를 업데이트합니다.

      return {
        accessToken: this.jwtService.sign({
          email: user.email,
          sub: newAccessToken,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }
  }
}
