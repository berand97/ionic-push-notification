import { Component } from '@angular/core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.pushSetup();
    });
  }

  pushSetup() {
    PushNotifications.requestPermissions().then((res: any) => {
      if (res.receive === 'granted') {
        console.log('Permiso de notificaciones habilitado');
      } else {
        console.log('Permiso de notificaciones deshabilitado');
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Token de registro:', token);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Notificación recibida:', notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Acción de notificación realizada:', notification);
      }
    );
  }
}
