import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    try {
      //creating hash for passowrd to store in db for securtiy purpose.
      const hash = await argon.hash(dto.password);

      //creating user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'credentials Taken',
          );
        } else {
          throw error;
        }
      }
    }
  }

  async signIn(dto: AuthDto) {
    //find user by email
    const user =
      await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
    //if user does not exist then throw exception
    if (!user) {
      throw new ForbiddenException(
        'credentials incorrect',
      );
    }
    //compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    //if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException(
        'credentials taken',
      );
    }
    delete user.hash;
    return user;
  }
}
