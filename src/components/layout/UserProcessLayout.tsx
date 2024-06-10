import ProcessHeader from "@container/dashboards/process/header";

const UserProcessLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full flex flex-col my-7">
      <ProcessHeader />
      {children}
    </div>
  );
};

export default UserProcessLayout;
