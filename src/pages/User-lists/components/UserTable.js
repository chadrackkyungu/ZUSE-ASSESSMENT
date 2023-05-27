import React, { useState } from 'react'
import { Container, Row, Card, Modal, Button } from "react-bootstrap";
import { MDBDataTable } from "mdbreact"
import EditForm from './EditForm';
import ViewUserDetails from './ViewUserDetails';
import { successMessage } from 'components/Notifications';


function UserTable({ userData, reFetch }) {

    const token = process.env.REACT_APP_TOKEN

    const [viewDetID, setViewDetID] = useState()
    const [editID, setEditID] = useState()
    const [deleteID, setDeleteID] = useState()
    const [deleteUser, setDeleteUser] = useState()
    const allUsers = [];

    const [largeRightModalExample, setLargeRightModalExample] = useState(false);
    const [viewDet, setViewDet] = useState(false);


    //* FUNCTION TO TRIGGER THE VIEW MODAL
    function viewFunc(id) {
        setViewDetID(id)
        setViewDet(true)
    }

    //* FUNCTION TO TRIGGER THE EDIT MODAL
    function editFunc(id) {
        setEditID(id)
        setLargeRightModalExample(true)
    }

    //* FUNCTION TO TRIGGER THE DELETE MODAL
    function deleteFunc(id) {
        setDeleteID(id)
        setDeleteUser(true)
    }

    // * FUNCTION TO DELETE FROM THE DATABASE
    const deleteUserDet = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            "user_id": deleteID
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete-user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === 'success') {
                    setDeleteUser(false)
                    successMessage("Successfully deleted")
                    reFetch();
                }
            })
            .catch(error => console.log('error', error));
    };

    // * MANIPULATING THE DATA BEFORE PASSING IT TO THE USER
    userData?.forEach((res) => {
        allUsers.push({
            ...res,
            viewBtn: (<button className="btn btn-success" onClick={() => viewFunc(res?.id)}> View details </button>),
            editBtn: (<button className="btn btn-primary" onClick={() => editFunc(res?.id)}> Edit </button>),
            deleteBtn: (<button className="btn btn-danger" onClick={() => deleteFunc(res?.id)}> Delete </button>),
        });
    });

    // * THE TABLE HEADER
    const column = [
        { label: "User ID", field: "id", sort: "asc", width: 150 },
        { label: "User Name", field: "username", sort: "asc", width: 150 },
        { label: "Email", field: "email", sort: "asc", width: 150 },
        { label: "Role", field: "role", sort: "asc", width: 150 },
        { label: "Status", field: "blocked", sort: "asc", width: 150 },
        { label: "View details", field: "viewBtn", sort: "asc", width: 150 },
        { label: "Edit", field: "editBtn", sort: "asc", width: 150 },
        { label: "Delete", field: "deleteBtn", sort: "asc", width: 150 },
    ];

    const data = {
        columns: column, //* Table columns
        rows: allUsers, //* Table rows (Data rows)
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Row className="d-flex justify-content-around align-items-center" data-aos="fade-bottom">
                    <Card.Body>
                        <Card className="bd-rds">
                            <Card.Body>
                                <MDBDataTable entries={5} entriesOptions={[5, 10, 50]} responsive bordered striped hover data={data} fullPagination />
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Row>
            </Container>

            {/* VIEW USER DETAILS MODAL */}
            <Modal
                className="modal-right scroll-out-negative"
                show={viewDet}
                onHide={() => setViewDet(false)}
                scrollable
                dialogClassName="full">

                <Modal.Header closeButton>
                    <Modal.Title>User details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ViewUserDetails userID={viewDetID} />
                </Modal.Body>
            </Modal>



            {/* EDIT MODAL */}
            <Modal
                className="modal-right scroll-out-negative"
                show={largeRightModalExample}
                onHide={() => setLargeRightModalExample(false)}
                scrollable
                dialogClassName="full">

                <Modal.Header closeButton>
                    <Modal.Title>Edit user details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditForm userID={editID} onClose={setLargeRightModalExample} reFetch={reFetch} />
                </Modal.Body>
            </Modal>


            {/* DELETE MODAL  */}
            <Modal show={deleteUser} onHide={() => setDeleteUser(false)} size="sm">
                <Modal.Body className='text-danger'> <h5>Are you sure you want to delete this user ?</h5> </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setDeleteUser(false)}>X</Button>
                    <Button variant="danger" onClick={deleteUserDet}> Yes </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default UserTable