import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const Select = forwardRef(({ 
    options,
    placeholder='Select an option...',
    emptyOptionsPlaceholder='Options is Empty',
    className,
    onSelect
}, ref) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setSelectedOption(options.find((option) => value === option.value));
    onSelect(value);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedValue("");
    setSelectedOption(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    clear: handleClear,
    setLoading: (loadingState) => setLoading(loadingState)
  }));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-gray-600">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="text-gray-400">
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="absolute max-h-52 overflow-y-auto mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.length !== 0 ? options.map((option, index) => (
            <div
              key={index}
              className={`px-3 py-2 hover:bg-blue-100 cursor-pointer ${
                selectedValue === option.value ? "bg-blue-50 font-semibold" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          )) :
          loading ?
          <div className="px-3 py-2 bg-[#1f2937] flex justify-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>:
          <div className="px-3 py-2">
            {emptyOptionsPlaceholder}  
          </div>}
        </div>
      )}
    </div>
  );
});

export default Select;