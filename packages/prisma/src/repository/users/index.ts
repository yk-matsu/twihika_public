import type {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {_FirebaseUserProviderModel} from '../../zod/firebaseuserprovider';
import {_FirebaseUserModel} from '../../zod/firebaseuser';
import {z} from 'zod';
import {UserInfo} from 'firebase-functions/v1/auth';

// partialにしておかないと、createdAtとかupdatedAtが必須になってしまうのでentityの文脈で使うことができない
type _User = Partial<z.infer<typeof _FirebaseUserModel>>;
type _Provider = Partial<z.infer<typeof _FirebaseUserProviderModel>>;

// use `prisma` in your application to read and write data in your DB
const _RawFirebaseUserModel = _FirebaseUserModel.pick({
  disabled: true,
  displayName: true,
  email: true,
  emailVerified: true,
  id: true,
  metadata: true,
  phoneNumber: true,
  photoUrl: true,
});
type _RawFirebaseUserModel = z.infer<typeof _RawFirebaseUserModel>;

const _RawFirebaseUserProviderModel = _FirebaseUserProviderModel.pick({
  displayName: true,
  firebaseUserId: true,
  photoUrl: true,
  providerId: true,
  email: true,
  id: true,
});
type _RawFirebaseUserProviderModel = z.infer<
  typeof _RawFirebaseUserProviderModel
>;

export class UserEntity {
  private user: _User;
  constructor(user: _User) {
    this.user = user;
  }

  public static fromFirebase(record: UserRecord) {
    const user = _RawFirebaseUserModel.parse({
      customClaims: record.customClaims,
      disabled: record.disabled,
      displayName: record.displayName,
      email: record.email,
      emailVerified: record.emailVerified,
      id: record.uid,
      metadata: record.metadata.toJSON(),
      phoneNumber: record.phoneNumber,
      photoUrl: record.photoURL,
    });
    return new this(user);
  }
  public getData(): _User {
    return this.user;
  }
}

export class ProviderEntity {
  private provider: _Provider;

  // 値を取り出すときにvalidationするのはどう？overhead高いかな。
  public constructor(provider: _Provider) {
    this.provider = provider;
  }
  public static fromFirebase(record: UserInfo, uid: string) {
    const provider = _RawFirebaseUserProviderModel.parse({
      displayName: record.displayName,
      email: record.email,
      firebaseUserId: uid,
      id: record.uid,
      phoneNumber: record.phoneNumber,
      photoUrl: record.photoURL,
      providerId: record.providerId,
    });
    return new this(provider);
  }
  public getData(): _Provider {
    return this.provider;
  }
}

export class UserAggregate {
  private user: UserEntity;
  private providers: ProviderEntity[];
  constructor(user: UserEntity, providers: ProviderEntity[]) {
    this.user = user;
    this.providers = providers;
  }
  public getData(): {user: _User; providers: _Provider[]} {
    return {
      user: this.user.getData(),
      providers: this.providers.map(item => item.getData()),
    };
  }
}
