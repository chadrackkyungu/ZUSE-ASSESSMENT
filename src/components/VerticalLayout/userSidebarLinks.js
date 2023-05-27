import { DashboardRoute, UserListsRoute } from 'components/RouteName';
import React from 'react'
import { Link } from 'react-router-dom';

function userSidebarLinks() {
    return (
        <>
            <li>
                <Link to={DashboardRoute} className=" waves-effect">
                    <i className="ti-package"></i> <span>Store Lists</span>
                </Link>
            </li>
            <li>
                <Link to={UserListsRoute} className=" waves-effect">
                    <i className="ti-user"></i> <span>User Lists</span>
                </Link>
            </li>
        </>
    )
}

export default userSidebarLinks