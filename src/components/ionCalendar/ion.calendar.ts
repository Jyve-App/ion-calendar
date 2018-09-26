import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { EventCalendar } from '../../models'

@Component({
  selector: 'ion-calendar',
  templateUrl: './ion-calendar.html',
  styleUrls: ['./ion-calendar.scss']
})
export class IonCalendarComponent implements OnInit {
  @Input('events') events?: Array<any>
  @Input('date') date?: Date
  @Output() daySelected: EventEmitter<any> = new EventEmitter()

  public calendar: EventCalendar

  ngOnInit () {
    this.events = this.events || []
    this.date = this.date || new Date()

    this.calendar = new EventCalendar(this.date, this.events)
  }

  goToLastMonth (day?) {
    day = day || 1
    this.calendar.goToLastMonth(day)
    this.emitDaySelected(this.calendar.date)
  }

  selectDate (day) {
    this.calendar.goToDateInCurrentMonth(day)
    this.emitDaySelected(this.calendar.date)
  }

  goToNextMonth (day?) {
    day = day || 1
    this.calendar.goToNextMonth(day)
    this.emitDaySelected(this.calendar.date)
  }

  getEventsOn (day) {
    let date = new Date(this.calendar.date)
    let events = this.calendar.getEventsOn({ year: date.getFullYear(), month: date.getMonth(), day })
    return events
  }

  private emitDaySelected (date) {
    this.daySelected.emit(date)
  }
}
