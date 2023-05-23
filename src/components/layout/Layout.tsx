import { Link, Outlet, useNavigate } from "react-router-dom";
import pic from '/images/20687.png'
import { useAuthUser } from "../../hooks";


export default function Layout() {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  className="w-full h-full p-3 flex text-gray-500 hover:text-gray-700"
                  to="/dashboard"
                >
                  <img
                    className="w-auto h-auto mr-3"
                    src={pic}
                    alt="pig-image"
                  />
                  <div className="h-full flex items-center">
                    Digital Finance
                  </div>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {authUser.userName && (
                <div className="flex">
                  <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:cursor-default">
                    Welcome, {authUser.userName}
                  </p>
                  <button
                    onClick={() => navigate("/logout")}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
