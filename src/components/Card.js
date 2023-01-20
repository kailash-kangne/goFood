import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart()

    const priceRef = useRef();

    let data = useCart()
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async()=>{

        await dispatch( {
                        type: "ADD",
                        id : props.foodItem.id,
                        name: props.foodItem.name,
                        price : finalPrice,
                        qty: qty,
                        size: size

        } )
        console.log(data)
    }

    let finalPrice = qty * parseInt(options[size])

    useEffect(() =>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            {/* <div className="card mt-3"> */}
                <img src={props.foodItem.img} className="card-img-top" style={{height:"160px", objectfit:"fill"}} alt="..." />
                {/* <img src={props.imgSrc} className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text"> This is some important text</p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        <div className='d-inline h-100 fs-5'>
                            Rs. {finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}> Add to Cart </button>
                </div>
            </div>
        </div>
    )
}
