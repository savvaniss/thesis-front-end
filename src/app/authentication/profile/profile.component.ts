import { Component, OnInit } from '@angular/core';
import {Data, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private userData;
  constructor(private router: Router,
              private authService: AuthenticationService,
              private dataService: DataService) {
      authService.checkUserToken(null);
      //this.userData = dataService.getData();
      //console.log(this.userData);
      //this.dataService.getFeed();
  }
    //private imgSrc: string = this.userData.cover.source;


  ngOnInit() {

  }

}
