import { Dependencies, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';

export interface ITokenResponse {
  accessToken: string;
}

export interface IUser {
  username: string;
  userId: number;
  password: string;
}

export interface IAuthPayload {
  id: string;
  role: string;
}

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      log(password);
      return result;
    }
    return null;
  }

  async verifyToken(accessToken: string): Promise<IAuthPayload> {
    try {
      const data = await this.jwtService.verifyAsync(accessToken);

      return data;
    } catch (e) {
      throw e;
    }
  }

  async login(user: IUser) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
