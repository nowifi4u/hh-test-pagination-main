import { UserService } from './users.service.js';
import { Controller, Get, Logger } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto.js';
import { Query } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query('page') _page: string | undefined) {
    let page = Number.parseInt(_page);
    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;

    this.logger.log(`/users?page=${page} (raw page=${_page})`);

    const [users, count] = await this.userService.findPage(page);
    return {
      users: users.map((user) => UsersResponseDto.fromUsersEntity(user)),
      count,
      page,
    };
  }
}
