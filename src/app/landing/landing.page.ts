import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private router: Router , private navCtrl: NavController) { }

  funcionLogin(){
    this.router.navigate(['/login'])
  }

  funcionCrearCuenta(){
    this.router.navigate(['/register'])
  }

  swiperSlideChanged(e: any){
    console.log('changed: ', e);
  }


  ngOnInit() {
  }

}
