import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {toast} from "react-toastify";
import home from './home.css';
import axios from "axios";

function Home() {
  const [data,setData] = useState([]); 
  console.log("data:-",data);

  const loadData =async() =>{
    const response =await axios.get("http://localhost:5000/api/get").then((response) => {
        setData(response.data);
      });
  }

  useEffect(()=>{
    loadData();
  },[]);

  const deleteContact = (id) =>{
    if(window.confirm("Are you sure that you wnted to delete that contact ?")){
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact Deleted successfully");
      setTimeout(()=>loadData(),500);
    }
  }

  return (
    <div className='main-container'>
      
        <div class="container">
 <h1>Client Details</h1>
  <Link to="/addcontact"><button className='btn btn-contact'>Add Contact</button></Link>
  <table class="rwd-table">
    <tbody>
      <tr>
        <th>Sl No.</th>
        <th>Name</th>
        <th>email</th>
        <th>Contact</th>
        <th>Action</th>
      </tr>
       {data.map((item, index)=>{
                return(
                   <tr key={item.id}>
                      <td  className='table-row'>{index+1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>
                        <Link to={`/updatecontact/${item.id}`}>
                          <button className='btn btn-edit'>Edit</button>
                        </Link>
                       
                          <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Dlete</button>
                        
                        <Link to={`/viewcontact/${item.id}`}>
                           <button className='btn btn-view'>View</button>
                         </Link>
                      </td>
                   </tr>
                )
              })} 
      
    </tbody>
  </table>

    </div>
    </div>
  )
}

export default Home;