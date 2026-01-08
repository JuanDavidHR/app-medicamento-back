import { Inject, Injectable, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { IUserRepository } from "../users/domain/repositories/user.repository.interface";
import { LoginDto } from "./infrastructure/dtos/login.dto";
import { CustomHttpException } from "../../common/exceptions/custom-http.exception";
import { LoginResponse } from "./domain/interfaces/auth.interfaces";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new CustomHttpException(
        "Invalid credentials",
        "ERR_AUTH_INVALID_CREDENTIALS",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new CustomHttpException(
        "Invalid credentials",
        "ERR_AUTH_INVALID_CREDENTIALS",
        HttpStatus.UNAUTHORIZED
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
