import { UserRecord } from 'firebase-functions/v1/auth';
import { PrismaClient } from '../../generated/prisma-client-js';
import {
  UserRepository,
  UserAggregate,
  UserEntity,
  ProviderEntity,
} from '../../repository/user';

let prisma: PrismaClient;
beforeAll(async () => {
  // create the customer
  prisma = new PrismaClient();
});

afterAll(async () => {
  const deleteOrderDetails = prisma.firebaseUser.deleteMany();
  const deleteProduct = prisma.firebaseUserProvider.deleteMany();

  await prisma.$transaction([deleteProduct]);
  await prisma.$transaction([deleteOrderDetails]);

  await prisma.$disconnect();
});

it('should create 1 new customer with 1 order', async () => {
  const userRecord: UserRecord = {
    uid: 'uqOx2sXDyCPXKq2PZz5V5XXFvRq2',
    email: 'fasdlnaopsfextension@gmail.com',
    emailVerified: true,
    displayName: 'extension chrome',
    photoURL:
      'https://lh3.googleusercontent.com/a/AItbvmmsRudHQCLM_W2tgYmZyci5FS-z00CY2Sh5d2is=s96-c',
    phoneNumber: undefined,
    disabled: false,
    metadata: {
      creationTime: 'Wed, 31 Aug 2022 05:17:44 GMT',
      lastSignInTime: 'Wed, 31 Aug 2022 05:17:44 GMT',
      lastRefreshTime: 'Wed, 31 Aug 2022 05:17:44 GMT',
      toJSON: (): Object =>{ return {}}
    },
    providerData: [
      {
        uid: '117514545422696252789',
        displayName: 'extension chrome',
        email: 'fasdlnaopsfextension@gmail.com',
        photoURL:
          'https://lh3.googleusercontent.com/a/AItbvmmsRudHQCLM_W2tgYmZyci5FS-z00CY2Sh5d2is=s96-c',
        providerId: 'google.com',
        phoneNumber: '',
        toJSON: (): Object =>{ return {}}
      },
    ],
    passwordHash: undefined,
    passwordSalt: undefined,
    tokensValidAfterTime: 'Wed, 31 Aug 2022 05:17:44 GMT',
    tenantId: undefined,
        toJSON: (): Object =>{ return {}}
  };
  const user = new UserAggregate(UserEntity.fromFirebase(userRecord ), [
    ProviderEntity.fromFirebase(userRecord.providerData[0], userRecord.uid),
  ]);
  const userRepository = new UserRepository(prisma);
  const {userSaved, providersSaved} = await userRepository.save(user);

  // Expect the new customer to have been created and match the input
  expect(userSaved.id).toEqual(userRecord.uid);
  expect(providersSaved.count).toEqual(1);
  // Expect the new order to have been created and contain the new customer
});
