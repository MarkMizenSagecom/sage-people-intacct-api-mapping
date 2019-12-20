import { Injectable } from "@angular/core";

@Injectable()
export class IdService {

  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  private _generateString(length: number): string {
    let result = '';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getId():string {
    return this._generateString(12);
  }
}
