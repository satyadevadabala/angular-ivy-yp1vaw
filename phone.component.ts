import { Component, OnInit } from '@angular/core';
import { windowService } from '../window.service';
import * as firebase from 'firebase';
import { WindowService } from './window.service';
import { error } from '@angular/compiler/src/util';


export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

@Component({
  selector: 'phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
})
export class phoneComponent implements OnInit {
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;

  constructor(private windw: WindowService) {}
  ngOnInit() {
    this.windowRef = this.windw.windowRef;
  }
  sendLoginCode() {
    const num = this.phoneNumber.e164;
    firebase
      .auth()
      .signInWithPhonenumber(num)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => console.log(error));
  }
  verify() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        this.user = result.user;
      })
      .catch((error) => console.log(error, 'invalid code entered'));
  }
}
