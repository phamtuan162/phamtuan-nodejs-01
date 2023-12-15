import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import "./text-update-node.scss";
function TextUpdateNode({ id, data, isConnectable }) {
  const [nodeName, setNodeName] = useState(data.label);
  const onChange = useCallback((e) => {
    setNodeName(e.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      {id === "0" ? (
        ""
      ) : (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      )}

      <div>
        <input type="text " onChange={onChange} value={nodeName} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdateNode;
