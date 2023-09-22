import React from "react";

const SearchInput = ({ setSearch }) => {
  const handleSearchChanges = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="container shadow-lg flex rounded-lg border border-gray-300 p-4">
        <div className="flex mx-auto">
          <input
            type="text"
            className="focus:outline-none bg-gray-200  w-60 h-20 p-4 focus:bg-gray-300   text-gray-600 placeholder:text-gray-600 rounded-full rounded-r-none md:w-96"
            placeholder="Type to search here...... "
            onChange={(e) => handleSearchChanges(e)}
          />
          <div className="flex h-20 w-16 rounded-r-full bg-gray-300 ">
            <span className="text-white m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
