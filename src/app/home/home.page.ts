import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  usuarios: User[];

  avatares =  new Array<string>();

  constructor(private users: UserService, private call: CallNumber, private router: Router) {
    
    this.users.get().subscribe(
      resp => {
        this.usuarios = resp;
        this.generarAvatares();
      },
      error => {
        console.log('Error feching users', error);
      }
    );
  }

  generarAvatares() {
    console.log('generar avatares');
    for (let i = 0 ; i < this.usuarios.length; i++) {
        const email = this.usuarios[i].email;
        const contenido = 'https://gravatar.com/avatar/' + Md5.hashAsciiStr(email.trim().toLocaleLowerCase()) as string;
        this.avatares.push(contenido);
    }
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
