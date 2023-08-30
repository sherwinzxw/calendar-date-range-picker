export const convertAusDateStringToDate = (dateString: string) => {
  let date;
  try {
    const [day, month, year] = dateString.split("/");
    date = new Date(+year, +month - 1, +day);
    date = date.toLocaleString();
  } catch {
    date = dateString;
  }
  return date;
};

export const convertAusDateStringToDateObject = (dateString: string) => {
  let date;
  try {
    const [day, month, year] = dateString.split("/");
    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } catch {
    date = null;
  }
  return date;
};

export const convertIsoDateStringToDateObject = (dateString: string) => {
  let date;
  try {
    const [year, month, day] = dateString.split("-");
    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } catch {
    date = undefined;
  }
  return date;
};

export function convertNowToIsoDateString() {
  let today = new Date();
  const offset = today.getTimezoneOffset();
  const dateString = new Date(today.getTime() - offset * 60 * 1000);
  return dateString.toISOString().split("T")[0];
}

export function covertDateObjectToIsoDatestring(date: Date) {
  if (date !== null && date !== undefined) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  } else {
    return "";
  }
}

export function isValidDate(dateString: any) {
  // Date format: YYYY-MM-DD
  var datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  // Check if the date string format is a match
  var matchArray = dateString.match(datePattern);
  if (matchArray == null) {
    return false;
  }

  // Remove any non digit characters
  var dateString = dateString.replace(/\D/g, "");

  // Parse integer values from the date string
  var year = parseInt(dateString.substr(0, 4));
  var month = parseInt(dateString.substr(4, 2));
  var day = parseInt(dateString.substr(6, 2));

  // Define the number of days per month
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    daysInMonth[1] = 29;
  }

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
    return false;
  }
  return true;
}

export function isWithinRange(date: Date, fromDate: Date, toDate: Date) {
  if (fromDate === null || undefined || toDate === null || undefined) {
    return false;
  } else {
    if (date >= fromDate && date <= toDate) {
      return true;
    } else {
      return false;
    }
  }
}

export function isSameDate(date1: any, date2: any) {
  if (isDate(date1) && isDate(date2)) {
    return date1.getTime() === date2.getTime();
  } else {
    return false;
  }
}

export function isDate(input: any) {
  if (Object.prototype.toString.call(input) === "[object Date]") return true;
  return false;
}

export function ExcelDateToJSDate(dateValue: number) {
  return new Date(Math.round((dateValue - 25569) * 86400 * 1000));
}

export function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days);
  return date;
}

export function addMonths(date: Date, months: number) {
  date.setMonth(date.getMonth() + months);
  return date;
}

export function addYears(date: Date, years: number) {
  date.setFullYear(date.getFullYear() + years);
  return date;
}


export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

export function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0);
}

export function getDaysOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getDateDiffByMonths(date1: Date, date2: Date) {
  const monthDiff = date1.getMonth() - date2.getMonth();
  const yearDiff = date1.getFullYear() - date2.getFullYear();
  return monthDiff + yearDiff * 12;
}
