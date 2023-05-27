import React from 'react'
import { Row, Col } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation"
import CustomBtn from 'components/CustomBtn';
import { successMessage } from 'components/Notifications';

function StoreInputForm({ onClose, reFetch }) {


    const token = process.env.REACT_APP_TOKEN


    const handleValidSubmit = (e, values) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            "description": values.description,
            "address": values.address,
            "city": values.city,
            "province": values.province,
            "postal_code": values.postal_code,
            "contact_person": values.contact_person,
            "contact_number": values.contact_number,
            "email": values.email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/add-store`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === 'success') {
                    onClose(false)
                    successMessage("Successfully Added")
                    reFetch();
                }
            })
            .catch(error => console.log('error', error));
    }



    return (
        <>
            <Row>

                <AvForm className="form-horizontal mt-4" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>

                    <Row>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="contact_person" label="Contact Person" className="form-control" placeholder="Enter contact person" type="text" required />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="contact_number" label="Contact Number" className="form-control" type="number" placeholder="Enter contact number" required />
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="mb-3">
                                <AvField name="email" label="Email address" className="form-control" type="email" placeholder="Enter email" required />
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="city" label="City" className="form-control" type="text" placeholder="Enter city" required />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="province" label="Province" className="form-control" type="text" placeholder="Enter province" required />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="address" label="Address" className="form-control" type="text" placeholder="Enter your address" required />
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <AvField name="postal_code" label="Postal Code" className="form-control" type="text" placeholder="Enter postal code" required />
                            </div>
                        </Col>

                        <div className="mb-3">
                            <AvField name="description" label="Description" className="form-control" type="textarea" placeholder="Enter description" required>
                            </AvField>
                        </div>

                    </Row>
                    <CustomBtn btnName="Submit" />
                </AvForm>
            </Row>
        </>
    )
}

export default StoreInputForm