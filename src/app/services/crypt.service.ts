import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {
  private key ='1203199320052021';
  private iv = CryptoJS.enc.Utf8.parse('1203199320052021');
  constructor() { }

  encrypt(value:string): string {
    const key =  CryptoJS.enc.Utf8.parse(this.key);
    const iv =  CryptoJS.enc.Utf8.parse(this.key);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

decrypt(value:string) {
  var decrypted = CryptoJS.AES.decrypt(value, this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

}
