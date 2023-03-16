import React from 'react';
// import './../tournament/custom-tree.css';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Batle, BatleToSelectWinner, TreeData } from '../../utis/types/types';
import Tree from 'react-d3-tree-advanced';
import { Modal } from '../../utis/components/modal/Modal';
import {useState} from "react";
import { SelectWinner } from './SelectWinner';
// import { NodeLabel } from './NodeLabel';
// import {Node} from './Node';

export type Props = {
    tournamentId: string,
    treeData: TreeData ,
    setModalActive:any,
    modalActive:any
}

const svgSquare = {
    shape: 'rect',
   
}

const nodeStyle = (
    <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="80"
        height="40"
        x="10"
        y="10"
        fontStyle="fill: skyblue; stroke: cadetblue; stroke-width: 2;"
      />
    </svg>
  );

const containerStyles = {
    width: "100vw",
    height: "100vh",
};

// const renderForeignObjectNode = ({
//     nodeDatum,
//     toggleNode,
//     foreignObjectProps
//   }) => (
//     <g>
//       <circle r={15}></circle>
//       {/* `foreignObject` requires width & height to be explicitly set. */}
//       <foreignObject {...foreignObjectProps}>
//         <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
//           <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
//           {nodeDatum.children && (
//             <button style={{ width: "100%" }} onClick={toggleNode}>
//               {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
//             </button>
//           )}
//         </div>
//       </foreignObject>
//     </g>
//   );

type NodeProps = {
  className: any,
  nodeData ?:any
}

const NodeLabel = ({className, nodeData}:NodeProps) => {
  return <div
      className={className}
      style={{
        color:"white",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background: "#0f0426",
        height: "70px",
        borderTop: "2px solid #FFC700",
        textAlign: "center",
        // position: "fixed",
        zIndex: "1000",
        // left: "-10px",
        boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
        padding: "5px 0",
        borderRadius: "5px"
      }}
    >
      {nodeData.name}
    </div>
}


export const TreeMap = ({treeData, tournamentId,setModalActive,modalActive}:Props)=>{
    // const [modalActive, setModalActive] = useState<boolean>(false);
    const [currentBatle, setCurrentBatle] = useState<BatleToSelectWinner>();

    const separation = { siblings: 3, nonSiblings: 3};
    const nodeSize = { x: 100, y: 100 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
    // const [translate, containerRef] = ();
    const navigate = useNavigate();
    let accessToken: any;
    if(localStorage.getItem('accessToken'))
    {
        accessToken = jwtDecode(localStorage.getItem('accessToken') || "");
    }

    function nodeClicked(e: any)
    {
      console.log("It's me mario");
      console.dir(e);
      if(e.batleId && e.firstTeamName && e.firstTeamId && e.secondTeamName && e.secondTeamId && 
        e.parent.batleId === "00000000-0000-0000-0000-000000000000")
      {
          setCurrentBatle({
            batleId: e.batleId,
            firstTeamName: e.firstTeamName,
            firstTeamId: e.firstTeamId,
            secondTeamName:e.secondTeamName,
            secondTeamId: e.secondTeamId
          });
          setModalActive(true);
      }
    }


    return (
        <div id="treeWrapper" style={containerStyles}>
            <Tree data={treeData}
            nodeSize={nodeSize}
            separation={separation}
            // transitionDuration = {1000}
            pathFunc="elbow"
            onClick={accessToken?.role === "Admin" ? (e: any)=>{nodeClicked(e)} : (e:any)=>{e.preventDefault()}}
            orientation="vertical"
            translate={{ x: 900, y: 150 }}
            allowForeignObjects={true}
            nodeLabelComponent={{
              render: <NodeLabel className="myLabelComponentInSvg" />,
              foreignObjectWrapper: {
                width: 220,
                height: 200,
                y: -50,
                x: -100,
                z:-1
              }
            }}
            nodeSvgShape={svgSquare}
            styles={{
              links: {
                   
                    stroke: '#c3b0eb',
                    strokeWidth: "2px",
                  },
           }}
            />
            <Modal active={modalActive} setActive={setModalActive}>
                {currentBatle && <SelectWinner batle={currentBatle as BatleToSelectWinner} tournamentId={tournamentId} setModalState={setModalActive}/>}
            </Modal>
        </div>
    )
}