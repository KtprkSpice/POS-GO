import { Link, Outlet } from "react-router";
import {
  Community,
  Business,
  Home,
  UserIdCard,
  ArrowOutRightCircleHalf,
} from "@boxicons/react";

function AdminLayout() {
  return (
    <>
      <aside className="w-64 min-h-screen bg-gray-600 fixed flex flex-col">
        <div className="relative overflow-hidden flex items-center flex-col justify-center p-10">
          <div className="absolute inset-0 bg-center bg-cover blur-xs scale-110 bg-[url(https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] "></div>
          <div className="relative z-10 inset-0 flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt=""
              className="rounded-full mb-5"
            />
            <h2 className="text-white">Nama</h2>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <a
                href="#"
                className="p-5 border-b border-black  text-white flex gap-2 items-center"
              >
                <Home />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                to={"/admin/employees"}
                className="p-5 border-b border-black  text-white flex gap-2 items-center"
              >
                <Community />
                <span>Data Karyawan</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/divisions"}
                href="#"
                className="p-5 border-b border-black  text-white flex gap-2 items-center"
              >
                <Business />
                <span>Divisions</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/positions"}
                className="p-5 border-b border-black  text-white flex gap-2 items-center"
              >
                <UserIdCard />
                <span>Positions</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <a
            href="#"
            className="p-5 text-white border-t border-black flex items-center gap-5"
          >
            <ArrowOutRightCircleHalf />
            <span>Logout</span>
          </a>
        </div>
      </aside>
      <section className="ml-64 flex justify-center min-h-screen bg-gray-100 border border-black">
        <div className="w-full max-w-6xl p-10">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default AdminLayout;
