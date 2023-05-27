import React from 'react'
import { AvField, AvForm } from "availity-reactstrap-validation"
import CustomBtn from 'components/CustomBtn'
import { successUpdate } from 'components/Notifications'
import useFetch from 'hooks/useFecth'

function EditForm({ onClose, userID, reFetch }) {

    const token = process.env.REACT_APP_TOKEN

    const { data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/view-user/${userID}`, token);

    //* FUNCTION TO UPDATE THE USER DETAILS
    const handleValidSubmit = (e, values) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            "id": userID,
            "username": values.userName,
            "email": values.email,
            "blocked": false
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/update-user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === 'success') {
                    onClose(false)
                    successUpdate("Successfully Updated")
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
                        type="text"
                        value={data?.username}
                        required
                    />
                </div>

                <div className="mb-3">
                    <AvField
                        name="email"
                        label="Email"
                        type="email"
                        value={data?.email}
                        required
                    />
                </div>

                <div className="mb-3">
                    <AvField name="Blocked" label="Blocked User" className="form-control" type="select">
                        <option> Select... </option>
                        <option value="true"> True </option>
                        <option value="false"> False </option>
                    </AvField>
                </div>

                <CustomBtn btnName="Submit" />
            </AvForm>
        </div>
    )
}

export default EditForm