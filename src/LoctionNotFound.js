import React from 'react';
import { FaFaceGrimace } from "react-icons/fa6";

const LoctionNotFound = () => {
    return (
        <div className='locationNotFound'> 
        <div className='location'>
        <h1><FaFaceGrimace /></h1>
             <h1>location not found</h1>
        </div>
        </div>
    )
}

export default LoctionNotFound
