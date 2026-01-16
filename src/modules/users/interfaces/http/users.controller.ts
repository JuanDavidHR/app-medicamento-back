import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  ForbiddenException,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { RegisterDto } from "../../infrastructure/dtos/register.dto";
import { UpdateUserDto } from "../../infrastructure/dtos/update-user.dto";
import { CreateUserCommand } from "../../application/commands/impl/create-user.command";
import { UpdateUserCommand } from "../../application/commands/impl/update-user.command";
import { DeleteUserCommand } from "../../application/commands/impl/delete-user.command";
import { GetUserByIdQuery } from "../../application/queries/impl/get-user-by-id.query";
import { GetAllUsersQuery } from "../../application/queries/impl/get-all-users.query";
import { JwtAuthGuard } from "../../../auth/infrastructure/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/infrastructure/guards/roles.guard";
import { Roles } from "../../../auth/infrastructure/decorators/roles.decorator";
import { UserRole } from "../../domain/enums/user-role.enum";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(@Body() registerDto: RegisterDto) {
    const { email, password, role } = registerDto;

    // Security: Only allow self-registration for CAREGIVER or SUPERVISOR
    if (role === UserRole.ADMIN || role === UserRole.PATIENT) {
      throw new ForbiddenException(
        "Registration for ADMIN or PATIENT roles is restricted. Please contact an administrator.",
      );
    }

    return this.commandBus.execute(
      new CreateUserCommand(email, password, role),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users (Admin only)" })
  @ApiResponse({ status: 200, description: "List of all users" })
  async findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("id") id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user (Admin only)" })
  @ApiResponse({ status: 200, description: "User updated" })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(
      new UpdateUserCommand(id, updateUserDto.email, updateUserDto.role),
    );
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user (Admin only)" })
  @ApiResponse({ status: 200, description: "User deleted" })
  @ApiResponse({ status: 404, description: "User not found" })
  async remove(@Param("id") id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
