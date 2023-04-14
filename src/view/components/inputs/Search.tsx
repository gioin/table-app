import React from "react";

interface SearchProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  id,
  placeholder = "Search",
  value,
  onChange
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        className="w-32 h-10 bg-transparent px-4 outline-none border-b border-b-gray-300 hover:w-[240px] transition-all duration-500 transform-origin-right"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="absolute top-0 right-2 flex items-center h-full ml-3">
        <svg
          className="text-gray-500 h-5 w-5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-4.35-4.35"></path>
          <path d="M15.5 10.5a5 5 0 1 1-7.07 0 5 5 0 0 1 7.07 0z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Search;
