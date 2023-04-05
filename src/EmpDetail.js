import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmpCreate from './EmpCreate';

function EmpDetail() {
  const { empid } = useParams();

  const [empdata, empdatachange]=useState({})

  useEffect(()=>{
    fetch("http://localhost:3001/employee/"+empid).then((res)=> {
            return res.json();
        }).then((resp)=>{
          empdatachange(resp);
        }).catch((err) => {
            console.log(err);
      });
    }, []);
  
  return (
    <div>
      <div className='card' style={{"textAlign":"left"}}>
        <div className='card-title'>
          <h2>Employee Create</h2>
        </div>
        <div className='card-body'></div>

      </div>
    { empdata &&
      <h2>The employee name is: <strong>{empdata.name}</strong> ({empdata.id})</h2>}
      <h3>Contact Details</h3>
      <h5>Email is : {empdata.email}</h5>
      <h5>Phone is : {empdata.phone}</h5>
      <Link className="btn btn-danger" to="/">Back to listing</Link>


    </div>
  );
}

export default EmpDetail;
