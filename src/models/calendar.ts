
export interface CalendarOptions {
  date: Date,
  monthNames?: Array<string>
}

export class Calendar {
  date: Date
  daysInThisMonth: any
  daysInLastMonth: any
  daysInNextMonth: any
  monthNames: Array<string>
  currentMonth: any
  currentYear: any
  currentDate: Date | number

  constructor (options?: CalendarOptions) {
    if (options) {
      this.date = options.date ? new Date(options.date) : new Date()
      this.monthNames = options.monthNames
    }

    this.date = this.date || new Date()
    this.monthNames = this.monthNames || ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']

    this.buildMonth()
  }

  goToLastMonth (day) {
    this.selectDate(this.date.getFullYear(), this.date.getMonth(), day)
    this.buildMonth()
  }

  goToDateInCurrentMonth (day) {
    this.selectDate(this.date.getFullYear(), this.date.getMonth() + 1, day)
  }

  goToNextMonth (day) {
    this.selectDate(this.date.getFullYear(), this.date.getMonth() + 2, day)
    this.buildMonth()
  }

  selectDate (year, month, day) {
    // Month is passed as base 1 because everything else passed is base 1
    // but constructor takes only month base 0
    this.date = new Date(year, month - 1, day)
    this.currentDate = this.date.getDate()
  }

  private buildMonth () {
    this.daysInThisMonth = new Array()
    this.daysInLastMonth = new Array()
    this.daysInNextMonth = new Array()
    this.currentMonth = this.monthNames[this.date.getMonth()]
    this.currentYear = this.date.getFullYear()
    this.currentDate = this.date.getDate() || 999

    let firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay()
    let prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()

    for (let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i)
    }

    let thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    for (let i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1)
    }

    let lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay()

    for (let i = 0; i < 6 - lastDayThisMonth; i++) {
      this.daysInNextMonth.push(i + 1)
    }

    let totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length

    if (totalDays < 36) {
      for (let i = 7 - lastDayThisMonth; i < 7 - lastDayThisMonth + 7; i++) {
        this.daysInNextMonth.push(i)
      }
    }
  }
}
