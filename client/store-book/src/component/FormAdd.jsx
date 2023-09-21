import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

const FormAdd = () => {
  const [image, setImage] = useState("./img/default.png");
  const [book, setBook] = useState({
    no_resi: "",
    title: "",
    description: "",
    cover: "",
  });

  const handleChanges = (e) => {
    setBook((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleChangesCover = (e) => {
    const uploaded = e.target.files[0];

    setBook((p) => ({ ...p, cover: uploaded }));
    setImage(URL.createObjectURL(uploaded));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //turn json to form dta

    const formData = new FormData();
    formData.append("no_resi", book.no_resi);
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("cover", book.cover);

    try {
      await axios.post("http://localhost:3001/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("success add data");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col h-w-60 w-full  mx-auto border border-gray-300 rounded-lg shadow-lg px-5 ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      <h1 className="flex flex-col mt-5 font-semibold text-2xl">
        Add Form For Books
      </h1>
      <div className="flex flex-col w-full bg-gray-100 p-5 mx-auto my-5 rounded-lg">
        <input
          type="text"
          className="w-full h-10 px-2 mb-4 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline "
          placeholder="No resi......"
          name="no_resi"
          onChange={(e) => handleChanges(e)}
        />
        <input
          type="text"
          className="w-full h-10 px-2 mb-4 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline "
          placeholder="Title......"
          name="title"
          onChange={(e) => handleChanges(e)}
        />
        <input
          type="text"
          className="w-full h-40 px-2 mb-4 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline "
          placeholder="Description......"
          name="description"
          onChange={(e) => handleChanges(e)}
        />
        <div className="md:flex sm:static bg-white  p-5 rounded-lg">
          <img
            src={image}
            alt="cover image"
            className="w-60  h-60  rounded-lg object-cover"
          />
          <div className="my-5 md:mx-5 md:absolute md:bottom-0 md:left-1/2">
            <label
              htmlFor="img"
              className="w-20 h-10 bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300 text-gray-400 hover:text-gray-700"
            >
              <span className="text-lg font-semibold ">Select File</span>
              <input
                type="file"
                id="img"
                name="cover"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleChangesCover(e)}
              />
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-20 p-2 bg-sky-500 rounded-lg mt-10 mx-auto shadow-md text-white font-semibold hover:bg-sky-300 hover:shadow-sky-200 hover:drop-shadow-2xl "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormAdd;
