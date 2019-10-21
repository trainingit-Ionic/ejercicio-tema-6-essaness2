import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  usuarios: User[];

  constructor(private users: UserService, private call: CallNumber, private router: Router) {
    this.users.get().subscribe(
      resp => {
        this.usuarios = resp;
      },
      error => {
        console.log('Error feching users', error);
      }
    );
  }

  callUser(phone) {
    console.log(phone);
    if (phone !== undefined) {
      this.call
        .callNumber(phone, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    } else {
      console.log('No phone');
    }
  }

  viewUser(idUser) {
    this.router.navigateByUrl('clients/' + idUser);
  }
}
