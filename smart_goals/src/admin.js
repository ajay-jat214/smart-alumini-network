import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import DeleteUsers from './components/deleteUsers';

function Admin(props){
  const [email,setEmail]=useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [password,setPassword]=useState('');
  const [field,setField]=useState('');
  const [phone,setPhone]=useState('');
  const [company,setCompany]=useState('');
  const [placementYear,setPlacementYear]=useState('');
  const [userName,setUserName]=useState('');
  const [show,setShow]=useState(false);

  const onButtonSubmit=(event)=>{
    event.preventDefault();
   
    fetch('https://git.heroku.com/smart-network/admin',{
      method:'post',
      headers: { Authentication: 'Content-Type:application/json' },
      body:JSON.stringify({
              email:email,
              password:password,
              firstName:firstName,
              lastName:lastName,
              userName:userName,
              phone:phone,
              field:field,
              company:company,
              placementYear:placementYear
              })
    })
    .then(response=>response.json())
    .then(user=>{
      alert(user);
      localStorage.setItem('routes','unsuccess');
   
    })
    
  }
  const call=(e)=>{
    e.preventDefault();
    setShow(!show);
  }
 return(
  <form>
  <div className="flex wrap">
  <Button variant="outlined" color="primary" style={{margin:'8px',position:'relative',top:'8px'}} onClick={props.logout}>
    LogOut
  </Button>
  <div>{
  show
  ?
  <Button variant="outlined" color="primary" style={{margin:'8px',position:'relative',top:'8px'}} onClick={call}>
    Add Users
  </Button>
  :
  <Button variant="outlined" color="secondary" style={{margin:'8px',position:'relative',top:'8px'}} onClick={call}>
    Delete Users
  </Button>
  }</div>
  </div>
   <div>{
    show
    ?
    <DeleteUsers />
    :
   <article className="vh-70 br2 ba dark-gray tc b--black-10 mv8 w-90 mt4 mw6 center shadow-5">
    <main className="pa4 black-80">
    <div className="white measure center">
      <fieldset id="sign_up" className="ba b--transparent shadow5">
          <legend  className="f4 fw6 ph0 mh0 black">Add Alumini</legend>
          <div className="mt3">
          <label className="db fw6 lh-copy f6 black" htmlFor="email-address">Email</label>
          <input 
          className="pa2 black input-reset ba bg-white black hover-bg-black hover-white w-100" 
          type="email" 
          name="email-address"  
          id="email-address"
          onChange={(event)=>setEmail(event.target.value)}
          />
        </div>
     
        <div className="mt3">
          <label className="db fw6 lh-copy f6 black" htmlFor="email-address">FirstName</label>
          <input 
          className="black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="text" 
          name="firstname"  
          id="firstname"
          onChange={(event)=>setFirstName(event.target.value)}
          />
        </div>
        <div className="mt3">
          <label className="db fw6 lh-copy f6 black" htmlFor="email-address">LastName</label>
          <input 
          className="black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="text" 
          name="lastname"  
          id="lastname"
          onChange={(event)=>setLastName(event.target.value)}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 black" htmlFor="password">Password</label>
          <input 
          className="b black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="password" 
          name="password"  
          id="password" 
          onChange={(event)=>setPlacementYear(event.target.value)}onChange={(event)=>setPassword(event.target.value)}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 black" htmlFor="userName">UserName</label>
          <input 
          className="b black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="userName" 
          name="userName"  
          id="userName" 
          onChange={(event)=>setUserName(event.target.value)}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 black" htmlFor="field">Field</label>
          <input 
          className="b black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="field" 
          name="field"  
          id="field" 
          onChange={(event)=>setField(event.target.value)}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 black" htmlFor="company">Company</label>
          <input 
          className="b black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="company" 
          name="company"  
          id="company" 
          onChange={(event)=>setCompany(event.target.value)}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 black" htmlFor="phone">Phone</label>
          <input 
          className="b black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="phone" 
          name="phone"  
          id="phone"
          onChange={(event)=>setPhone(event.target.value)} 
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 black" htmlFor="placedYear">Placement Year </label>
          <input 
          className="b black pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
          type="placedYear" 
          name="placedYear"  
          id="placedYear" 
          onChange={(event)=>setPlacementYear(event.target.value)}
          />
        </div>
      </fieldset>
  
      <div className="lh-copy mt3">
          <input 
          onClick={onButtonSubmit}
          className="black b ph3 pv2 input-reset ba b--black bg-white grow f6 dib pointer" 
          type="submit" 
          value="Submit" 
          />
      </div>
    </div>
  </main>
  </article>
  }</div>
  </form>  
 );
}

export default Admin;