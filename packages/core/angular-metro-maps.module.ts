/**
 * Created by szhitenev on 27.07.17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetroMapComponent } from './components/metro-map/metro-map.component';

import { Document } from './opaque-tokens/document';

let document: any = {};

if (typeof window !== 'undefined') {
  document = window.document;
}

@NgModule({

  imports: [
    CommonModule
  ],
  declarations: [
    MetroMapComponent
  ],
  exports: [
    MetroMapComponent
  ],
  providers: [
    {provide: Document, useValue: document}
  ]

})

export class AmmModule {}
