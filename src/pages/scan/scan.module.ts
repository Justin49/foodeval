import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanPage } from './scan';
import { BarcodeScannerOriginal, BarcodeScannerOptions, BarcodeScanResult} from '@ionic-native/barcode-scanner';


@NgModule({
  declarations: [
    ScanPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanPage),
  ],
  providers: [
    BarcodeScannerOriginal,
  ]
})
export class ScanPageModule {}
