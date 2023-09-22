import React, { useState, useEffect } from "react";
import SearchInput from "../SearchInput";
import DataBooks from "../DataBooks";
import axios from "axios";
import { useDebounce } from "use-debounce";

const Books = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [debounce] = useDebounce(search, 1600);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books");
        setBooks(res.data.payload.datas);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const fetchSearchFeature = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/books/search?s=${search}`
      );

      setResultSearch(response.data.payload.datas);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSearchFeature();
  }, [debounce]);

  return (
    <>
      <div>
        <div>
          <SearchInput setSearch={setSearch} />
        </div>
        <div className="mt-2">
          <DataBooks books={books} resultSearch={resultSearch} />
        </div>
      </div>
    </>
  );
};

export default Books;
