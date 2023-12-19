"use client";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./text-update-node.scss";
function TextUpdateNode({ id, data, isConnectable, onLabelChange }) {
  const onChange = useCallback(
    (e) => {
      onLabelChange(id, e.target.value);
    },
    [id, onLabelChange]
  );

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
        <input type="text " onChange={onChange} defaultValue={data.label} />
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
