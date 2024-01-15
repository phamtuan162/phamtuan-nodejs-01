import { v4 as uuidv4 } from "uuid";
import { getLocalStorage } from "@/utils/getLocalStorage";
export const metadata = {
  title: "My MindMap",
};
import ListMyFlow from "./ListMyFlow";
const MyMindMap = () => {
  const flow_id = uuidv4();
  return (
    <div className="container px-4 mx-auto">
      <div className="text-start">
        <h1 className="text-3xl md:text-4xl font-medium my-2">
          Mindmap của tôi
        </h1>
        <div className="py-4">
          <a
            className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
            href={`./my-mindmap/${flow_id}`}
          >
            Thêm mới
          </a>
        </div>
        <div className="py-4">
          <div className="flex items-center py-2">
            <span className="w-1/6 text-center">
              <input type="checkbox" />
            </span>
            <span className="w-1/2">
              <span className="text-xs uppercase text-gray-600 font-bold">
                Tên
              </span>
            </span>
            <span className="w-1/4">
              <span className="text-xs uppercase text-gray-600 font-bold">
                Tạo lúc
              </span>
            </span>
            <span className="w-1/4">
              <span className="text-xs uppercase text-gray-600 font-bold">
                Hành động
              </span>
            </span>
          </div>
        </div>
        <ListMyFlow />
      </div>
    </div>
  );
};
export default MyMindMap;
