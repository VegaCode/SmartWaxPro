import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
      private _fuseTranslationLoaderService: FuseTranslationLoaderService
  )
  {
      this._fuseTranslationLoaderService.loadTranslations(english, turkish);
  }
}


// @Component({
//   selector   : 'landing',
//   templateUrl: './landing.component.html',
//   styleUrls  : ['./landing.component.scss']
// })
// export class LandingComponent
// {
//   /**
//    * Constructor
//    *
//    * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
//    */
//   constructor(
//       private _fuseTranslationLoaderService: FuseTranslationLoaderService
//   )
//   {
//       this._fuseTranslationLoaderService.loadTranslations(english, turkish);
//   }
// }
