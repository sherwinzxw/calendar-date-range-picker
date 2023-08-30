import { Fragment, useEffect, useRef, useState } from "react";
import "./Datepicker.scss";
import CalendarPicker from "scenes/CalendarPicker/CalendarPicker";
import {
  convertIsoDateStringToDateObject,
  convertNowToIsoDateString,
  covertDateObjectToIsoDatestring,
  isValidDate,
} from "utils/date/DateHandler";

const Datepicker = (props: any) => {
  const {} = props;

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [fromDateString, setFromDateString] = useState<string>(
    covertDateObjectToIsoDatestring(fromDate)
  );
  const [toDateString, setToDateString] = useState<string>(
    covertDateObjectToIsoDatestring(toDate)
  );

  const calendarRef = useRef<any>();
  const [enableCalendar, setEnableCalendar] = useState<boolean>(false);

  function onChangeFromDate(event: any) {
    const value = event.currentTarget.value;
    const isValid = isValidDate(value);
    if (isValid) {
      props.callbackFromDate(convertIsoDateStringToDateObject(value));
      setFromDate(convertIsoDateStringToDateObject(value));
      setFromDateString(value);
    }
  }

  function onChangeToDate(event: any) {
    const value = event.currentTarget.value;
    const isValid = isValidDate(value);
    if (isValid) {
      props.callbackToDate(convertIsoDateStringToDateObject(value));
      setToDate(convertIsoDateStringToDateObject(value)!);
      setToDateString(value);
    }
  }

  function callbackCalendarButtonClick(callback: any) {
    setEnableCalendar(callback.isCalendarEnabled);
    setFromDate(callback.selection.fromDate);
    setFromDateString(callback.selection.fromDateString);
    setToDate(callback.selection.toDate);
    setToDateString(callback.selection.toDateString);
    props.callbackFromDate(callback.selection.fromDate);
    props.callbackToDate(callback.selection.toDate);
  }

  return (
    <Fragment>
      <div className="nsw-custom-datepicker">
        <div className="nsw-custom-datepicker__date">
          <div
            className="nsw-custom-datepicker__control-group"
            title="Please use the calendar icon to enable date filering options"
          >
            <div className="nsw-custom-datepicker__input disabled">
              <input
                name="date_from"
                className="nsw-custom-datepicker__date-input-control from disabled"
                title="Please use the calendar icon to enable date filering options"
                type="date"
                value={fromDateString == undefined ? "" : fromDateString}
                onChange={onChangeFromDate}
                readOnly
                disabled
              ></input>
              -
              <input
                name="date_to"
                className="nsw-custom-datepicker__date-input-control to disabled"
                title="Please use the calendar icon to enable date filering options"
                type="date"
                value={toDateString == undefined ? "" : toDateString}
                onChange={onChangeToDate}
                min={fromDateString ?? ""}
                max={convertNowToIsoDateString()}
                readOnly
                disabled
              ></input>
            </div>
            <div className="nsw-custom-datepicker__calendar-callback">
              <button
                className="nsw-custom-datepicker__calendar-callback-button nsw-button nsw-button--dark"
                onClick={() => {
                  setEnableCalendar(!enableCalendar);
                }}
              >
                <span
                  className="material-icons nsw-material-icons"
                  focusable="false"
                  aria-hidden="true"
                >
                  calendar_month
                </span>
              </button>
            </div>
          </div>
          <div className="nsw-custom-datepicker__clear">
            <button onClick={()=>{calendarRef.current.clearInnerCalendarSelection()}}>Clear filters</button>
          </div>
        </div>
        <CalendarPicker
          active={enableCalendar}
          callbackCalendarButtonClick={callbackCalendarButtonClick}
          ref={calendarRef}
        ></CalendarPicker>
      </div>
    </Fragment>
  );
};
export default Datepicker;
