import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  // variable qui va contenir le résultat de la promesse
  result: BarcodeScanResult;
  // url de la page ou sont affiché tout les produits (parti qui ne change pas), auquel on concataine le code barre du produit (parti qui change)
  BASE_URL = 'https://world/openfoodfacts.org/api/v0/product/';
  // variable de vue qui vont contenir les données passé depuis l'observable auquel on devra s'abonner
  api_response_raw;
  api_response;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bcs: BarcodeScanner, private toastCtrl: ToastController, private http: HttpClient) {
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


  //Version avec async et await, async devant le nom de la méthode, await permet d'attendre la résolution de la promise. Autrement dit partout ou il y aurait eu un then(), il suffit de faire précéder d'un await
  /*
  async scanBarcode() {
    try{
      const options: BarcodeScanResult = {
        prompt: 'Pointer votre caméra vers un code barre',
        torchOn: false
      };

      this.result = await this.bcs.scan(options);
      await this.bcs.scan(options);
    } catch(err) {
      console.error(err);
      this.toastCtrl.create({message: err.message}).present();
    }
  }
  */

  // méthode qui va permettre d'obtenir un article à partir de son code barre, code barre que l'on aure récupérer grâce à la méthode scanBarcode, en paramètre de la méthode le code qui aura été récupérer
  getArticleByBarcode(code: string) {
    this.http
    // on concataine l'url et le code
      .get(`${this.BASE_URL}${code}`)
      // on s'abonne à l'observable que retourne la méthode, une fois qu'on décide d'appeler nos données (ici data) alors 3 callbacks sont possible avec .subscribe(), le premier appeler en cas de succès, le second appeler en cas d'échec et le 3ème appeler quand le callback n'a plus rien à envoyer

      // le premier callback passera nos data dans une fonction appeler displayResult en cas de succès, le deuxième callback passera nos data dans une fonction appeler handleGetError en cas d'échec
      .subscribe(data => this.displayResult(data), error => this.handleGetError(error));

  }

  // méthode qui va gérer le callback en cas de succès
  displayResult(data) {
    // retourne un observable auquel on s'abonne, on lui passe ces données
    this.api_response = data;
    this.api_response_raw = data;
  }

  // méthode qui va gérer le callback en cas d'échec
  handleGetError(error) {
    console.log(error);
    console.error(error.message);
  }

}
