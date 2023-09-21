import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

const FormEdit = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
  });
  const [image, setImage] = useState("");

  const [dataId, setDataId] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  // event get data id

  useEffect(() => {
    const fatchDataID = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/books/" + bookId
        );
        setDataId(response.data.payload.datas);
      } catch (err) {
        console.log(err);
      }
    };

    fatchDataID();
  }, []);

  // end event submit

  // event submit

  const handleChanges = (e) => {
    setBook((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleChangesCover = (e) => {
    const uploded = e.target.files[0];
    setBook((p) => ({ ...p, cover: uploded }));
    setImage(URL.createObjectURL(uploded));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(book);

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("cover", book.cover);

    console.log(formData);
    try {
      await axios.patch(`http://localhost:3001/books/${bookId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("success edit data");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  // end event submit
  return (
    <div className="flex flex-col h-w-60 h-full  mx-10 bg-gray-300 rounded-lg shadow-lg px-5 mt-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <h1 className="mt-5 font-semibold text-2xl ">Edit Form For Books</h1>

      <div className="flex flex-col w-full  p-5 mx-auto my-5 rounded-lg">
        {dataId.map((data) => {
          return (
            <div key={data.id}>
              <input
                type="text"
                className="w-full h-10 px-2 mb-4 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline "
                placeholder={data.title}
                name="title"
                onChange={(e) => handleChanges(e)}
              />
              <input
                type="text"
                className="w-full h-40 px-2 mb-4 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline "
                placeholder={data.description}
                name="description"
                onChange={(e) => handleChanges(e)}
              />
              <div className="md:flex sm:static bg-white  p-5 rounded-lg">
                {image ? (
                  <img
                    src={`${image}`}
                    alt="cover image"
                    className="w-60  h-80 rounded-lg object-cover"
                  />
                ) : (
                  <img
                    src={`${data.coverURL}`}
                    alt="cover image"
                    className="w-60  h-80 rounded-lg object-cover"
                  />
                )}
                <div className="my-5 md:mx-5 sm:absolute sm:bottom-3 sm:left-60">
                  <label
                    htmlFor="img"
                    className="w-20 h-10 bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300 text-gray-400 hover:text-gray-700"
                  >
                    <span className="text-lg font-semibold ">Select File</span>
                    <input
                      type="file"
                      id="img"
                      accept="image/*"
                      name="cover"
                      className="hidden"
                      onChange={(e) => handleChangesCover(e)}
                    />
                  </label>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-20 p-3 bg-indigo-500 rounded-lg mt-10 mx-auto shadow-md text-white font-semibold hover:bg-indigo-300 hover:shadow-indigo-200 hover:drop-shadow-2xl "
              >
                Edit
              </button>
              <Link
                to={"/"}
                className="float-right w-20 py-4 px-4 bg-red-500 rounded-lg mt-10  shadow-md text-white font-semibold hover:bg-red-300 hover:shadow-red-200 hover:drop-shadow-2xl "
              >
                Back
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormEdit;
