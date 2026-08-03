// src/components/ui/DatePicker.jsx
import React from 'react';
import moment from 'moment';

const DatePicker = ({
  label,
  error,
  value,
  onChange,
  placeholder = "Chọn ngày",
  minDate,
  maxDate,
  disabled = false
}) => {
  // Chuyển đổi từ Date object sang chuỗi YYYY-MM-DD cho input date
  const formatDateForInput = (date) => {
    if (!date) return '';

    // Sử dụng moment để xử lý chuỗi ngày tháng với nhiều định dạng
    if (typeof date === 'string') {
      const momentDate = moment(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY', 'DD-MM-YYYY']);
      if (momentDate.isValid()) {
        return momentDate.format('YYYY-MM-DD');
      }
      return '';
    }

    // Nếu là Date object
    if (date instanceof Date) {
      return moment(date).format('YYYY-MM-DD');
    }

    return '';
  };

  // Chuyển đổi từ chuỗi YYYY-MM-DD sang Date object
  const handleDateChange = (e) => {
    const dateString = e.target.value;
    if (!dateString) {
      onChange(null);
      return;
    }

    const date = new Date(dateString);
    onChange(date);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 ">
          {label}
        </label>
      )}
      <input
        type="date"
        value={formatDateForInput(value)}
        onChange={handleDateChange}
        min={minDate ? formatDateForInput(minDate) : undefined}
        max={maxDate ? formatDateForInput(maxDate) : undefined}
        disabled={disabled}
        className={`
          w-full px-3 py-[0.32rem]
          bg-white
          border rounded-md 
          shadow-sm
          ${error 
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      )}

      <style jsx>{`
        /* Tùy chỉnh input date trên các trình duyệt */
        input[type="date"] {
          font-family: inherit;
          appearance: none;
          position: relative;
        }

        /* Tùy chỉnh cho trình duyệt không hỗ trợ input date */
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          color: transparent;
          cursor: pointer;
          height: 100%;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 100%;
        }
        
        /* Tùy chỉnh placeholder cho input date */
        input[type="date"]::before {
          color: #6b7280;
          content: attr(placeholder);
        }
        
        input[type="date"]:focus::before,
        input[type="date"]:valid::before {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DatePicker;
