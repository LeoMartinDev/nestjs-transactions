import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseManager } from './database/DatabaseManager';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './database/UsersRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DatabaseManager,
    UsersRepository,
    {
      provide: PrismaService,
      useFactory: (databaseManager: DatabaseManager) => {
        return databaseManager.client;
      },
      inject: [DatabaseManager],
    },
  ],
})
export class AppModule {}
