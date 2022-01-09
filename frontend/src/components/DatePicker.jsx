import moment from "moment";
import { useState } from "react";
import { DateRangePicker } from "react-dates";

export const DatePicker = ({ onChangeDates, rentals = [] }) => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState(null);

  const isDateInRentals = (date) => {
    let isPresent = false;
    const dateMoment = date.set({ hour: 12, minute: 0, second: 0 }).unix();
    rentals.forEach(([begin, end]) => {
      if (dateMoment >= begin && dateMoment <= end) isPresent = true;
    });

    return isPresent;
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="your_unique_start_date_id"
      endDate={endDate}
      endDateId="your_unique_end_date_id"
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        onChangeDates(startDate?.unix(), endDate?.unix());
      }}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => {
        setFocusedInput(focusedInput);
      }}
      firstDayOfWeek={1}
      displayFormat="DD/MM/YYYY"
      numberOfMonths={1}
      readOnly={true}
      isDayBlocked={isDateInRentals}
    />
  );
};
