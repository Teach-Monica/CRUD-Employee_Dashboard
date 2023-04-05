import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';


function EmpEdit() {

  const { empid } = useParams();

  useEffect(()=>{
    fetch("http://localhost:3001/employee/"+empid).then((res)=> {
            return res.json();
        }).then((resp)=>{
          idchange(resp.id);
          namechange(resp.name);
          emailchange(resp.email);
          phonechange(resp.phone);
          activechange(resp.active);
        }).catch((err) => {
            console.log(err);
      });
    }, []);

    const[id, idchange] = useState("");
    const[name, namechange] = useState("");
    const[email, emailchange] = useState("");
    const[phone, phonechange] = useState("");
    const[active, activechange] = useState(true);
    const[validate, valchange] = useState(false);
  
  
    const navigate=useNavigate();
  
    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,name,email,phone,active};
      
      fetch("http://localhost:3001/employee/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('saved successfully.')
        navigate("/")
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  return (
    <div>

      <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
          <form className='container' onSubmit={handlesubmit}>
            <div className='card' style={{"textAlign":"left"}}>
            <div className='card-title'>
              <h2>Employee Edit</h2>
            </div>
            <div className='card-body'>
              <div className='row'>

                <div className='col-lg-12'>
                  <div className='form-group'>
                    <lable>ID</lable>
                    <input value={id} disabled="disabled" className='form-control'></input>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='form-group'>
                    <lable>Name</lable>
                    <input required value={name} onMouseDown={(event)=>valchange(true)} onChange={(event)=>namechange(event.target.value)} className='form-control'></input>
                  {name.length==0 && validate && <span className='text-danger'>Please Enter your Name</span>}
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='form-group'>
                    <lable>Email</lable>
                    <input value={email} onChange={(event)=>emailchange(event.target.value)}  className='form-control'></input>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='form-group'>
                    <lable>Phone</lable>
                    <input value={phone} onChange={(event)=>phonechange(event.target.value)} className='form-control'></input>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='form-check'>
                  <input checked={active} onChange={(event)=>activechange(event.target.checked)} type="checkbox" className='form-check-input'></input>
                    <lable className="form-check-label">Is Active</lable>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='form-group'>
                    <button type="submit" className='btn btn-success'>Save</button>
                    <Link to="/" className="btn btn-danger">Back</Link>
                  </div>
                </div>

              </div>
            </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EmpEdit;
