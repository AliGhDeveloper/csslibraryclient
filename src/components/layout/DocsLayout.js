import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";



export default function DocRoutes() {
    return (
        <div className="row ">
            <Sidebar />
            <div className="p-3 col-9-lg col-12-xs">
                <Outlet />                
            </div>
        </div>
    )
}