interface IGridContainerProps {
  ui: React.ComponentType;
  code: React.ComponentType;
}

const GridContainer = ({ ui, code }: IGridContainerProps) => {
  const UI = ui;
  const Code = code;
  return (
    <div className="grid grid-cols-2 h-full gap-4 px-4">
      <div className="h-[85vh] border border-black rounded-md overflow-auto scroll-bar">
        <UI />
      </div>
      <div className="h-[85vh] border border-black rounded-md overflow-auto scroll-bar">
        <Code />
      </div>
    </div>
  );
};

export default GridContainer;
