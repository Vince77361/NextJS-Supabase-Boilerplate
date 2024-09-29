import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#eee",
        },
      }}
    />
  );
};

export default ToasterProvider;
