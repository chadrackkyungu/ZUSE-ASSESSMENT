import React from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import { AvForm } from "availity-reactstrap-validation"
import { useHistory } from "react-router-dom"
import LoginForm from "./components/LoginForm";
import { useStore1Dispatch } from "../../index";
import { Login } from "../../Redux/Slices/userSlice";
import MetaTagComp from 'components/MetaTag';
import CustomBtn from "../../components/CustomBtn"
import Login_img from "../../../src/assets/images/Auth-img/Login1.png";
import Logo_img from "../../../src/assets/images/Logo/Logo.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const LoginComp = () => {
  const history = useHistory()
  const dispatch = useStore1Dispatch();

  const handleValidSubmit = (e, values) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": values.username,
      "password": values.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message === 'success') {
          dispatch(Login(data));
          successMessage("Successfully login")
          window.setTimeout(() => {
            history.push("/store-lists");
          }, 2000);
        }
      })
      .catch(error => console.log('error', error));
  }


  return (
    <React.Fragment>
      <MetaTagComp title_sco="Login" />
      <Row className="Container_h">

        <Col md={6} className="bg-image">
          <img src={Login_img} alt="" />
        </Col>

        <Col md={6} className="Login__container">
          <img src={Logo_img} alt="" />
          <div className="input-card">
            <Card className="overflow-hidden card-border-radius">
              <CardBody>
                <AvForm className="form-horizontal" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>
                  <LoginForm />
                  <Link to="/store-lists">
                    <CustomBtn btnName="Submit" />
                  </Link>
                </AvForm>
              </CardBody>
            </Card>
          </div>
        </Col>

      </Row>
    </React.Fragment>
  )
}

export default LoginComp
