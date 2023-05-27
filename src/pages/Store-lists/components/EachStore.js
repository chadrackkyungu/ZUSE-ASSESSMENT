import React from 'react';
import { Card, CardBody, Row, Col, CardTitle, CardImg } from 'reactstrap';
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import store_img from "../../../assets/images/stores/shop-store-1.jpg"

const Store = ({ allStores }) => {

  return (
    <React.Fragment>
      <Row >
        {
          allStores?.map((store, i) => {
            return (
              <Col lg={4} key={i}>
                <Card>
                  <CardImg top className="img-fluid" src={store_img} alt="Ecornice" />
                  <CardBody>
                    <CardTitle className="h4 my-4">STORE NAME</CardTitle>
                    <div className="d-flex justify-content-between">
                      <b className="card-text">City : {store?.city}</b>
                      <b className="card-text">Province : {store?.province}</b>
                    </div>
                    <p className="card-text mt-4">Address : {store?.address}</p>

                    <div className='d-flex justify-content-between'>
                      <p> <Link className="text-start btn text-white" to={`/store/${store.id}`}> <FaEye size={20} /> View store details </Link> </p>
                    </div>

                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </React.Fragment>
  )
}

export default Store;