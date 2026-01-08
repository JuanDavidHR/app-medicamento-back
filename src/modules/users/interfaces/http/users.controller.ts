import { Controller, Post, Body } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RegisterDto } from "../../infrastructure/dtos/register.dto";
import { CreateUserCommand } from "../../application/commands/impl/create-user.command";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(@Body() registerDto: RegisterDto) {
    const { email, password, role } = registerDto;
    return this.commandBus.execute(
      new CreateUserCommand(email, password, role)
    );
  }
}
