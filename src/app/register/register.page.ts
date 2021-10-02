import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
firstname:string;
lastname:string;
email:string;
password:string;
  
  constructor( 
    private afs:AngularFirestore, 
    private afauth:AngularFireAuth, 
    private router:Router, 
    private loadingCtrl:LoadingController,
    private toastr:ToastController
    ) { }

  ngOnInit() {
  }
  
  async register(){
    if(this.firstname && this.lastname && this.email && this.password){
      const loading =await this.loadingCtrl.create({
        message:'Processing...',
        spinner:'crescent',
        showBackdrop:true
      });
      loading.present();
      
      this.afauth.createUserWithEmailAndPassword(this.email,this.password)
      .then((data)=>{
        this.afs.collection('user').doc(data.user.uid).set({
          'userId':data.user.uid,
          'userEmail':this.email,
          'userFirstname':this.firstname,
          'userLastname':this.lastname
        })
        .then(()=>{
          loading.dismiss();
          this.toast('Registration Success','success');
          this.router.navigate(['/login']);
        })
        .catch(error=>{
          loading.dismiss();
          this.toast(error.message,'danger')
        })
      })
    }
  }//end of register

  async toast(message,status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration:2000
    });
    toast.present();
  }// end of toast
}

