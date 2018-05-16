import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor() {

  }

  public static data: any = {};

  public getData() {
    return StorageProvider.data;
  }

  public setData(data: any) {
    StorageProvider.data = data;
  }


}
