/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import PropType from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ startDate, endDate, setStartDate, setEndDate }) => {
  // eslint-disable-next-line react/display-name
  const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <input
      className="border-b border-black outline-none px-2 py-1 font-bold max-w-[220px]"
      onClick={onClick}
      ref={ref}
      placeholder={placeholder}
      type="text"
      defaultValue={value}
      readOnly
    />
  ));

  CustomDateInput.propTypes = {
    value: PropType.string,
    onClick: PropType.func,
    ref: PropType.node,
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <DatePicker
        placeholderText={'請輸入起始日期'}
        selected={startDate}
        onChange={(date) => setStartDate(date.getTime())}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        customInput={<CustomDateInput />}
      />
      <p>~</p>
      <DatePicker
        placeholderText={'請輸入起結束日期'}
        selected={endDate}
        onChange={(date) => setEndDate(date.getTime())}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        customInput={<CustomDateInput />}
      />
    </div>
  );
};

export default DateInput;
