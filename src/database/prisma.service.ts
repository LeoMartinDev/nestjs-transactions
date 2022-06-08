import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  $transaction(cb: (prisma: PrismaService) => Promise<any>) {
    return cb(this);
  }

  users = {
    findOne: (id: any) => ({
      id,
      firstName: 'Léo',
    }),
  };
}
