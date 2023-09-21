import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function DataBooks() {
  const [books, setBooks] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/books/" + id);
      toast("succes delete data!!!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:gap-2">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        {books.map((data) => {
          return (
            <div
              key={data.id}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg border border-gray-400 xl:flex-row xl:max-w-xl "
            >
              <img
                src={`${data.coverURL}`}
                alt=""
                className="object-cover w-full rounded-t-lg h-96 md:w-64  md:rounded-none md:rounded-l-lg"
              />

              <div className="flex flex-col justify-between leading-normal p-4  h-full w-full">
                <div className="">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                    {data.title}
                  </h1>
                  <p className="text-sm font-light text-gray-500">
                    {data.no_resi}
                  </p>
                  <p className="font-normal text-base text-gray-700">
                    {data.description}
                  </p>
                </div>
                <div className="mt-5 mb-5">
                  <Menu>
                    <Menu.Button>
                      <div className="p-3 flex rounded-lg mb-2 border border-indigo-500 ui-open:hidden">
                        <span className="m-auto text-indigo-500">Options</span>
                      </div>
                    </Menu.Button>
                    <Transition
                      enter="transition ease-out duration-1000"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items>
                        <Menu.Item>
                          <Link
                            className="block px-4 py-2 text-sm text-white bg-sky-500 rounded-lg hover:bg-sky-600  text-center cursor-pointer "
                            href="#"
                            to={"/edit/" + data.id}
                          >
                            Edit
                          </Link>
                        </Menu.Item>
                        <Menu.Item className="mt-1">
                          <a
                            className="block px-4 py-2 text-sm text-white bg-pink-500 rounded-lg hover:bg-pink-600  text-center cursor-pointer"
                            onClick={() => handleDelete(data.id)}
                          >
                            Delete
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DataBooks;
