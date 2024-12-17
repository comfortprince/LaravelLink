import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const Select = forwardRef(({ 
    options,
    placeholder='Select an option...',
    className,
    onSelect
}, ref) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
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
    clear: handleClear
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
            <div>
              Options is Empty  
            </div>}
        </div>
      )}
    </div>
  );
});

export default Select;