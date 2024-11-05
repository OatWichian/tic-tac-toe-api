import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

const includeSelectActive = (args: any) => {
  if (args.include) {
    for (const key of Object.keys(args.include)) {
      if (key == '_count') continue;
      if (!args.include[key].where) {
        args.include[key] = { where: { status: { not: -1 } }, ...args.include[key] };
      } else if (args.include[key].where) {
        args.include[key].where = { status: { not: -1 }, ...args.include[key].where };
      }
      includeSelectActive(args.include[key]);
    }
  }
};

function PrismaExtendedClient() {
  const prisma = (url: string) => {
    const prismaClient = new PrismaClient({
      // log: ["query","error","info","warn"]
    });
    return prismaClient
      .$extends({
        query: {
          $allOperations({ model, operation, args, query }) {
            if (operation.startsWith('find') || 'count' == operation) {
              args.where = { status: { not: -1 }, ...args.where };
              includeSelectActive(args);
            }
            return query(args);
          },
        },
      })
      .$extends({
        name: 'soft-delete',
        query: {
          $allModels: {
            async delete({ model, args }) {
              return prismaClient[model].update({
                ...args,
                data: { status: -1 },
              });
            },
            async deleteMany({ model, args }) {
              return prismaClient[model].updateMany({
                ...args,
                data: { status: -1 },
              });
            },
          },
        },
      })
      .$extends(
        readReplicas({
          url,
        }),
      );
  };

  return class {
    constructor(url: string) {
      return prisma(url);
    }
  } as new (url: string) => ReturnType<typeof prisma>;
}
@Injectable()
export class PrismaService extends PrismaExtendedClient() implements OnModuleInit, OnModuleDestroy {
  constructor(protected readonly configService: ConfigService) {
    super(configService.get('database.replica_url'));
  }

  async onModuleInit() {
    await this.$replica().$connect();
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$replica().$disconnect();
    await this.$disconnect();
  }
}
