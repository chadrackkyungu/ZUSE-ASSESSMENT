import React, { useEffect, useState } from "react"
import { Dropdown } from "reactstrap"
import { withTranslation } from "react-i18next"
import i18n from "../../../i18n"

const LanguageDropdown = () => {
  const [selectedLang, setSelectedLang] = useState("")
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE")
    setSelectedLang(currentLanguage)
  }, [])

  const changeLanguageAction = lang => {
    i18n.changeLanguage(lang)
    localStorage.setItem("I18N_LANGUAGE", lang)
    setSelectedLang(lang)
  }

  const toggle = () => { setMenu(!menu) }

  return (
    <>
      <Dropdown isOpen={menu} toggle={toggle} className="d-none d-md-block ms-2">

      </Dropdown>
    </>
  )
}

export default withTranslation()(LanguageDropdown)
