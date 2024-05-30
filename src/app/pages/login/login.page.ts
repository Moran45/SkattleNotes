import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) {}

  async presentTermsAlert() {
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: 'Aquí irán los términos y condiciones de uso.',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async login() {
    try {
      const userCredential = await this.authService.login(this.email, this.password);
      console.log(userCredential);
      // Navega al dashboard o a la página principal
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }

  async register() {
    try {
      const userCredential = await this.authService.register(this.email, this.password);
      console.log(userCredential);
      // Navega al dashboard o a la página principal
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }
}
