import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerOriginal, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  result: BarcodeScanResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bcs: BarcodeScannerOriginal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      // message indiquant à l'utilisateur de pointer sa caméra vers le code-barre du produit qu'il à envie de scanner (android seulement)
      prompt: 'Pointer votre caméra vers un code-barre',
      // option pour éclairer la lampe du smartphone ou pas (android seulement)
      torchOn: false
    };

    this.bcs.scan(options)
    // récupère le résultat
      .then(res => {
        this.result = res;
      })
      .catch(err => {
        // afficher le problème à l'utilisateur
      })
  }
}
