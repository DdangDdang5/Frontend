import React from "react";
// import { Toast } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
// import { removeFromToastList } from "../../store/notification";

export const ToastNotification = ({ notif }) => {
  const dispatch = useDispatch();

  let hideNotif = notif === {};
	console.log(hideNotif);

  if (!hideNotif) {
    toast.info(<Display />);
  }

  function Display() {
    return (
      <div>
        {/* <h4>{props.title}</h4> */}
        <p>{notif.id}</p>
        <p>{notif.content}</p>
      </div>
    );
  }

  return (
    <ToastContainer
      key={notif.id}
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    >
      {/* {notif.content} */}
    </ToastContainer>

    // <Toast
    //   style={{
    //     color: "white",
    //     fontSize: "20px",
    //     borderRadius: 8,
    //     backgroundColor: "#2E68FF",
    //   }}
    //   key={notif.id}
    //   autohide={true}
    //   delay={3500}
    //   onClose={() => {
    //     dispatch(removeFromToastList({ notif }));
    //   }}
    // >
    //   <Toast.Body>{notif.content}</Toast.Body>
    // </Toast>
  );
};
