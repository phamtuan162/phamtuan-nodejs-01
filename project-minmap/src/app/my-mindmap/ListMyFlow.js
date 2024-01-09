"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { getFlowUser, deleteFlow } from "@/services/flowApi";
function ListMyFlow() {
  const userId = getLocalStorage("user_id");
  const [flows, setFlows] = useState(getLocalStorage("flowArr") || []);

  useEffect(() => {
    const fetchFlows = async () => {
      const flowData = await getFlowUser(userId);
      localStorage.setItem("flowArr", JSON.stringify(flowData));
      setFlows(flowData);
    };

    fetchFlows();
  }, [userId]);

  const deleteMyFlow = (id) => {
    const flowArrNew = flows.filter((item) => item.id !== id);

    toast.warning("Nếu bạn chắc chắn muốn xóa, Click Here", {
      onClick: async () => {
        await deleteFlow(id);
        localStorage.setItem("flowArr", JSON.stringify(flowArrNew));
        toast.success("Bạn xóa thành công");
        setFlows(flowArrNew);
      },
    });
  };

  return (
    <>
      {flows?.map(({ id, flow_name, flow_desc, dateCreate }) => {
        return (
          <div
            key={id}
            className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg"
          >
            <div className="w-1/6 text-center">
              <input type="checkbox" />
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <div className="ml-4">
                  <span className="capitalize block text-gray-800">
                    <a href={`/my-mindmap/${id}`}>{flow_name}</a>
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
              <a href={`/my-mindmap/${id}`} Ư>
                <span className="text-gray-600 text-sm px-2">
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
              </a>
              <span
                className="text-gray-600 text-sm px-2"
                onClick={() => deleteMyFlow(id)}
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
