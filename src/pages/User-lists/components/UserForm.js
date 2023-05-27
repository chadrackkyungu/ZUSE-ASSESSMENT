import React from 'react'
import { AvField, AvForm } from "availity-reactstrap-validation"
import CustomBtn from 'components/CustomBtn'
import { successMessage } from 'components/Notifications'

function UserForm({ onClose }) {

    const token = process.env.REACT_APP_TOKEN

    const handleValidSubmit = (e, values) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            "username": values.userName,
            "email": values.email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/add-user`, requestOptions)
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
        <div>
            <AvForm className="form-horizontal" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>
                <div className="mb-3">
                    <AvField
                        name="userName"
                        label="User Name"
                        className="form-control"
                        placeholder="Enter your name"
                        type="text"
                        required
                    />
                </div>

                <div className="mb-3">
                    <AvField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <CustomBtn btnName="Submit" />
            </AvForm>
        </div>
    )
}

export default UserForm