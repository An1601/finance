import { Dispatch, Fragment, SetStateAction, useRef } from "react";

const SurveyDragDrop = ({
  choices,
  setSortChoices,
}: {
  choices: string[] | never[];
  setSortChoices: Dispatch<SetStateAction<string[] | never[]>>;
}) => {
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);

  const handleSort = () => {
    const peopleClone = [...choices];
    [peopleClone[dragPerson.current], peopleClone[draggedOverPerson.current]] =
      [peopleClone[draggedOverPerson.current], peopleClone[dragPerson.current]];
    setSortChoices(peopleClone);
  };

  return (
    <Fragment>
      {choices.map((choice, index) => (
        <div
          key={index}
          className="w-full h-[52px] p-4 bg-light_finance-input_bg rounded-[7px] border justify-between items-center inline-flex cursor-move"
          draggable
          onDragStart={() => (dragPerson.current = index)}
          onDragEnter={() => (draggedOverPerson.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-light_finance-textbody text-sm font-bold font-HelveticaNeue leading-tight">
            {index + 1}
          </div>
          <div className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight">
            {choice}
          </div>
          <i className="fa-solid fa-arrows-up-down-left-right fa-lg"></i>
        </div>
      ))}
    </Fragment>
  );
};

export default SurveyDragDrop;
