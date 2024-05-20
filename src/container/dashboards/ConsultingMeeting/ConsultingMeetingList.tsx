import ConsultingMeetingItem from "./ConsultingMeetingItem";

const ConsultingMeetingList = () => {
  return (
    <div className="flex flex-col gap-3 my-0 sm:my-[1.5rem]">
      {Array.from({ length: 6 }).map((_, index) => (
        <ConsultingMeetingItem key={index} />
      ))}
    </div>
  );
};

export default ConsultingMeetingList;
