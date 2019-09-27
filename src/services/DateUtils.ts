export const DateUtils = {
  formatDigit(n: number): string {
    return `0${n}`.slice(-2)
  },
  formatDate(date: Date): string {
    if (!date) {
      return ''
    }
    return (
      this.formatDigit(date.getDate()) +
      '.' +
      this.formatDigit(date.getMonth() + 1) +
      ' ' +
      this.formatDigit(date.getHours()) +
      ':' +
      this.formatDigit(date.getMinutes())
    )
  },
  formatFull(d: string): string {
    if (!d) {
      return ''
    }
    const date = new Date(d)
    return (
      date.getFullYear() +
      '-' +
      this.formatDigit(date.getMonth() + 1) +
      '-' +
      this.formatDigit(date.getDate()) +
      ' ' +
      this.formatDigit(date.getHours()) +
      ':' +
      this.formatDigit(date.getMinutes())
    )
  },
  beautyTimes(startTime: string, endTime: string): string {
    if (
      startTime === null ||
      startTime === undefined ||
      endTime === null ||
      endTime === undefined
    ) {
      return ''
    }
    const deltaMs = new Date(endTime).getTime() - new Date(startTime).getTime()
    return this.beautyTime(deltaMs)
  },
  beautyTime(timeMs: number): string {
    let result = timeMs / 1000
    if (result > 60) {
      const min = Math.floor(result / 60)
      const sec = Math.floor(result - min * 60)
      return (
        min +
        ' ' +
        this.getNumEnding(min, ['минута', 'минуты', 'минут']) +
        ' ' +
        sec +
        ' ' +
        this.getNumEnding(sec, ['секунда', 'секунды', 'секунд'])
      )
    } else {
      return Math.round(result) + ' секунд'
    }
  },
  getNumEnding(num: number, titles: string[]): string {
    if (!titles) {
      return ''
    }
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[
      num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
    ]
  },
  workingMinutesBetweenDates(startDate: Date, endDate: Date) {
    // Store minutes worked
    let minutesWorked = 0

    // Validate input
    if (endDate < startDate) {
      return 0
    }

    // Loop from your Start to End dates (by hour)
    const current = startDate

    // Define work range
    const workHoursStart = 9
    const workHoursEnd = 18
    const includeWeekends = false

    // Loop while currentDate is less than end Date (by minutes)
    while (current.getTime() <= endDate.getTime()) {
      // Is the current time within a work day (and if it
      // occurs on a weekend or not)
      if (
        current.getHours() >= workHoursStart &&
        current.getHours() < workHoursEnd &&
        (includeWeekends
          ? current.getDay() !== 0 && current.getDay() !== 6
          : true)
      ) {
        minutesWorked++
      }

      // Increment current time
      current.setTime(current.getTime() + 1000 * 60)
    }

    // Return the number of hours
    return minutesWorked
  }
}
