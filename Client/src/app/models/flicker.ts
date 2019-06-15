export class Flicker {
  get tags(): string {
    return this._tags;
  }
  get author(): string {
    return this._author;
  }
  get media(): string {
    return this._media;
  }
  get link(): string {
    return this._link;
  }
  get title(): string {
    return this._title;
  }
  get id(): string {
    return this._id;
  }
  private _id: string;
  private _title: string;
  private _link: string;
  private _media: string;
  private _author: string;
  private _tags: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
