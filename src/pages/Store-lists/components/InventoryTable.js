import React, { useState } from 'react'
import { Container, Row, Card, Modal } from "react-bootstrap";
import { MDBDataTable } from "mdbreact"
import { useStore1Selector } from "../../../index";
import { loginUser } from "../../../Redux/Slices/userSlice";
import ViewItemDetails from './ViewItemDetails';
import EditInventoryInputForm from './EditInvatoryForm';
import { Badge } from 'reactstrap';


function InventoryTable({ inventoryData, reFetch }) {

    const [viewDetID, setViewDetID] = useState()
    const [editID, setEditID] = useState()
    const allItems = [];

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


    // * MANIPULATING THE DATA BEFORE PASSING IT TO THE USER
    inventoryData?.forEach((res) => {
        allItems.push({
            ...res,
            itemStatus: <Badge className={`btn ${!res.blocked ? 'btn-info' : 'btn-danger'}`}> {!res.blocked ? "Open" : "Blocked"} </Badge>,
            viewBtn: (<button className="btn btn-success" onClick={() => viewFunc(res?.id)}> View details </button>),
            editBtn: (<button className="btn btn-primary" onClick={() => editFunc(res?.id)}> Edit </button>),
        });
    });

    // * THE TABLE HEADER
    const column = [
        { label: "Item ID", field: "id", sort: "asc", width: 150 },
        { label: "Store ID", field: "store_id", sort: "asc", width: 150 },
        { label: "Item code", field: "product_code", sort: "asc", width: 150 },
        { label: "Item cost", field: "cost", sort: "asc", width: 150 },
        { label: "Prices", field: "price_1", sort: "asc", width: 150 },
        { label: "Stock on hand", field: "stock_on_hand", sort: "asc", width: 150 },
        { label: "Item status", field: "itemStatus", sort: "asc", width: 150 },
        { label: "View details", field: "viewBtn", sort: "asc", width: 150 },
        { label: "Edit", field: "editBtn", sort: "asc", width: 150 },
    ];

    const data = {
        columns: column, //* Table columns
        rows: allItems, //* Table rows (Data rows)
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Row className="d-flex justify-content-around align-items-center" data-aos="fade-bottom">
                    <Card.Body>
                        <Card className="bd-rds">
                            <Card.Body>
                                {/* The Table it self */}
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
                    <Modal.Title>Inventory details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ViewItemDetails itemID={viewDetID} />
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
                    <EditInventoryInputForm itemID={editID} closeModal={setLargeRightModalExample} reFetch={reFetch} />
                </Modal.Body>
            </Modal>

        </React.Fragment>
    )
}

export default InventoryTable