import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity.js';
import { UserService } from './users.service.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
