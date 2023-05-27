import React, { useState } from "react"
import { Dropdown } from "reactstrap"

const NotificationDropdown = props => {
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="dropdown d-inline-block" tag="li" > </Dropdown>
    </React.Fragment>
  )
}

export default NotificationDropdown

