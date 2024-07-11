export abstract class OperationType {
  protected constructor(
    private _cost: number,
    private _name,
  ) {
    this._cost = _cost;
    this._name = _name;
  }

  abstract calculate(...args: number[]): Promise<number | string>;

  get cost(): number {
    return this._cost;
  }

  get name(): string {
    return this._name;
  }
}
