import { AiFillHome } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { IoNewspaper, IoPerson } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  let path = location.pathname;

  const menuItems = [
    { icon: <AiFillHome />, label: "Dashboard", route: "/dashboard/home" },
    { icon: <IoPerson />, label: "Profile", route: "/dashboard/profile" },
    {
      icon: <IoNewspaper />,
      label: "Price List View",
      route: "/dashboard/price-list",
    },
    {
      icon: <FaLocationDot />,
      label: "Saved Addresses",
      route: "/dashboard/saved-addresses",
    },
  ];

  return (
    <>
      <ul className="dash-sidebar flex flex-col gap-12">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${item.route === path ? "active-dash-link" : ""}`}
          >
            <Link to={item.route} className="dash-nav-link">
              <span
                className={`dash-icons-container ${
                  item.route === path ? "active-icons-clr" : ""
                }`}
              >
                {item.icon}
              </span>
              <span className={`${item.route === path ? "active-label" : ""}`}>
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
