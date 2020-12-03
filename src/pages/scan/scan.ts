import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  // variable qui va contenir le résultat de la promesse
  result: BarcodeScanResult;


  constructor(public navCtrl: NavController, public navParams: NavParams, private bcs: BarcodeScanner, private toastCtrl: ToastController) {
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      // message transmis à l'utilisateur
      prompt: 'Pointer votre caméra vers un code barre',
      // la lumière du smartphone ne s'allume pas
      torchOn: false
    };

    // scan retourne une promesse
    this.bcs.scan(options)
    // une fois que la promesse est résolu, le résultat est disponible
      .then(res => {
        this.result = res;
      })
      // si la promesse n'est pas résolu, alors on affiche un toast à l'utilisateur
      .catch(err => {
        this.toastCtrl.create({
          message: err.message
        }).present();
      })
  }
}
