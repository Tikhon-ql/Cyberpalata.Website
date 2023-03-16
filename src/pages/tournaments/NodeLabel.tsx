
type Props = {
    className:string,
}


export const NodeLabel = ({className}:Props) => {
    return   <div
    className={className}
    style={{
      background: "#ffffff",
      height: "70px",
      borderTop: "2px solid #2F80ED",
      textAlign: "center",
      // position: "fixed",
      zIndex: "1000",
      // left: "-10px",
      boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
      padding: "5px 0",
      borderRadius: "5px"
    }}
  >
  </div>
}