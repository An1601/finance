import { Fragment } from "react/jsx-runtime";
import ItemNotification from "./ItemNotification";

function NotificationList() {
  return (
    <Fragment>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[380px] h-28 px-3 py-4 bg-white border-[1px] border-stroke justify-start items-center gap-8 inline-flex"
        >
          <ItemNotification />
        </div>
      ))}
    </Fragment>
  );
}

export default NotificationList;
