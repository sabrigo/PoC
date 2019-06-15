export class Favourites {
  private _id: number;
  private _peopleId: number;
  private _imageId: number;

  get imageId(): number {
    return this._imageId;
  }

  set imageId(value: number) {
    this._imageId = value;
  }

  get peopleId(): number {
    return this._peopleId;
  }

  set peopleId(value: number) {
    this._peopleId = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  constructor(data) {
    Object.assign(this, data);
  }
}
