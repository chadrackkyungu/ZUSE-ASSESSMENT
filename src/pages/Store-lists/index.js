import React, { useState } from "react"
import useFetch from './../../hooks/useFecth';
import { Container } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import MetaTag from "../../components/MetaTag";
import EachStore from "./components/EachStore";
import ModalComp from '../../Modal';
import StoreInputForm from "./components/StoreInputForm";
import Loading from "components/Loading";


const Dashboard = () => {

    const token = process.env.REACT_APP_TOKEN

    const [openModal, setOpenModal] = useState(false);
    const { data, loading, reFetch } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/get-stores`, token);

    return (
        <React.Fragment>
            <div className="page-content m-5">
                <Breadcrumb default="Stores" title="Store lists" />
                <MetaTag title_sco="store lists" />

                {/* SHOW THE LIST OF ALL STORES */}
                <Container fluid>
                    <div className="page-title-box">
                        <button className="btn btn-success mb-4 text-white" onClick={() => setOpenModal(true)}>+ Add a new store </button>
                        {loading ? <Loading /> : <EachStore allStores={data} reFetch={reFetch} />}
                    </div>
                </Container>
            </div>

            {/* MODAL TO ADD NEW STORE */}
            <ModalComp
                ModalTitle="Add a store"
                open={openModal}
                onClose={() => setOpenModal(false)}
                cancel="close"
                Component={<StoreInputForm onClose={() => setOpenModal(false)} reFetch={reFetch} />}
            />
        </React.Fragment>
    )
}

export default Dashboard