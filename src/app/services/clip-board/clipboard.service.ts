import { Injectable } from '@angular/core';
import { copy } from 'clipboard';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  readValueFromClipboard(callback: (value: string) => void):void {
    navigator['clipboard'].readText().then((value) => {
      callback(value);
    });
  }

  canReadValueFromClipboard():boolean {
    if (!navigator['clipboard']) {
      return false;
    }
    return !!navigator['clipboard'].readText;
  }

  saveValueOnClipboard(value: string):void {
    copy(value);
  }

  canSaveValueOnClipboard():boolean {
    return !!copy;
  }

}
