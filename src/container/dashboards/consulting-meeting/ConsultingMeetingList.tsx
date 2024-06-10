import { useUser } from "@redux/useSelector";
import ConsultingMeetingItem from "./ConsultingMeetingItem";

const ConsultingMeetingList = () => {
  const user = useUser();
  return (
    <div className="flex flex-col gap-3">
      {user.check_submit &&
        Array.from({ length: 6 }).map((_, index) => (
          <ConsultingMeetingItem key={index} />
        ))}
    </div>
  );
};

export default ConsultingMeetingList;
