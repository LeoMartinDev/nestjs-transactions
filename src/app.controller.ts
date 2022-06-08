import { Controller, Get } from '@nestjs/common';
import { DatabaseManager } from './database/DatabaseManager';
import { UsersRepository } from './database/UsersRepository';

@Controller()
export class AppController {
  constructor(
    private readonly databaseManager: DatabaseManager,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Get()
  async getHello() {
    const data = await this.databaseManager.withTransaction(async () => {
      const user = await this.usersRepository.findOne('1');

      return user;
    });

    return data;
  }
}
