import Link from "next/link";
import { routes } from "./const/routes";

const Sidebar = () => {
  return (
    <aside className="bg-slate-400 p-6 py-10">
      <ul className="flex flex-col gap-2">
        {routes.map((route) => (
          <li className="text-xl hover:text-gray-900" key={route.link}>
            <Link href={route.link}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
