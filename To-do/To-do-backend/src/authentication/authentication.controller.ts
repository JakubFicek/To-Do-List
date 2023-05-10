import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/local.guard';
import { RequestWithUser } from './interface/requestWithUser.interface';
import JwtAuthenticationGuard from './guards/jwt.guard';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor) // needed bcs I have to exclude passord from users data
export class AuthenticationController {
  constructor(
      private readonly authenticationService: AuthenticationService
    ){}

  @Post("register")
  @HttpCode(200)
  async register(@Body() newAcc: RegisterDto) {
    return this.authenticationService.register(newAcc);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  LogIn(@Req() request: RequestWithUser) {
    const { user } = request;  
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader("Set-Cookie", cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
