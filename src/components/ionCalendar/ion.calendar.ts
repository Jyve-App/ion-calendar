import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { EventCalendar } from '../../models'

@Component({
  selector: 'ion-calendar',
  template: `
    <div class="calendar-header">
      <ion-row class="calendar-month">
        <ion-col col-2 (click)="goToLastMonth()">
          <ion-icon name="arrow-back"></ion-icon>
        </ion-col>
        <ion-col col-8>{{calendar.currentMonth}} {{calendar.currentYear}}</ion-col>
        <ion-col col-2 (click)="goToNextMonth()">
          <ion-icon name="arrow-forward"></ion-icon>
        </ion-col>
      </ion-row>
    </div>
    <div class="calendar-body">
      <ion-grid>
        <ion-row justify-content-center class="calendar-weekday">
          <ion-col>S</ion-col>
          <ion-col>M</ion-col>
          <ion-col>T</ion-col>
          <ion-col>W</ion-col>
          <ion-col>T</ion-col>
          <ion-col>F</ion-col>
          <ion-col>S</ion-col>
        </ion-row>
        <ion-row justify-content-center class="calendar-date">
          <ion-col align-self-center col-1 *ngFor="let lastDay of calendar.daysInLastMonth" class="last-month" (click)="goToLastMonth(lastDay)">{{lastDay}}</ion-col>
          <ion-col align-self-center col-1 *ngFor="let day of calendar.daysInThisMonth" (click)="selectDate(day)">
            <span [ngClass]="{'current-date': calendar.currentDate === day}">{{day}}</span>
            <br>
            <div class="bullet-container" *ngIf="true && calendar.currentDate !== day">
              <div class="event-bullet {{'background-' + bullet.color}}" *ngFor="let bullet of getEventsOn(day)"></div>
            </div>
          </ion-col>
          <ion-col align-self-center col-1 *ngFor="let nextDay of calendar.daysInNextMonth" class="next-month" (click)="goToNextMonth(nextDay)">{{nextDay}}</ion-col>
        </ion-row>
      </ion-grid>
    </div>
  `,
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
