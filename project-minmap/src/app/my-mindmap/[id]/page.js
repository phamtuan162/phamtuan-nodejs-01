"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { ReactFlowProvider } from "reactflow";
import CreateFlow from "./Flow";
import { formatCurrentTime } from "@/utils/formatCurrentTime";
import { toast } from "react-toastify";
const CreateMindMap = () => {
  // const { data: session, update } = useSession();
  const { id: flow_id } = useParams();
  const flow = JSON.parse(localStorage.getItem("flowArr"));
  const flowNeedFind = flow?.find((item) => item.flow_id === flow_id);
  let dateCreate = flowNeedFind?.dateCreate || formatCurrentTime();

  const [rfInstance, setRfInstance] = useState(null);
  const [name, setName] = useState(
    flowNeedFind ? flowNeedFind.flow_name : "Mindmap không có tên"
  );
  const [desc, setDesc] = useState(
    flowNeedFind ? flowNeedFind.flow_desc : "Chưa có mô tả"
  );

  const handleChange = (e, setter) => {
    setter(e.target.textContent);
  };
  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
      let newFlow = {
        flow_id: flow_id,
        flow_name: name,
        flow_desc: desc,
        dateCreate: dateCreate,
        ...flow,
      };

      const existingFlows = JSON.parse(localStorage.getItem("flowArr")) || [];
      const existingIndex = existingFlows.findIndex(
        (item) => item.flow_id === flow_id
      );
      if (existingIndex !== -1) {
        existingFlows[existingIndex] = newFlow;
      } else {
        existingFlows.push(newFlow);
      }
      localStorage.setItem("flowArr", JSON.stringify(existingFlows));
      // update({
      //   name: "Tuấn",
      // });
    }
  }, [rfInstance, name, desc, flow_id]);
  useEffect(() => {
    onSave();
  }, [onSave]);

  return (
    <div className="py-5 mx-auto">
      <div className="text-start container mx-auto flex flex-wrap">
        <div className="w-4/5">
          <h1
            name="name"
            className="text-2xl md:text-4xl font-medium my-2 outline-0"
            spellCheck="false"
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: name }}
            onBlur={(e) => handleChange(e, setName)}
          ></h1>
          <p
            name="desc"
            className="outline-0"
            spellCheck="false"
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: desc }}
            onBlur={(e) => handleChange(e, setDesc)}
          ></p>
        </div>
        <div className="w-1/5 flex justify-end items-center">
          <button
            className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
            onClick={async () => {
              try {
                await onSave();
                toast.success("Lưu thành công");
              } catch (error) {
                console.error("Lỗi khi lưu: ", error);
                toast.error("Có lỗi xảy ra khi lưu");
              }
            }}
          >
            <i className="fa-solid fa-save"></i>
            <span className="ml-2">Lưu thay đổi</span>
          </button>
          <button
            type="button"
            className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700"
            target="_blank"
            rel="noopener"
            href="https://www.linkedin.com/shareArticle?mini=true&amp;url=&amp;title=&amp;summary=&amp;source="
            aria-label="Share on Linkedin"
          >
            <i className="fa-solid fa-share"></i>
            <span className="ml-2">Chia sẻ</span>
          </button>
        </div>
      </div>
      <div className="py-5" style={{ width: "100%", height: "500px" }}>
        <ReactFlowProvider>
          <CreateFlow
            setRfInstance={setRfInstance}
            flowNeedFind={flowNeedFind}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default CreateMindMap;
