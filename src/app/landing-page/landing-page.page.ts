import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Field } from '../model/field';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
@Injectable({
  providedIn: 'root' 
})
export class LandingPagePage implements OnInit {
  Object = Object;
  myArray: Field[];
  docuID: string;
  private collection: AngularFirestoreCollection<Field>;
  myCollection: Observable<Field[]>;
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.collection = this.afs.collection('Exceldata');
    this.myCollection = this.collection.valueChanges();
  }

  ngOnInit() {
    this.excelData();
    this.auth.getDataFromFirebase().subscribe((myArray) => {
      this.myArray = myArray;
    });
  }
  logout() {
    this.auth.signOut();
  }
  
  excelData() {
    var sf =  'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:json';
    this.http.get(sf, { responseType: 'text' }).subscribe((res) => {
      const data = res
        .toString()
        .match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
      if (data && data.length == 2) {
        const obj = JSON.parse(data[1]);
        const table = obj.table;
        const header = table.cols.map(({ label }) => label);
        const rows = table.rows.map(({ c }) => c.map(({ v }) => v));
        const values = rows.map((e) =>
          header.reduce((o, f, j) => Object.assign(o, { [f]: e[j] }), {})
        );
        this.auth.getDataFromFirebase().subscribe((myArray) => {
          this.docuID = myArray[0].docId;
          if (!this.collection.doc) {
            this.collection.doc().set(Object.assign({}, values));
          } else {
             this.collection.doc(this.docuID).set(Object.assign({}, values));
          }
        });
      }
    });
  }
  cardButton(event){
    console.log(event.srcElement.id)
   
  }
}
