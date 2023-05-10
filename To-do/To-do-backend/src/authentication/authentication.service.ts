import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interface/tokenPayload.interface';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
      ) {}
      
    public async register(newAcc: RegisterDto){
        const hashedPass = await bcrypt.hash(newAcc.password, 10);
        try {
            const newUser = await this.usersService.create({
                ...newAcc,
                password: hashedPass
            });
            return newUser;
        } catch(error) {
            if (error?.code === "23505") { // - code for uniqe_violation is 23505
                throw new HttpException('User with that email already exists. ', HttpStatus.BAD_REQUEST);
              }
              throw new HttpException('Something went wrong. ', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getConfirmedUser(email: string, hashedPass: string) {
        try {
            const user = await this.usersService.findUserByEmail(email);
            await this.verifyPassword(user.password, hashedPass);
            return user;
        } catch (error) {
            throw new HttpException("WRONG CREDENTIALS PROVIDED. ", HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(passw: string, hashedPassw: string) {
        const isMatched = await bcrypt.compare(hashedPassw, passw);
            if (!isMatched) {
                throw new HttpException("WRONG CREDENTIALS PROVIDED. ", HttpStatus.BAD_REQUEST);
            }
    } 

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = {userId};
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
