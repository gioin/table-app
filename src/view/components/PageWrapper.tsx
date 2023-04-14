export interface PageWrapperProp {
  title: string;
  children: React.ReactNode | string | React.ReactNode[];
}

const PageWrapper = ({ title, children }: PageWrapperProp) => {
  return (
    <>
      <div className="h-[211px] flex items-center">
        <div className="text-lg font-bold ml-[172px]">{title}</div>
      </div>
      <div className="bg-table h-[869px] mb-[38px] relative">
        <div className="ml-[202px] pt-[38px]">{children}</div>
      </div>
    </>
  );
}

export default PageWrapper;
