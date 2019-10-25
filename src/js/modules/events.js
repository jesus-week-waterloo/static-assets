export class EventViewer {
  constructor(json) {
    this.events = json;
    this.lang = document.documentElement.lang;
  }

  format(date) {
    return new Intl.DateTimeFormat(this.lang, { month: 'short', day: '2-digit' }).format(date);
  }

  formatShort(date) {
    return new Intl.DateTimeFormat(this.lang, { weekday: 'short' }).format(date);
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
            times = event.canonicalTime.split('-');
  
      if (event.hasOwnProperty('dates')) {
        // find date closest to today
        for (const d of event.canonicalDates) {
          const startTime = new Date(d + ' ' + times[0]),
                endTime = new Date(d + ' ' + times[1]);

          if (startTime <= today && today <= endTime) {
            this.recentEvents.ongoing.push(Object.assign({ id }, event, {
              title: event.title[this.lang],
              time: event.time[this.lang],
              description: event.description[this.lang],
              formattedDate: this.format(startTime),
              formattedShortDate: this.formatShort(startTime),
              startTime, endTime
            }));
          } else if (startTime > today && 
              (startTime - today < 86400000 || (today.getHours() > 3 && startTime.getDate() - today.getDate() == 1))) {
            this.recentEvents.upcoming.push(Object.assign({ id }, event, {
              title: event.title[this.lang],
              time: event.time[this.lang],
              description: event.description[this.lang],
              formattedDate: this.format(startTime),
              formattedShortDate: this.formatShort(startTime),
              startTime, endTime
            }));
            break;
          }
        }
      } else {
        const startTime = new Date(event.canonicalDate + ' ' + times[0]),
              endTime = new Date(event.canonicalDate + ' ' + times[1]);

        if (startTime <= today && today <= endTime) {
          this.recentEvents.ongoing.push(Object.assign({ id }, event, {
            title: event.title[this.lang],
            time: event.time[this.lang],
            description: event.description[this.lang],
            formattedDate: this.format(startTime),
            formattedShortDate: this.formatShort(startTime),
            startTime, endTime
          }));
        } else if (startTime > today && 
            (startTime - today < 86400000 || (today.getHours() > 3 && startTime.getDate() - today.getDate() == 1))) {
          this.recentEvents.upcoming.push(Object.assign({ id }, event, {
            title: event.title[this.lang],
            time: event.time[this.lang],
            description: event.description[this.lang],
            formattedDate: this.format(startTime),
            formattedShortDate: this.formatShort(startTime),
            startTime, endTime
          }));
        }
      }
    }

    this.recentEvents.ongoing.sort((el1, el2) => el1.endTime - el2.endTime);
    this.recentEvents.upcoming.sort((el1, el2) => el1.startTime - el2.startTime);
  }

  getRecentEvents() {
    return this.recentEvents;
  }

  render(templ) {
    return templ.replace(/#\{(\w+)\}/g, (_, m, sub) => this.events[this.event][sub]);
  }
}
