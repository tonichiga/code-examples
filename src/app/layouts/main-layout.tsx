import Sidebar from "@/04.widgets/sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr,6fr] min-h-screen">
      <Sidebar />
      <div className="pt-8">{children}</div>
    </div>
  );
};

export default MainLayout;
