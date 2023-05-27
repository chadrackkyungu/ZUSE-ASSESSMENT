import React from 'react'
import useFetch from 'hooks/useFecth';
import Loading from 'components/Loading';
import user_img from "../../../assets/images/users/user-4.jpg"

function ViewUserDetails({ userID }) {

    const token = process.env.REACT_APP_TOKEN
    const { data, loading } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/view-user/${userID}`, token);

    if (loading) return <Loading />

    return (
        <div className="profile-container">
            <div className="profile-image">
                <img src={user_img} alt="Profile Picture" />
            </div>
            <div className="profile-info">
                <p className="profile-bio">User ID : {data?.id} </p>
                <h2 className="profile-name">User name : {data?.username}</h2>
                <ul className="profile-details">
                    <li><strong>Email:</strong> {data?.email}</li>
                    <li><strong>Role:</strong> {data?.role}</li>
                </ul>
            </div>
        </div>
    )
}

export default ViewUserDetails