import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity.js';
import { Repository } from 'typeorm';

export const USERS_PER_PAGE = 20;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepo.find();
  }

  async findPage(page: number = 1): Promise<[UsersEntity[], number]> {
    if (page < 1) page = 1;
    return await this.usersRepo.findAndCount({
      skip: (page - 1) * USERS_PER_PAGE,
      take: USERS_PER_PAGE,
    });
  }
}
