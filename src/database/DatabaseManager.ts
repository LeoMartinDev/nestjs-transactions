import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class DatabaseManager {
  private isInTransaction = false;
  private prismaTransactionClient: any;

  constructor(private readonly prismaService: PrismaService) {}

  get client() {
    return this.isInTransaction
      ? this.prismaTransactionClient
      : this.prismaService;
  }

  withTransaction(callback: () => Promise<any>) {
    if (this.isInTransaction) {
      return callback();
    }

    this.isInTransaction = true;

    return this.prismaService.$transaction(async (prisma: PrismaService) => {
      this.prismaTransactionClient = prisma;

      try {
        const result = await callback();

        return result;
      } catch (error) {
      } finally {
        this.isInTransaction = false;
        this.prismaTransactionClient = undefined;
      }
    });
  }
}
