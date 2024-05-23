import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importa Firebase
import { initializeApp } from 'firebase/app';

// Configuración de Firebase

const firebaseConfig = {
    apiKey: "AIzaSyDJVQzo8Z9F36Q_8Omdzsj5sPgYgFFRqiY",
    authDomain: "skattlenote.firebaseapp.com",
    projectId: "skattlenote",
    storageBucket: "skattlenote.appspot.com",
    messagingSenderId: "812778900439",
    appId: "1:812778900439:web:a075b504191854ce9d1992",
    measurementId: "G-39CHXZ7Y3Q"
  };


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
