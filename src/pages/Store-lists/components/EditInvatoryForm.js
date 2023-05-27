import React from 'react';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation"
import CustomBtn from 'components/CustomBtn';
import useFetch from 'hooks/useFecth';
import { successUpdate } from 'components/Notifications';

const EditInventoryInputForm = ({ itemID, closeModal, reFetch }) => {


    const token = process.env.REACT_APP_TOKEN

    const { data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/view-item/${itemID}`, token);

    const handleValidSubmit = (e, values) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer  ${token}`);

        var raw = JSON.stringify({
            "product_code": values.product_code,
            "product_description": values.product_description,
            "stock_on_hand": values.stock_on_hand,
            "cost": values.cost,
            "price_1": values.price,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/update-item/${data.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === 'success') {
                    closeModal(false)
                    successUpdate("Successfully Updated")
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
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="cost" value={data?.cost} label="Item Cost" className="form-control" type="number" placeholder="Enter item cost" required />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="price" value={data?.price_1} label="Item Price" className="form-control" type="number" placeholder="Enter item price" required />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="product_code" value={data?.product_code} label="Item Code" className="form-control" placeholder="Enter item code" type="text" required />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="stock_on_hand" value={data?.stock_on_hand} label="Stock on hand" className="form-control" placeholder="Enter stock" type="number" required />
                            </div>
                        </Col>

                        <div className="mb-3">
                            <AvField name="product_description" value={data?.product_description} label="Item Description" className="form-control" type="textarea" placeholder="Enter item description" required>
                            </AvField>
                        </div>

                    </Row>
                    <CustomBtn btnName="Submit" />
                </AvForm>
            </Row>
        </React.Fragment>
    )
}

export default EditInventoryInputForm;