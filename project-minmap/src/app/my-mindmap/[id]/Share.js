"use client";

import { useState } from "react";
const Share = ({ setOpen, flowNeedFind }) => {
  const location = window.location.href;
  const [publicShare, setPublicShare] = useState(false);
  const closeShare = () => {
    setOpen(false);
  };

  const handleMode = (e) => {
    if (e.target.value === "private") {
      setPublicShare(false);
    } else {
      setPublicShare(true);
    }
  };

  return (
    <form action="">
      <div
        className="fixed  overflow-y-auto top-0 w-full left-0"
        id="modal"
        style={{ zIndex: "99" }}
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div
              className="absolute inset-0 bg-gray-900 opacity-75"
              onClick={closeShare}
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              ​
            </span>
            <div
              className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center share-option">
                  <div className="flex items-center mr-4 mb-4">
                    <input
                      id="radio1"
                      className="hidden"
                      type="radio"
                      value="private"
                      name="mode"
                      checked={!publicShare}
                      onChange={handleMode}
                    />
                    <label
                      htmlFor="radio1"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                      Riêng tư
                    </label>
                  </div>
                  <div className="flex items-center mr-4 mb-4">
                    <input
                      id="radio2"
                      className="hidden"
                      type="radio"
                      value="public"
                      name="mode"
                      onChange={handleMode}
                      checked={publicShare}
                    />
                    <label
                      htmlFor="radio2"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                      Công khai
                    </label>
                  </div>
                </div>
                {!publicShare ? (
                  <div>
                    <p>
                      Nếu chọn riêng tư, chỉ có bạn mới được quyền xem Mindmap
                      này
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="group relative">
                      <label
                        htmlFor="share-input"
                        className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                      >
                        Liên kết chia sẻ
                      </label>
                      <input
                        id="share-input"
                        className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        readOnly
                        type="url"
                        value={location}
                      />
                    </div>
                    <div className="group relative mt-3">
                      <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                        Tiêu đề
                      </label>
                      <input
                        className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        type="text"
                        value={flowNeedFind?.flow_name}
                        name="title"
                        readOnly
                      />
                    </div>
                    <div className="group relative mt-3">
                      <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                        {flowNeedFind.flow_desc === "Chưa có mô tả"
                          ? ""
                          : flowNeedFind.flow_desc}
                      </label>
                      <textarea
                        type="text"
                        className="peer h-20 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        name="description"
                      ></textarea>
                    </div>
                    <div className="group relative mt-3">
                      <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                        Ảnh chia sẻ
                      </label>
                      <input
                        className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        type="url"
                        name="image"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={closeShare}
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                >
                  <i className="fas fa-times"></i> Đóng
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                >
                  <i className="fas fa-plus"></i> Lưu lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Share;
