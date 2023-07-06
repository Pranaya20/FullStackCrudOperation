import React,{useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import viewstyle from "./viewstyle.css";

function View() {
    const {id} = useParams();
    const[inputData, setInputData] = useState({name:'',email:'',contact:''});
    console.log("inputData:-",inputData);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=>setInputData({...resp.data[0]}))
    },[id])


  return (
   <div className='client-detail'>
       <div className='header-data'>User Contact Detail</div>
       <div className='contacts-div'>
            <div className='contact-items'>
                <h3>id:</h3>
                {id}
            </div>    
            <div className='contact-items'>
                <h3>name:</h3>
                {inputData.name}
            </div>  
            <div className='contact-items'>
                <h3>email:</h3>
                {inputData.email}
            </div>    
            <div className='contact-items'>
                <h3>contact:</h3>
                {inputData.contact}
            </div>    
       </div>
       
    
   </div>
  )
}

export default View