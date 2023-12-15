"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Controls,
  MiniMap,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  updateEdge,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "./flow.scss";

import TextUpdateNode from "./TextUpdateNode";

const initialNodes = [
  {
    id: "0",
    data: { label: "My Mindmap" },
    position: { x: 0, y: 0 },
    type: "textUpdater",
  },
];

const nodeTypes = { textUpdater: TextUpdateNode };
export default function Flow({ setRfInstance, flowNeedFind }) {
  const edgeUpdateSuccessful = useRef(true);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    flowNeedFind?.nodes || initialNodes
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    flowNeedFind?.edges || []
  );
  const { screenToFlowPosition, setViewport } = useReactFlow();
  let id = flowNeedFind?.nodes.length - 1 || 0;
  const getId = () => `${id + 1}`;
  // if (flowNeedFind) {
  //   const { x = 0, y = 0, zoom = 1 } = flowNeedFind.viewport;
  //   setViewport({ x, y, zoom });
  // }
  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        const newId = getId();
        const newNode = {
          id: newId,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Text ${newId}` },

          type: "textUpdater",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: newId,
          })
        );
        id++;
      }
    },
    [screenToFlowPosition]
  );

  // const onNodesDelete = useCallback(
  //   (deleted) => {
  //     setEdges(
  //       deleted.reduce((acc, node) => {
  //         const incomers = getIncomers(node, nodes, edges);
  //         const outgoers = getOutgoers(node, nodes, edges);
  //         const connectedEdges = getConnectedEdges([node], edges);

  //         const remainingEdges = acc.filter(
  //           (edge) => !connectedEdges.includes(edge)
  //         );

  //         const createdEdges = incomers.flatMap(({ id: source }) =>
  //           outgoers.map(({ id: target }) => ({
  //             id: `${source}->${target}`,
  //             source,
  //             target,
  //           }))
  //         );

  //         return [...remainingEdges, ...createdEdges];
  //       }, edges)
  //     );
  //   },
  //   [nodes, edges]
  // );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        nodeOrigin={[0.5, 0]}
        onInit={setRfInstance}
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
