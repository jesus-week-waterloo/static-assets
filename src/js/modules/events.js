export class EventViewer {
  constructor(json) {
    this.events = json;
  }

  format(date) {
    return `${('0' + (date.getMonth() + 1)).slice(-2)}.${('0' + date.getDate()).slice(-2)}.${date.getFullYear()}`;
  }

  formatShort(date) {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()] + '.';
  }

  render(templ) {
    return templ.replace(/#\{(\w+)\.(\w+)\}/g, (_, m, ev, sub) => this.events[ev][sub]);
  }
}

export class RecentEventViewer extends EventViewer {
  constructor(json, today = new Date()) {
    super(json);

    this.event = null;
    this.recentEvents = {
      ongoing: [],
      upcoming: []
    }

    let latestDate = new Date(2 ** 32 * 1000);

    for (const id in this.events) {
      const event = this.events[id],
            times = event.Time.split('-')
            .map(t => /^\d+$/.test(t) ? t + 'pm' : t)
            .map(t => (parseInt(t.slice(0, 2)) + (~t.indexOf('pm') ? 12 : 0)) + ':' + (isNaN(parseInt(t.slice(2, 4))) ? '00' : t.slice(2, 4)));
  
      if (event.hasOwnProperty('Dates')) {
        // find date closest to today
        for (const d of event.Dates) {
          const startTime = new Date(d + ' ' + times[0]),
                endTime = new Date(d + ' ' + times[1]);

          if (startTime <= today && today <= endTime) {
            this.recentEvents.ongoing.push(Object.assign({ id }, event, {
              formattedDate: this.format(startTime),
              formattedShortDate: this.formatShort(startTime),
              startTime, endTime
            }));
          } else if (startTime > today && 
              (startTime - today < 86400000 || (today.getHours() > 3 && startTime.getDate() - today.getDate() == 1))) {
            this.recentEvents.upcoming.push(Object.assign({ id }, event, {
              formattedDate: this.format(startTime),
              formattedShortDate: this.formatShort(startTime),
              startTime, endTime
            }));
            break;
          }
        }
      } else {
        const startTime = new Date(event.Date + ' ' + times[0]),
              endTime = new Date(event.Date + ' ' + times[1]);

        if (startTime <= today && today <= endTime) {
          this.recentEvents.ongoing.push(Object.assign({ id }, event, {
            formattedDate: this.format(startTime),
            formattedShortDate: this.formatShort(startTime),
            startTime, endTime
          }));
        } else if (startTime > today && 
            (startTime - today < 86400000 || (today.getHours() > 3 && startTime.getDate() - today.getDate() == 1))) {
          this.recentEvents.upcoming.push(Object.assign({ id }, event, {
            formattedDate: this.format(startTime),
            formattedShortDate: this.formatShort(startTime),
            startTime, endTime
          }));
        }
      }
    }

    this.recentEvents.ongoing.sort((el1, el2) => el1.startTime - el2.startTime);
    this.recentEvents.upcoming.sort((el1, el2) => el1.startTime - el2.startTime);
  }

  getRecentEvents() {
    return this.recentEvents;
  }

  render(templ) {
    return templ.replace(/#\{(\w+)\}/g, (_, m, sub) => this.events[this.event][sub]);
  }
}
