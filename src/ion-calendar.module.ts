import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { IonCalendarComponent } from './components'

@NgModule({
  declarations: [
    IonCalendarComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    IonCalendarComponent
  ]
})
export class IonCalendarModule {}
