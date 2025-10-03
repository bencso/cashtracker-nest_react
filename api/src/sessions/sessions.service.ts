import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Sessions, UserData } from './entities/sessions.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UsersService,
  ) {}
  async sessionsIsValid(req: Request): Promise<boolean> {
    try {
      const authorizationHeader = req.header('Authorization');
      const token = authorizationHeader?.split('Bearer ')[1];

      if (!token)
        throw new UnauthorizedException({
          message: 'Érvénytelen vagy hiányzó hitelesítési token',
          status: 401,
        });

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });

      const dbData = await this.dataSource
        .getRepository(Sessions)
        .createQueryBuilder('sessions')
        .where('sessions.userId = :userId', { userId: payload.sub })
        .getOne();

      if (!dbData)
        throw new UnauthorizedException({
          message: 'Érvénytelen munkamenet',
          status: 401,
        });

      const data = JSON.parse(dbData.user_data) as UserData;
      const requestDataValid =
        req.headers['user-agent'] === data.user_agent && data.ip === req.ip;

      const validUser = requestDataValid && dbData.token === token;
      return validUser;
    } catch {
      return false;
    }
  }

  async createSessionInDb(
    sub: number,
    token: string,
    user_data: UserData,
    sessionId: string,
  ) {
    const user = (await this.userService.findOne(sub)) as User;
    const isHave = await this.dataSource
      .getRepository(Sessions)
      .createQueryBuilder()
      .select()
      .where({
        user: user,
      })
      .getCount();

    console.log(isHave);
    if (isHave > 0) {
      await this.dataSource
        .createQueryBuilder()
        .update(Sessions)
        .set({
          token: token,
          session_id: sessionId,
          user_data: JSON.stringify({
            ip: user_data.ip,
            user_agent: user_data.user_agent,
          }),
        })
        .where({
          user: user,
        })
        .execute();
    } else {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Sessions)
        .values([
          {
            token: token,
            user_data: JSON.stringify({
              ip: user_data.ip,
              user_agent: user_data.user_agent,
            }),
            session_id: sessionId,
            user: user,
          },
        ])
        .execute();
    }
  }
}
