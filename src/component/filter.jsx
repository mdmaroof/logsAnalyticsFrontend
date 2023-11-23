import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./button";

export const Filter = ({ getLogsApi }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [firstButton, setFirstButton] = useState(false);
  const [secondButton, setSecondButton] = useState(false);

  const selectFromDate = (date) => {
    setFromDate(date);
  };
  const selectToDate = (date) => {
    if (!fromDate) {
      alert("First Select From Date Time");
      return;
    }
    if (fromDate > date) {
      alert("End Time cannot be more than From Time");
      return;
    }
    setToDate(date);
  };

  useEffect(() => {
    if (fromDate && toDate) {
      getLogsApi({ fromDate, toDate });
    }
  }, [fromDate, toDate]);

  const select24Hours = () => {
    if (!firstButton) {
      getLogsApi({ last24HoursFilter: true });
      setSecondButton(false);
      setFirstButton(true);
    }
  };

  const select7Hours = () => {
    if (!secondButton) {
      setSecondButton(true);
      setFirstButton(false);
      getLogsApi({ last7daysFilter: true });
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 py-4 items-center md:justify-end">
        <Button type={firstButton && "selected"} onClick={select24Hours}>
          Select Last 24 Hours
        </Button>
        <Button type={secondButton && "selected"} onClick={select7Hours}>
          Select Last 7 days
        </Button>
        <DatePicker
          selected={fromDate}
          onChange={selectFromDate}
          showTimeSelect
          className="border rounded-md px-2 py-1"
          placeholderText="Select From Time"
          dateFormat="dd/mm/yyyy HH:mm:ss"
        />
        <DatePicker
          selected={toDate}
          onChange={selectToDate}
          showTimeSelect
          dateFormat="dd/mm/yyyy HH:mm:ss"
          className="border rounded-md px-2 py-1"
          placeholderText="Select To Time"
        />
        <Button
          onClick={() => {
            setToDate(null);
            setFromDate(null);
            setSecondButton(false);
            setFirstButton(false);
            getLogsApi();
          }}
        >
          Clear Filter
        </Button>
      </div>
    </>
  );
};
