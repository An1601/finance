import { Fragment } from "react/jsx-runtime";
import ItemNotification from "./ItemNotification";

function NotificationList() {
  return (
    <Fragment>
      {Array.from({ length: 6 }).map((_, index) => (
        <ItemNotification key={index} />
      ))}
    </Fragment>
  );
}

export default NotificationList;
