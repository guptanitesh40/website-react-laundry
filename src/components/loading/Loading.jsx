import { useEffect } from "react";
import "./loading.css";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  });
  return (
    <div
      className="fixed inset-0 overflow-hidden h-screen w-screen flex justify-center items-center bg-primary"
      style={{ zIndex: "999" }}
    >
      <div className="loader">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
