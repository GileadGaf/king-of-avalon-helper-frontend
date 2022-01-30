import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  public saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)||'null');
  }

  public  getVisualDisplay(num) {
    let sign = '';
    if (num < 1000) return num;
    if (num > (1e9 - 1)) {
      num /= 1e9;
      num = Math.floor(num*1000)/1000;
      sign += 'B';
    }
    if (num > 999999) {
      num /= 1000000;
      sign='M';
    }
    if (num > 999) {
      num /= 1000;
      sign='k';
    }
    return (Number.isInteger(num)? num:num.toString()) + sign;
  }

  public makeid(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}


