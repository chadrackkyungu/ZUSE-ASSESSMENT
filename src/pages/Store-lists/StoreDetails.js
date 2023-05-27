import React, { useState } from "react"
import useFetch from '../../hooks/useFecth';
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import MetaTag from "../../components/MetaTag";
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import ModalComp from "Modal";
import InventoryInputForm from "./components/InventoryInputForm";
import store_img from "../../assets/images/stores/shop-store-1.jpg"
import InventoryTable from "./components/InventoryTable";

const StoreDetails = () => {

    const token = process.env.REACT_APP_TOKEN

    const { id } = useParams()
    const [openModal, setOpenModal] = useState(false);
    const { data, loading, reFetch } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/view-store/${id}`, token);

    return (
        <React.Fragment>
            <div className="page-content m-5">
                <Breadcrumb default="Store" title="Store details" />
                <MetaTag title_sco="store details" />

                <Container fluid>

                    <Link to="/store-lists" > <BsArrowLeft /> Back </Link>

                    <Card className="mt-5">
                        <CardBody >

                            <div className="store_detail__img">
                                <img className="img-fluid img_det" src={store_img} alt="Ecornice" />
                                <div className="content__store__detail">
                                    <p> <strong>Contact person : </strong> {data?.contact_person} </p>
                                    <p> <strong> Contact number : </strong> {data?.contact_number} </p>
                                    <p> <strong> Email : </strong> {data?.email} </p>
                                    <p> <strong> Status :  </strong> {!data?.blocked ? "Open" : "Blocked"} </p>
                                    <p> <strong> City : </strong> {data?.city} </p>
                                    <p> <strong> Postal code : </strong> {data?.postal_code} </p>
                                    <p> <strong> Province : </strong> {data?.province} </p>
                                    <p> <strong> Address : </strong> {data?.address} </p>
                                </div>
                            </div>

                            <CardBody>
                                <div>
                                    <p> <b> Description :  </b> </p>
                                    <p className="description">{data.description}</p>
                                </div>
                            </CardBody>
                        </CardBody>
                    </Card>

                    <div className="text-start">
                        <button className="btn btn-success mb-2 mt-5 text-white" onClick={() => setOpenModal(true)}> +  Add new inventory </button>
                    </div>
                    <Card>
                        <h4 className="px-3 pt-5">Inventory </h4>
                        <InventoryTable inventoryData={data?.inventory} reFetch={reFetch} closeModal={setOpenModal} />
                    </Card>


                </Container>
            </div>

            <ModalComp
                ModalTitle="Add Inventory"
                open={openModal}
                onClose={() => setOpenModal(false)}
                cancel="close"
                Component={<InventoryInputForm onClose={() => setOpenModal(false)} reFetch={reFetch} storeId={id} />}
            />
        </React.Fragment>
    )
}

export default StoreDetails