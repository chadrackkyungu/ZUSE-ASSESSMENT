import React from 'react';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation"
import CustomBtn from 'components/CustomBtn';
import { successMessage } from 'components/Notifications';

const InventoryInputForm = ({ reFetch, storeId, onClose }) => {

  const token = process.env.REACT_APP_TOKEN


  const handleValidSubmit = (e, values) => {
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      "item_code": values.item_code,
      "item_description": values.item_description,
      "cost": values.cost,
      "price_1": values.price,
      "store_id": storeId
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-inventory`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message === 'success') {
          onClose(false)
          successMessage("Successfully added")
          reFetch();
        }
      })
      .catch(error => console.log('error', error));

  }


  return (
    <React.Fragment>
      <Row className='mt-4'>
        <AvForm className="form-horizontal mt-4" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>

          <Row>
            <Col md={4}>
              <div className="mb-3">
                <AvField name="item_code" label="Item Code" className="form-control" placeholder="Enter item code" type="text" required />
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <AvField name="cost" label="Item Cost" className="form-control" type="number" placeholder="Enter item cost" required />
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <AvField name="price" label="Item Price" className="form-control" type="number" placeholder="Enter item price" required />
              </div>
            </Col>

            <div className="mb-3">
              <AvField name="item_description" label="Item Description" className="form-control" type="textarea" placeholder="Enter item description" required>
              </AvField>
            </div>

          </Row>
          <CustomBtn btnName="Submit" />
        </AvForm>
      </Row>
    </React.Fragment>
  )
}

export default InventoryInputForm;