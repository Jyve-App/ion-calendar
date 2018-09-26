import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { EventCalendar } from '../models'

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
  styles: [`
    :host {
      max-width: 400px;
      display: block;
      margin: auto;

      [col-1] {
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 8.33333%;
        -ms-flex: 0 0 8.33333%;
        flex: 0 0 14.285714285714286%;
        width: 14.285714285714286%;
        max-width: 14.285714285714286%;
      }
      .col {
        text-align: center;
        min-height: 35px;
      }
      .last-month, .next-month {
        color: #999999;
        font-size: 90%;
      }
      .current-date {
        padding: 5px;
      }
      .current-date {
        font-weight: bold;
        border: 2px solid color($colors, primary);
        border-radius: 30px;
      }
      .calendar-header {
        font-size: 20px;
        padding-top: 3px;
        padding-bottom: 3px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: color($colors, primary);
        color: #FFFFFF;
      }
      .bullet-container {
        margin: 2px auto;
        display: flex;
        flex-direction: row;
        min-height: 5px;
        .event-bullet {
          margin: auto;
          height: 5px;
          width: 5px;
          border-radius: 30px;
        }
      }

      .calendar-body {
        .grid {
          padding: 0;
        }
        .col:last-child {
          border-right: none;
        }
        .calendar-weekday, .calendar-date {
          text-align: center;
          margin: 0;
        }
        .calendar-weekday {
          font-weight: bold;
          border-bottom: solid 1px darken(color($colors, primary), $amount: 20%);
          background-color: darken(color($colors, primary), $amount: 15%);
          margin-bottom: 5px;
        }
        .calendar-date {
          background-color: #f8f8f8;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, .2);
        }
      }
    }`
  ]
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
