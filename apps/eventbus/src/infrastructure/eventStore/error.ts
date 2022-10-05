export class DynamoDBSaveConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "DynamoDBSaveConflictError";
  }
}

export class DynamoDBNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "DynamoDBRecordNotFound";
  }
}

export class DynamoDBStateCountException extends Error {
  constructor(message) {
    super(message);
    this.name = "DynamoDBStateCoundException";
  }
}

export class DynamoDBIdAndVersionCountException extends Error {
  constructor(message) {
    super(message);
    this.name = "DynamoDBIdAndVersionCountException";
  }
}

export class InvalidStateFormatException extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidStateFormatException";
  }
}
