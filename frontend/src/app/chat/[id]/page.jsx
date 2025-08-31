import React from "react";

const ChatSlug = async ({ params }) => {
  const { id } = await params;

  const renderChatWindow = () => {
    return (
      <>
        <div className="mt-4 flex justify-center">
          <div className="border-4  border-solid p-3 rounded-2xl w-1/2">
            <div className="h-[70vh]">
              <div className="grid pb-11">
                <div className="flex gap-2.5 mb-4">
                  <img
                    src="https://pagedone.io/asset/uploads/1710412177.png"
                    alt="Shanay image"
                    className="w-10 h-11"
                  />
                  <div className="grid">
                    <h5 className=" text-sm font-semibold leading-snug pb-1">
                      Shanay cruz
                    </h5>
                    <div className="w-max grid">
                      <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                        <h5 className="text-gray-900 text-sm font-normal leading-snug">
                          Guts, I need a review of work. Are you ready?
                        </h5>
                      </div>
                      <div className="justify-end items-center inline-flex mb-2.5">
                        <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                          05:14 PM
                        </h6>
                      </div>
                    </div>
                    <div className="w-max grid">
                      <div className="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                        <h5 className="text-gray-900 text-sm font-normal leading-snug">
                          Let me know
                        </h5>
                      </div>
                      <div className="justify-end items-center inline-flex mb-2.5">
                        <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                          05:14 PM
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 justify-end pb-40">
                <div className="">
                  <div className="grid mb-2">
                    <h5 className="text-right text-sm font-semibold leading-snug pb-1">
                      You
                    </h5>
                    <div className="px-3 py-2 bg-indigo-600 rounded">
                      <h2 className="text-white text-sm font-normal leading-snug">
                        Yes, let’s see, send your work here
                      </h2>
                    </div>
                    <div className="justify-start items-center inline-flex">
                      <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                        05:14 PM
                      </h3>
                    </div>
                  </div>
                  <div className="justify-center">
                    <div className="grid w-fit ml-auto">
                      <div className="px-3 py-2 bg-indigo-600 rounded ">
                        <h2 className="text-white text-sm font-normal leading-snug">
                          Anyone on for lunch today
                        </h2>
                      </div>
                      <div className="justify-start items-center inline-flex">
                        <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                          You
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src="https://pagedone.io/asset/uploads/1704091591.png"
                  alt="Hailey image"
                  className="w-10 h-11"
                />
              </div>
            </div>
            <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
              <input
                className="grow w-full shrink basis-0 text-xs font-medium leading-4 focus:outline-none"
                placeholder="Type here..."
              />
              <button className="btn btn-primary items-center flex px-1 py-1 bg-indigo-600 rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g id="Send 01">
                    <path
                      id="icon"
                      d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                      stroke="white"
                      strokeWidth="1.6"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
                <h3 className="text-white text-xs font-semibold leading-4 px-2">
                  Send
                </h3>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return <>{renderChatWindow()}</>;
};

export default ChatSlug;
