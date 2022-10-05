import { Injectable } from '@nestjs/common';
import { app } from '@twihika/auth';

@Injectable()
export class FirebaseClient {
  firebaseApp: typeof app;

  constructor() {
    this.firebaseApp = app;
  }

  getAuth() {
    return this.firebaseApp.auth();
  }
}
