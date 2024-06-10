import React, { Fragment } from "react";

interface SurveyProgressProps {
  answers: any[]; // Define the type properly based on your answers structure
  currentIndex: number;
  checkDoneUnit: (index: number) => boolean;
}

const SurveyProgress: React.FC<SurveyProgressProps> = ({
  answers,
  currentIndex,
  checkDoneUnit,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full h-6 justify-between items-center inline-flex">
        {Array.from({ length: answers.length }).map((_, index) => (
          <i
            key={index}
            className={`${!checkDoneUnit(index) ? "invisible" : ""} text-light_finance-primary fa-solid fa-check h-6 w-6`}
          />
        ))}
      </div>
      <div className="w-full h-6 justify-start items-center inline-flex pl-[2px] pr-2">
        {Array.from({ length: answers.length }).map((_, index) => (
          <Fragment key={index}>
            {currentIndex === index ? (
              <div className="font-HelveticaNeue text-sm text-light_finance-background bg-primary h-6 w-6 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
            ) : checkDoneUnit(index) ? (
              <div className="w-1.5 h-1.5 bg-light_finance-primary rounded-full" />
            ) : (
              <div className="w-1.5 h-1.5 bg-light_finance-textsub rounded-full" />
            )}
            {index !== answers.length - 1 && (
              <div className="grow shrink basis-0 h-px bg-light_finance-textsub" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SurveyProgress;
