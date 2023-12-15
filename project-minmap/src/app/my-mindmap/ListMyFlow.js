"use client";
import { toast } from "react-toastify";
import { useState } from "react";
function ListMyFlow() {
  const [flows, setFlows] = useState(
    JSON.parse(localStorage.getItem("flowArr"))
  );
  const deleteMyFlow = (flow_id) => {
    const flowArrNew = flows.filter((item) => item.flow_id !== flow_id);

    toast.warning("Nếu bạn chắc chắn muốn xóa, Click Here", {
      onClick: () => {
        localStorage.setItem("flowArr", JSON.stringify(flowArrNew));
        toast.success("Bạn xóa thành công");
        setFlows(flowArrNew);
      },
    });
  };

  return (
    <>
      {flows?.map(({ flow_id, flow_name, flow_desc, dateCreate }) => {
        return (
          <div
            key={flow_id}
            className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg"
          >
            <div className="w-1/6 text-center">
              <input type="checkbox" />
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <div className="ml-4">
                  <span className="capitalize block text-gray-800">
                    <a href={`/my-mindmap/${flow_id}`}>{flow_name}</a>
                  </span>
                  <span className="text-sm block text-gray-600">
                    {flow_desc}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <span className="text-gray-600 text-sm">{dateCreate}</span>
            </div>
            <div className="w-1/4">
              <a href={`/my-mindmap/${flow_id}`} Ư>
                <span className="text-gray-600 text-sm px-2">
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
              </a>
              <span
                className="text-gray-600 text-sm px-2"
                onClick={() => deleteMyFlow(flow_id)}
              >
                <i className="fa-solid fa-trash"></i>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListMyFlow;
