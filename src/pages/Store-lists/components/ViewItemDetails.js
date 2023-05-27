import useFetch from 'hooks/useFecth';
import React from 'react'

function ViewItemDetails({ itemID }) {

    const token = process.env.REACT_APP_TOKEN

    const { data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/view-item/${itemID}`, token);

    return (
        <div>
            <p> <strong> Item ID : </strong>{data.id}</p>
            <p> <strong> Store ID : </strong>{data.store_id}</p>
            <p> <strong> Item price : </strong> <span> {data.price_1}, Price : </span>  <span> {data.price_2}, </span> <span> Price : {data.price_3}, </span> Price :  <span> {data.price_4} </span></p>
            <p> <strong> Product code  : </strong>{data.product_code}</p>
            <p> <strong> Number of stock : </strong>{data.stock_on_hand}</p>
            <p> <strong> Product description : </strong>{data.product_description}</p>
        </div>
    )
}

export default ViewItemDetails