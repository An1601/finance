import { useUser } from "@redux/useSelector";
import ConsultingMeetingItem from "./ConsultingMeetingItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import { ConsultingMeeting } from "@type/types";
import { useEffect, useState } from "react";
import api from "@api/axios";

const ConsultingMeetingList = () => {
  const user = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [loanData, setLoanData] = useState<ConsultingMeeting[]>([]);

  const fetchDataMeeting = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get("/meeting/");
      setLoanData(response.data.data);
    } catch (error) {}
    dispatch(setLoadingFalse());
  };

  useEffect(() => {
    fetchDataMeeting();
  }, []);

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
