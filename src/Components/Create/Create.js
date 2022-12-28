import React, { Fragment ,useState,useContext ,useEffect} from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
import { useHistory } from 'react-router-dom';

const Create = () => {
const {firebase}=useContext(FirebaseContext)
const {user}=useContext(AuthContext)
const history = useHistory()
  const[name,setName]=useState('')
  const[category,setCategory]=useState('')
  const[price,setPrice]=useState('')
  const[image,setImage]=useState('')
  const date= new Date()

  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]= useState(false);
  const errors = {};

  useEffect(()=>{
    console.log(formErrors,"aaaaaabbbbbbb")
    if(Object.keys(formErrors).length ===0 && isSubmit){
      console.log(formErrors)
      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        console.log('qqqqqqqqqqq',ref);
        ref.getDownloadURL().then((url)=>{
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',url);  
          firebase.firestore().collection('products').add({
            name,category,price,url,userId:user.uid,createdAt:date.toDateString( )
          })
            history.push('/') 
        })
  
      })
    }
  },[formErrors])

  const validation =(name,category,price)=>{
    if(!name){
      errors.name= 'username is required';
    }
     if(!category){
      errors.category= 'category is required';
    }
     if(!price){
      errors.price= 'price is required';
    }
    return errors;
  }



  const handleSubmit=()=>{

    setFormErrors( validation(name,category,price))
    setIsSubmit(true)

  
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <p style={{color:"red"}}>{formErrors.name}</p>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
             
              id="fname"
              name="category"
              defaultValue="John"
            />
            <p style={{color:"red"}}>{formErrors.category}</p>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"
            
             value={price}
             onChange={(e)=>setPrice(e.target.value)}
            
             id="fname" name="Price" />
             <p style={{color:"red"}}>{formErrors.price}</p>
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image): ""}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
