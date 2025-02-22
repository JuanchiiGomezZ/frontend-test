import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Icon } from './Icon/Icon';

interface SearchInputProps {
  initialValue?: string;
  onSearch: (value: string) => void;
}

export const SearchInput = ({ initialValue, onSearch }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search images..."
        className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-full 
                 border border-gray-100 text-sm text-gray-700
                 placeholder:text-gray-500
                 focus:outline-none focus:border-gray-200 focus:ring-0
                 transition-colors"
      />
      <button
        onClick={handleSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Search"
      >
        <Icon name="Search" className="w-5 h-5" />
      </button>
    </div>
  );
};
