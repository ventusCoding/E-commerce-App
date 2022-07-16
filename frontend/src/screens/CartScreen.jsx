import React from 'react'
import { useParams } from 'react-router-dom'

const CartScreen = () => {

    const params = useParams();

    console.log(params);
  return (
    <div>CartScreen</div>
  )
}

export default CartScreen