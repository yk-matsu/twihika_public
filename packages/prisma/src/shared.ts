export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean
  public error: T | string | null
  private _value: T | null;

  public constructor (isSuccess: boolean, error: T | string | null, value: T | null) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue () : T | null {
    if (!this.isSuccess) {
      console.log(this.error,);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    }

    return this._value;
  }

  public errorValue (): T {
    return this.error as T;
  }

  public static ok<U> (value: U) : Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U> (error: any): Result<U> {
    return new Result<U>(false, error, null);
  }

  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok(null);
  }
}
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public readonly props: T;

  constructor (props: T) {
    this.props = props;
  }
}