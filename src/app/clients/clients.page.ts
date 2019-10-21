import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  id: string;

  userDetail: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private call: CallNumber) {}

  ngOnInit() {
    this.id =  this.route.snapshot.paramMap.get('id');
    if (this.id !== undefined ) {
      this.userService.getOne(Number(this.id)).subscribe(
        (res) => {
          this.userDetail = res;
        },
        (error) => {
          console.log('Error retrieving user ', error);
        }
      );

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

}
