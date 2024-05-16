const ItemNotification = () => {
  return (
    <div className="w-[380px] h-28 px-3 py-4 bg-white border-[1px] border-[#E8EAEF] justify-start items-center gap-8 inline-flex">
      <div className="grow shrink basis-0 h-20 justify-start items-center gap-3 flex">
        <img
          className="h-11 w-11 rounded-full overflow-hidden"
          src="https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
        />
        <div className="flex flex-col justify-center gap-1 grow shrink basis-0 ">
          <div className="text-light_finance-textbody text-base font-bold font-['Helvetica Neue'] leading-normal tracking-tight">
            Alister Bero
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
              Admin checked your request for business loan.
            </div>
          </div>
          <div className="text-light_finance-textsub text-[10px] font-normal font-['Helvetica Neue'] leading-none tracking-tight">
            12 mins ago
          </div>
        </div>
      </div>
      <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex">
        <div className="text-light_finance-textsub text-[10px] font-normal font-['Helvetica Neue'] leading-none tracking-tight">
          24,Oct 2024
        </div>
      </div>
    </div>
  );
};

export default ItemNotification;
