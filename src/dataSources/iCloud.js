import _ from 'lodash';
import { DAVClient } from 'tsdav';
import BaseDataSource from './BaseDataSource';

/**
 * A data source for iCloud CalDAV data
 */
class ICloudDataSource extends BaseDataSource {
  constructor(credentials) {
    super();

    // TODO: Support multiple clients?
    this.client = new DAVClient({
      serverUrl: 'https://caldav.icloud.com',
      credentials,
      authMethod: 'Basic',
      defaultAccountType: 'caldav',
    });
    this.calendars = [];
  }

  /**
   * Login/Authenticate the client
   */
  async authenticate() {
    await this.client.login();
  }

  /**
   * Fetch or sync calendar objects and store them
   *
   * @returns {Promise}
   */
  async fetchCalendars() {
    if (this.calendars.length) {
      await this.client.syncCalendars(this.calendars);
    } else {
      this.calendars = await this.client.fetchCalendars();
    }
  }

  /**
   * Find fetched calendars
   *
   * @param {*} predicate A predicate for finding a calendar object
   * @returns {DAVCalendar}
   */
  findCalendar(predicate) {
    return _.find(this.calendars, predicate);
  }

  /**
   * Filter fetched calendars
   *
   * @param {*} predicate A predicate for filtering a calendar objects
   * @returns {DAVCalendar[]}
   */
  filterCalendars(predicate) {
    return _.filter(this.calendars, predicate);
  }

  /**
   * Fetch calendar objects from a calendar
   *
   * @param {DAVCalendar} calendar The calendar to fetch from
   * @param {object} timeRange Time range to filter calendar object
   * @param {string} timeRange.start start time in ISO 8601 format
   * @param {string} timeRange.end end time in ISO 8601 format
   * @returns {DAVCalendarObject[]}
   */
  async fetchCalendarObjects(calendar, timeRange) {
    return this.client.fetchCalendarObjects({ calendar, timeRange });
  }
}

export default ICloudDataSource;
