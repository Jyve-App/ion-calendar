import { Calendar } from './calendar'

import groupBy from 'lodash/groupBy'

export interface Event {
  date: Date,
  color: string
}

export interface EventFilter {
  date?: Date,
  year?: number,
  month?: number,
  day?: number
}

export class EventCalendar extends Calendar {
  private events: Array<Event>
  private eventsByYearMonth: any

  constructor (date?, events?) {
    date = date || new Date()
    super({ date })

    this.events = events || []
    this.build()
  }

  getEventsOn (filter: EventFilter) {
    let { date, year, month, day } = filter

    if (date) {
      year = date.getFullYear()
      month = date.getMonth()
      day = date.getDate()
    }

    let y = this.eventsByYearMonth[year]
    if (!y) {
      return []
    }
    let m = y[month]

    if (!m) {
      return []
    }

    return m[day] || []
  }

  private build () {
    if (this.events && this.events.length) {
      // By year
      this.eventsByYearMonth = groupBy(this.events, (e: Event) => {
        return e.date.getFullYear()
      })

      // By Month
      Object.keys(this.eventsByYearMonth).forEach(year => {
        let events = this.eventsByYearMonth[year]
        this.eventsByYearMonth[year] = groupBy(events, (e: Event) => {
          return e.date.getMonth() // remember base 0
        })

        // By Day
        Object.keys(this.eventsByYearMonth[year]).forEach(month => {
          let events = this.eventsByYearMonth[year][month]
          this.eventsByYearMonth[year][month] = groupBy(events, (e: Event) => {
            return e.date.getDate()
          })
        })
      })
    }

    this.eventsByYearMonth = this.eventsByYearMonth || {}
  }
}
