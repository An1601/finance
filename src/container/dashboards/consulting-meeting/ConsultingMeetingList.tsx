import { useUser } from "@redux/useSelector";
import ConsultingMeetingItem from "./ConsultingMeetingItem";
import { ConsultingMeeting } from "@type/types";

const ConsultingMeetingList = ({
  loanData,
}: {
  loanData: ConsultingMeeting[];
}) => {
  const user = useUser();

  return (
    <div className="flex flex-col gap-3">
      {user.check_submit &&
        loanData
          .slice(0, 6)
          .map((meeting, index) => (
            <ConsultingMeetingItem key={index} loanDetails={meeting} />
          ))}
    </div>
  );
};

export default ConsultingMeetingList;
