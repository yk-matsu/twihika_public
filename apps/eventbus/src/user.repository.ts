import { Injectable } from '@nestjs/common';
import { PrismaClient } from './client.prisma';
import { UserAggregate } from '@twihika/prisma';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  public async save(userAgg: UserAggregate) {
    const { user, providers } = userAgg.getData();
    const [userSaved, providersSaved] = await this.prisma.$transaction([
      this.prisma.firebaseUser.create({
        data: {
          ...user,
        },
      }),
      this.prisma.firebaseUserProvider.createMany({
        data: providers.map((item) => {
          return {
            id: item.id!,
            providerId: item.providerId!,
            firebaseUserId: item.firebaseUserId!,
            email: item.email!,
            phoneNumber: item.phoneNumber!,
            photoUrl: item.photoUrl!,
            displayName: item.displayName!,
          };
        }),
      }),
    ]);
    return { userSaved, providersSaved };
  }
  public async delete(uid: string) {
    const [providersSaved, userSaved] = await this.prisma.$transaction([
      this.prisma.firebaseUserProvider.deleteMany({
        where: {
          firebaseUserId: uid
        },
      }),
      this.prisma.firebaseUser.delete({
        where: {
          id: uid,
        },
      }),
    ]);
    return { userSaved, providersSaved };
  }
}
