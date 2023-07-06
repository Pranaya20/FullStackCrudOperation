import React,{useState, useEffect} from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import axios from "axios";

import AddEditStyle from "./AddEditStyle.css";

function AddEdit() {
    const navigate = useNavigate();
    const[inputData, setInputData] = useState({name:'',email:'',contact:''});
    console.log("inputData:-",inputData);
    
    const {id} = useParams();

    console.log("id:-",id);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=>setInputData({...resp.data[0]}))
    },[id])

    const onHandleChange = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        setInputData({...inputData,[name]:value})
    }

    const onHandleSubmit = (e) =>{
        e.preventDefault();
        if(!inputData.name || !inputData.email || !inputData.contact){
            toast.error("Please provide value into each input field");
        }else{
            if(!id){
                console.log("I am in 1st loag");
                    axios.post("http://localhost:5000/api/post",{
                    name:inputData.name,
                    email:inputData.email,
                    contact:inputData.contact
                })
                .then(()=>{
                    setInputData({name:'',email:'', contact:''})  
                })
                .catch((error)=>toast.error(error.response.data));
                toast.success("Contact added successfully");
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                    name:inputData.name,
                    email:inputData.email,
                    contact:inputData.contact
                })
                .then(()=>{
                    setInputData({name:'',email:'', contact:''})  
                })
                .catch((error)=>console.log("error:-",error));
                toast.success("Contact updated successfully");
            }
           
            setTimeout(()=>{
                navigate("/");
            },500)
        }

    }
  return (
    <div className='add-client'>
    <h1 id="title">Add Client Details</h1>
            <p id="description">Fill out form and click submit!</p>
       
        <form action="" id="survey-form" onSubmit={(e)=>onHandleSubmit(e)}>
            <label id="name" className="top-label">Name: </label>
            <input id="name" name="name" className="top-input" value={inputData.name || ''} type="text" placeholder="Enter your name" onChange={(e)=>onHandleChange(e)}/>

            <label id="email-label" className="top-label">Email: </label>
            <input id="email" name="email" className="top-input" value={inputData.email || ''} type="email" placeholder="Enter your email" onChange={(e)=>onHandleChange(e)}/>

            <label id="email-label" className="top-label">Contact Number: </label>
            <input id="number" name="contact" className="top-input " value={inputData.contact || ''} type="number" placeholder="Enter your phone number" onChange={(e)=>onHandleChange(e)}/>

            <input type="submit"  className="btn-style submit-btn" value={id?"update":"submit"}/>

            <Link to="/ "><input type='button' value="Go Back" className="btn-style goback-btn"/></Link>
        </form>
     </div>

  )
}

export default AddEdit