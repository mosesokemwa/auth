import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService, ITokenResponse, IUser } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(LocalAuthGuard)
@ApiTags('auth')
@Controller({
  version: '1',
  path: '/auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() payload: IUser): Promise<ITokenResponse> {
    return this.authService.login(payload);
  }
}
