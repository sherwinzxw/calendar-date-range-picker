import classNames from "classnames";
import Calendar from "components/calendar/Calendar";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./CalendarPicker.scss";
import {
  addDays,
  addMonths,
  addYears,
  covertDateObjectToIsoDatestring,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "utils/date/DateHandler";
const CalendarPicker = forwardRef((props: any, ref: any) => {
//const CalendarPicker = (props: any) => {
  const { active } = props;
  const cal1ref = useRef<any>();
  const cal2ref = useRef<any>();
  const [isCalendarActive, SetIsCalendarActive] = useState<boolean>(active);  
  const [calendarYearMonth, setCalendarYearMonth] = useState<any>();

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [fromDateString, setFromDateString] = useState<any>(
    covertDateObjectToIsoDatestring(fromDate)
  );
  const [toDateString, setToDateString] = useState<any>(
    covertDateObjectToIsoDatestring(toDate)
  );

  useEffect(() => {}, [calendarYearMonth]);

  // callback the selected date from the calendar component and use it to set the useState() fromDate and fromDateString
  function callbackSelectedFromDateFromCalendarComponent(date: any) {
    setFromDate(date);
    setFromDateString(covertDateObjectToIsoDatestring(date));
  }

  // callback the selected date from the calendar component and use it to set the useState() toDate and toDateString
  function callbackSelectedToDateFromCalendarComponent(date: any) {
    setToDate(date);
    setToDateString(covertDateObjectToIsoDatestring(date));
  }

  function handleCallbackCalendarButtonClick(isApplyButton: boolean) {
    let selection = {};
    const isCalendarEnabled = false;
    if (isApplyButton) {
      selection = {
        fromDate: fromDate,
        fromDateString: fromDateString,
        toDate: toDate,
        toDateString: toDateString,
      };
    } else {
      selection = {
        fromDate: undefined,
        fromDateString: undefined,
        toDate: undefined,
        toDateString: undefined,
      };
    }

    SetIsCalendarActive(isCalendarEnabled);
    props.callbackCalendarButtonClick({
      selection,
      isCalendarEnabled,
    });
  }

  function onClickApplyButton() {
    handleCallbackCalendarButtonClick(true);
  }
  
  function onClickClearButton() {
    clearDateSelection();
    handleCallbackCalendarButtonClick(false);
    cal1ref.current.clearCalendarSelection();
    cal2ref.current.clearCalendarSelection();
  }

  useImperativeHandle(ref, () => ({
    clearInnerCalendarSelection() {
      onClickClearButton()
    }
  }));

  function onClickDaysSelectButton(interval: number, unit: string = "d") {
    let toDate = new Date(new Date().toDateString());
    let fromDate = new Date(new Date().toDateString());
    let newDate = new Date(new Date().toDateString());
    switch (unit) {
      case "d":
        fromDate = addDays(fromDate, -Math.abs(interval));
        break;
      case "m":
        newDate = addMonths(newDate, -Math.abs(interval));
        fromDate = getFirstDayOfMonth(
          newDate.getFullYear(),
          newDate.getMonth()
        );
        toDate = getLastDayOfMonth(newDate.getFullYear(), newDate.getMonth());
        break;
      case "y":
        newDate = addYears(newDate, -1 * Math.abs(interval));
        fromDate = getFirstDayOfMonth(
          newDate.getFullYear(),
          newDate.getMonth() - 1
        );
        toDate = getLastDayOfMonth(
          newDate.getFullYear(),
          newDate.getMonth() - 1
        );
        break;
      default:
        fromDate = addDays(newDate, -1 * Math.abs(interval));
        break;
    }
    setFromDate(fromDate);
    setToDate(toDate);
    setFromDateString(covertDateObjectToIsoDatestring(fromDate));
    setToDateString(covertDateObjectToIsoDatestring(toDate));
  }

  function clearDateSelection() {
    setFromDate(null);
    setToDate(null);
    setFromDateString(null);
    setToDateString(null);
  }

  useEffect(() => {
    SetIsCalendarActive(active);
  }, [active]);

  return (
    <div
      className={classNames({
        "nsw-custom-calendarpicker__calendar": true,
        active: isCalendarActive,
      })}
    >
      <div className="nsw-custom-calendarpicker__day-duration-select-control-group">
        <div className="day-duration-select-button-group">
          <button
            onClick={() => {
              onClickDaysSelectButton(0, "d");
            }}
          >
            Today
          </button>
          <button
            onClick={() => {
              onClickDaysSelectButton(1, "d");
            }}
          >
            Yesterday
          </button>
          <button
            onClick={() => {
              onClickDaysSelectButton(7, "d");
            }}
          >
            Last 7 days
          </button>
          <button
            onClick={() => {
              onClickDaysSelectButton(30, "d");
            }}
          >
            Last 30 days
          </button>
          <button
            data-value="0"
            onClick={() => {
              onClickDaysSelectButton(0, "m");
            }}
          >
            This month
          </button>
          <button
            data-value="1"
            onClick={() => {
              onClickDaysSelectButton(1, "m");
            }}
          >
            Last month
          </button>
        </div>
      </div>
      <div className="nsw-custom-calendarpicker__calendar-calendarpicker-control-group">
        <div className="nsw-custom-calendarpicker__calendar-group">
          <Calendar
            title={`From`}
            ref={cal1ref}
            handleDateChange={callbackSelectedFromDateFromCalendarComponent}
            selectDateString={fromDateString}
            durationFromDate={fromDate}
            durationToDate={toDate}
            calendarIndex={0}
            min={addYears(new Date(), -10)}
            max={new Date()}
          ></Calendar>
          <Calendar
            title={`To`}
            ref={cal2ref}
            handleDateChange={callbackSelectedToDateFromCalendarComponent}
            disabled={fromDate == null}
            selectDateString={toDateString}
            durationFromDate={fromDate}
            durationToDate={toDate}
            calendarIndex={1}
            min={addYears(new Date(), -10)}
            max={new Date()}
          ></Calendar>
        </div>
        <div className="nsw-custom-calendarpicker__action-panel">
          <button
            className="nsw-button nsw-button--dark-outline-solid"
            onClick={onClickClearButton}
          >
            Clear
          </button>
          <button
            className="nsw-button nsw-button--dark"
            onClick={onClickApplyButton}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
});

export default CalendarPicker;
