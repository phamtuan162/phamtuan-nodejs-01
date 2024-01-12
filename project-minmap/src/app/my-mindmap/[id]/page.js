"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { ReactFlowProvider } from "reactflow";
import CreateFlow from "./Flow";
import { formatCurrentTime } from "@/utils/formatCurrentTime";
import { toast } from "react-toastify";
import Share from "./Share";
import { postFlow, updateFlow, getFlow, getFlowUser } from "@/services/flowApi";
import { getLocalStorage } from "@/utils/getLocalStorage";
import Loading from "@/components/Loading/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const CreateMindMap = () => {
  const router = useRouter();
  const { id: flow_id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id || getLocalStorage("user_id");
  const [flowNeedFind, setFlowNeedFind] = useState(null);
  const [mode, setMode] = useState(flowNeedFind?.flow_mode || "private");
  let dateCreate = flowNeedFind?.dateCreate || formatCurrentTime();
  const [rfInstance, setRfInstance] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(
    flowNeedFind?.flow_name || "Mindmap không có tên"
  );
  const [desc, setDesc] = useState(flowNeedFind?.flow_desc || "Chưa có mô tả");
  const [checkUser, setCheckUser] = useState(false);
  let save = false;
  const fetchFlowData = async () => {
    const fetchedFlow = await getFlow(flow_id);
    const userCheck = fetchedFlow[0]?.user_id === userId;
    setCheckUser(userCheck);
    setFlowNeedFind(fetchedFlow.length > 0 ? fetchedFlow[0] : []);
  };
  useEffect(() => {
    fetchFlowData();
  }, [flow_id]);

  useEffect(() => {
    if (!checkUser && flowNeedFind?.flow_mode === "private") {
      router.push("/");
    }
  }, [checkUser, flowNeedFind]);

  const handleChange = (e, setter) => {
    setter(e.target.textContent);
  };

  const onSave = useCallback(
    async (save) => {
      if (rfInstance) {
        const flow = rfInstance.toObject();
        const newFlow = {
          user_id: userId,
          id: flow_id,
          flow_name: name,
          flow_desc: desc,
          dateCreate: dateCreate,
          flow_mode: mode,
          ...flow,
        };
        const existingFlows = await getFlowUser(userId);
        const isFlowExist = existingFlows.some((item) => item.id === flow_id);

        if (save && isFlowExist) {
          await updateFlow(newFlow);
        } else if (!isFlowExist) {
          await postFlow(newFlow);
        }

        document.title = name;
      }
    },
    [rfInstance, name, desc, flow_id, mode, userId]
  );

  useEffect(() => {
    onSave();
  }, [onSave]);

  const openShare = () => {
    setOpen(true);
  };

  const handleSaveModeFlow = async (e, modeShare) => {
    e.preventDefault();
    flowNeedFind.flow_mode = modeShare;
    updateFlow(flowNeedFind).then((data) => {
      if (data) {
        setMode(modeShare);
        toast.success("Lưu thành công");
      }
    });
  };

  if (!flowNeedFind) {
    return <Loading />;
  }
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
          {checkUser || Array.isArray(flowNeedFind) ? (
            <>
              <button
                className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
                onClick={async () => {
                  try {
                    await onSave((save = true));
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
                <span className="ml-2" onClick={openShare}>
                  Chia sẻ
                </span>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="py-5" style={{ width: "100%", height: "500px" }}>
        <ReactFlowProvider>
          <CreateFlow
            setRfInstance={setRfInstance}
            flowNeedFind={flowNeedFind}
            onSave={onSave}
          />
        </ReactFlowProvider>
      </div>

      {open ? (
        <Share
          setOpen={setOpen}
          flowNeedFind={flowNeedFind}
          handleSaveModeFlow={handleSaveModeFlow}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateMindMap;
