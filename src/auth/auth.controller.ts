import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({ dto });

    return this.authService.signUp(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
