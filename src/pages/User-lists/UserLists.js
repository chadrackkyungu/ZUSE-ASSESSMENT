import React, { useState } from "react"
import useFetch from '../../hooks/useFecth';
import { Container } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import MetaTag from "../../components/MetaTag";
import ModalComp from '../../Modal';
import UserForm from "./components/UserForm";
import Loading from "components/Loading";
import UserTable from "./components/UserTable";


const UserList = () => {

    const token = process.env.REACT_APP_TOKEN

    const [openModal, setOpenModal] = useState(false);
    const { data, loading, reFetch } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/get-users`, token);


    return (
        <React.Fragment>
            <div className="page-content m-5">
                <Breadcrumb default="Users" title="User Lists" />
                <MetaTag title_sco="User lists" />

                <Container fluid>
                    <div className="page-title-box">
                        <button className="btn btn-success mb-4 text-white" onClick={() => setOpenModal(true)}>+ Add a new user </button>
                        {loading ? <Loading /> : <UserTable userData={data} reFetch={reFetch} />}
                    </div>
                </Container>
            </div>

            <ModalComp
                ModalTitle="Add a new user"
                open={openModal}
                onClose={() => setOpenModal(false)}
                cancel="close"
                Component={<UserForm onClose={() => setOpenModal(false)} reFetch={reFetch} pending={loading} />}
            />
        </React.Fragment>
    )
}

export default UserList