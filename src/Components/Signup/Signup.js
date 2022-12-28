import React, {useState, useContext,useEffect} from 'react';
import {FirebaseContext} from '../../store/Context'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function  Signup() {
  const history=useHistory()
  const [username,setusername] = useState('')
  const [email,setemail] = useState('')
  const [phone,setphone] = useState('')
  const [password,setpassword] = useState('')
  const {firebase}=useContext(FirebaseContext)


    const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]= useState(false);
  const errors = {};

  useEffect(()=>{
   
    if(Object.keys(formErrors).length ===0 && isSubmit){
      console.log(formErrors)
      firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
        console.log('eenter to firestore',result)
        result.user.updateProfile({displayName:username}).then(()=>{
          console.log('update firestore')
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
            
            history.push('/login')
          })
        })
      })
    }
  },[formErrors])

  const validate=(username,email,phone,password)=>{
    
    const regexUsername = /^[A-Za-z][A-Za-z0-9_ ]{4,12}$/i; 
    const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!username){
      errors.username= 'username is required';
       }else if(!regexUsername.test(username)){
         errors.username="Username is not valid"
    }
    if(!email){
      errors.email="email is required"

    }else if(!regexMail.test(email)){
      errors.email="Not a valid email format"
    }
    if(!phone){
      errors.phone="phone number is required"
    }else if(phone.length!==10){
      errors.phone="Phone number must be 10 digit"
    }
    if(!password){
      errors.password="password is required"
    }else if(password.length<4){
      errors.password="Password must be more than 4 characters"
    }else if(password.length>10){
      errors.password="Password should not exceed 10 characters"
    }
    return errors
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setFormErrors(validate(username,email,phone,password));
    setIsSubmit(true);
    
  
console.log(username)
console.log(firebase)
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
        {/* {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>} */}
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <p style={{color:"red"}}>{formErrors.username}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            on
            id="fname"
            name="email"
            defaultValue="John"
          />
            <p style={{color:"red"}}>{formErrors.email}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
            <p style={{color:"red"}}>{formErrors.phone}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
           <p style={{color:"red"}}>{formErrors.password}</p>
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a onClick={()=>{history.push('/login')}} >Login</a>
      </div>
    </div>
  );
}
