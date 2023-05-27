import React, { useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"
import user1 from "../../../assets/images/users/user-4.jpg"
import { Link } from "react-router-dom/cjs/react-router-dom"

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect profile__btn" id="page-header-user-dropdown" tag="button">
          <img className="rounded-circle header-profile-user" src={user1} alt=" Avatar" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/login" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileMenu
