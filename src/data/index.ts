import { AiOutlineBarChart } from "react-icons/ai";
import { MdOutlineDashboard, MdOutlineArticle, MdOutlineFolder, MdOutlineSettings } from "react-icons/md";

export const DataMenuSidebar = [
    {
        title: "Dashboard",
        url: "/admin",
        Icon: MdOutlineDashboard,
        type: "button",
    },
    {
        title: "Articles",
        type: "submenu",
        submenu: [
            {
                title: "Category",
                url: "/admin/category",
                Icon: MdOutlineFolder,
            },
            {
                title: "Articles",
                url: "/admin/articles",
                Icon: MdOutlineArticle,
            },
        ],
    },
    {
        title: "Analytics",
        type: "submenu",
        submenu: [
            {
                title: "Anlytics",
                url: "/admin/analytics",
                Icon: AiOutlineBarChart,
            }
        ],
    },
    {
        title: "Settings",
        type: "submenu",
        submenu: [
            {
                title: "Setting",
                url: "/admin/setting",
                Icon: MdOutlineSettings,
            }
        ],
    },
];
