import { Tab } from "@headlessui/react";
import FormAdd from "../component/FormAdd";
import Books from "../component/container/Books";

const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-between  ">
        <div className="w-full  px-2 py-16 mx-auto sm:px-0  ">
          <Tab.Group>
            <div className="flex border border-t-gray-300 rounded-full shadow-md  mx-auto w-60 p-4">
              <Tab.List className="flex space-x-2 p-1  mx-auto">
                <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 bg-gray-100 hover:bg-gray-200 px-5 focus:outline-none focus:ring-0 ui-selected:bg-gray-400 ui-selected:text-white">
                  Books
                </Tab>
                <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 bg-gray-100 hover:bg-gray-200 px-5 focus:outline-none focus:ring-0  ui-selected:bg-gray-400 ui-selected:text-white">
                  add
                </Tab>
              </Tab.List>
            </div>
            <div className="w-full">
              <Tab.Panels>
                <Tab.Panel>
                  <div className="container mx-auto  md:my-10 p-5 ">
                    <Books />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="container mx-auto my-10 p-5 ">
                    <FormAdd />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default Home;
