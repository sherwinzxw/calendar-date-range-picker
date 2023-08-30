import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import classNames from "classnames";
import Dropdown from "components/dropdown/Dropdown";
import { getDaysOfMonth, getFirstDayOfMonth, isSameDate, isWithinRange } from "utils/date/DateHandler";
import "./Calendar.scss";

const Calendar = forwardRef((props: any, ref: any) => {
  /*
    properties
    */
  const {
    title = null,
    selectedDateString = null,
    startDayIndex = 0,
    disabled = false,
    durationFromDate,
    durationToDate,
    calendarIndex,
    min,
    max
  } = props;

  /*
    local variable - part 1
    the component-scoped constant variables that DO NOT depend on the changing states
    */
  let now = new Date();

  const currentDayInMonth = now.getDate(); // today's day in month
  const currentMonth = now.getMonth(); // today's month - 1
  const currentYear = now.getFullYear(); // today's year

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years: any = [];
  let startYear = min ? min.getFullYear() : 1900;
  while (startYear <= now.getFullYear()) {
    years.push((startYear++).toString());
  }

  /*
    useState hooks - part 1
    the state hookes that controls the calendar component rendering states
    */
  const [calendarMonth, setCalendarMonth] = useState<number>(currentMonth);
  const [calendarYear, setCalendarYear] = useState<number>(currentYear);
  const [fromDate, setFromDate] = useState<any>(durationFromDate);
  const [toDate, setToDate] = useState<any>(durationToDate);
  /*
    useState hooks - part 2
    the state hookes that controls the calendar component selection states
    */
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectDateString, setSelectedDateString] =
    useState<any>(selectedDateString);

  /*
    local variable - part 2
    the component-scoped constant variables that depend on the changing states
    */
  const daysInMonth = getDaysOfMonth(calendarYear, calendarMonth);
  const firstWeekdayOfMonth = getFirstDayOfMonth(
    calendarYear,
    calendarMonth
  ).getDay();

  useImperativeHandle(ref, () => ({
    clearCalendarSelection() {
      setSelectedDay(null);
      setSelectedMonth(null);
      setSelectedYear(null);
      setSelectedDateString(null);
      setFromDate(null)
      setToDate(null)
    },
  }));

  // toggle the setValue of the selected date
  function toggleSetSelectedDate(year: number, month: number, day: number) {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDateString(
      new Date(year, month, day).toLocaleDateString("en-AU")
    );
    props.handleDateChange(new Date(year, month, day));
  }

  // render the calendar selection panel
  function CalendarFilterPanelRenderer() {
    // map months into options list
    const _optoins_months = months.map((m: string, i: number) => {
      return {
        value: m.toString(),
        label: m.toString(),
      };
    });

    // map years into options list
    const _optoins_years = years
      .map((y: string, i: number) => {
        return {
          value: y.toString(),
          label: y.toString(),
        };
      })
      .reverse();

    // callback the selected value for month and set calendar year state
    function callbackMonthSelection(month: any) {
      setCalendarMonth(months.indexOf(month));
    }

    // callback the selected value for year and set calendar year state
    function callbackYearSelection(year: any) {
      setCalendarYear(parseInt(year));
    }

    // toggle the navigation to the previous month
    function toggleNav2PrevMonth() {
      if (calendarMonth === 0) {
        const newMonth = 11;
        setCalendarMonth(newMonth);
        setCalendarYear(calendarYear - 1);
      } else {
        const newMonth = calendarMonth - 1;
        setCalendarMonth(newMonth);
      }
    }

    // toggle the navigation to the next month
    function toggleNav2NextMonth() {
      if (calendarMonth < 11) {
        const newMonth = calendarMonth + 1;
        setCalendarMonth(newMonth);
      } else {
        const newMonth = 0;
        setCalendarYear(calendarYear + 1);
        setCalendarMonth(newMonth);
      }
    }

    return (
      <div className="nsw-custom-calendar__filter-panel">
        <div className="nsw-custom-calendar__filter-year-month">
          <Dropdown
            label={months[calendarMonth]}
            options={_optoins_months}
            defaultValue={months[calendarMonth]}
            handleSelectionCallback={callbackMonthSelection}
          ></Dropdown>
          <Dropdown
            label={years[calendarYear]}
            options={_optoins_years}
            defaultValue={calendarYear.toString()}
            handleSelectionCallback={callbackYearSelection}
          ></Dropdown>
        </div>
        <div className="nsw-custom-calendar__filter-prev-next">
          <span
            className="nsw-custom-calendar__nav prev-month material-icons"
            title="previous month"
            onClick={toggleNav2PrevMonth}
          >
            keyboard_arrow_left
          </span>
          <span
            className="nsw-custom-calendar__nav next-month material-icons"
            title="next month"
            onClick={toggleNav2NextMonth}
          >
            keyboard_arrow_right
          </span>
        </div>
      </div>
    );
  }

  // render the calendar head (weekday names)
  function CalendarHeadRenderer() {
    const headsWithMondayFirst = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const headsWithSundayFirst = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let weekdays = [];
    if (startDayIndex === 1) {
      weekdays = headsWithMondayFirst;
    } else {
      weekdays = headsWithSundayFirst;
    }
    return (
      <div className="nsw-custom-calendar__head">
        {weekdays.map((day: string, index: number) => {
          return (
            <div key={index} className="nsw-custom-calendar__weekday-name">
              {day}
            </div>
          );
        })}
      </div>
    );
  }

  // render the calendar body (days)
  function CalendarBodyRenderer() {
    const days = [];
    for (let i = 0; i < daysInMonth + firstWeekdayOfMonth; i++) {
      days.push(i + 1);
    }

    function handleOnDayClick(e: any) {
      const _selectedDay = parseInt(e.currentTarget.getAttribute("data-day"));
      const _selectedMonth =
        parseInt(e.currentTarget.getAttribute("data-month")) - 1;
      const _selectedYear = parseInt(e.currentTarget.getAttribute("data-year"));
      toggleSetSelectedDate(_selectedYear, _selectedMonth, _selectedDay);
    }

    return (
      <div className="nsw-custom-calendar__body">
        {days.map((d: number, index: number) => {
          const actualDayNumber = d - firstWeekdayOfMonth;

          return (
            <div
              key={index}
              className={classNames({
                "nsw-custom-calendar__day": true,
                today:
                  calendarYear === currentYear &&
                  calendarMonth === currentMonth &&
                  actualDayNumber === currentDayInMonth,
                selected:
                  (calendarYear === selectedYear &&
                  calendarMonth === selectedMonth &&
                  actualDayNumber === selectedDay) || isSameDate(new Date(calendarYear, calendarMonth, actualDayNumber), durationFromDate) ||  isSameDate(new Date(calendarYear, calendarMonth, actualDayNumber), durationToDate),
                disabled: actualDayNumber < 1,
                from: isSameDate(new Date(calendarYear, calendarMonth, actualDayNumber), durationFromDate),
                to: isSameDate(new Date(calendarYear, calendarMonth, actualDayNumber), durationToDate),
                covered: isWithinRange(new Date(calendarYear, calendarMonth, actualDayNumber), fromDate, toDate)
              })}
              data-value={`${calendarYear}-${
                calendarMonth + 1
              }-${actualDayNumber}`}
              data-year={calendarYear}
              data-month={calendarMonth + 1}
              data-day={actualDayNumber}
              title={
                actualDayNumber == currentDayInMonth
                  ? "today"
                  : `${calendarYear}-${calendarMonth + 1}-${actualDayNumber}`
              }
              onClick={(e) => {
                if (actualDayNumber > 0) {
                  handleOnDayClick(e);
                }
              }}
            >
              {actualDayNumber < 1 ? null : actualDayNumber}
            </div>
          );
        })}
      </div>
    );
  }

  useEffect(() => {
    if(durationFromDate && durationToDate){
      setFromDate(durationFromDate);
      setToDate(durationToDate);     

      if(calendarIndex===0){
        setSelectedDateString(durationFromDate.toLocaleDateString('en-AU'))
        setCalendarMonth(durationFromDate.getMonth())
        setCalendarYear(durationFromDate.getFullYear())
      }else if (calendarIndex === 1){
        setSelectedDateString(durationToDate.toLocaleDateString('en-AU'))
        setCalendarMonth(durationToDate.getMonth())
        setCalendarYear(durationToDate.getFullYear())
      }
    }

   
  }, [durationFromDate, durationToDate]);

  return (
    <div
      className={classNames({
        "nsw-custom-calendar": true,
        disabled: disabled,
      })}
    >
      {title ? (
        <h5 className="nsw-custom-calender__title">
          {title}{" "}
          <span className="nsw-custom-calender__title_selected_date">
            {selectDateString}
          </span>
        </h5>
      ) : null}
      <div className="nsw-custom-calender__body">
        <div className="nsw-custom-calendar__overlay"></div>
        <CalendarFilterPanelRenderer></CalendarFilterPanelRenderer>
        <CalendarHeadRenderer></CalendarHeadRenderer>
        <CalendarBodyRenderer></CalendarBodyRenderer>
      </div>
    </div>
  );
});

export default Calendar;
