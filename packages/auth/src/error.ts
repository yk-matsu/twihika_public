export class AuthenticatedButNotAdmin extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = "AuthenticatedButNotAdmin"; // (2)
  }
}

export class EmailIsNotVerified extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = "EmailIsNotVerified"; // (2)
  }
}
