"use client"
import styles from '@/app/page.module.css'
import { CheckToken } from '@/Context/UserContext';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';


export default function login() {
  const [Info,setInfo]=useState({
    email:"",
    password:""
  })
  
  const [Message,setMessage]=useState("")
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setMessage("you logd in already")
    }
  },[]);


  const [Disable,setDisable]=useState(false)
  function handle(e){
    setInfo({...Info,[e.target.name]:e.target.value});
  };

  async function submit(e){
    e.preventDefault();
    setDisable(true)
     try{
     let res= await axios.post("https://devstyle-u119.onrender.com/api/User/login",Info);
     
     const token=res.data.token;
     window.localStorage.Token;
     localStorage.Token=token;
     setMessage("Loged in successfully")
     } 
    catch(err){
      if (err.response.data.message) {
        setMessage(err.response.data.message)
      }else{
        setMessage(err.response.data.error.message)
      }
     console.log(err)
    }
    finally{
      setDisable(false)
    }
    }
    const {Login,setLogin,setDisplayUser}=CheckToken()
    const User=useRef()
    useEffect(()=>{
      User.current.style.display=`${Login}`
    },)

    function tosingin() {
      setLogin("none")
      setDisplayUser("flex")
    }
    
  return (
    <div className={styles.User} ref={User}>
      <div className={styles.login}>
            <svg className={styles.circels} width="281" height="454" viewBox="0 0 281 454" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M97.0975 160.767C223.513 120.41 136.25 -203.431 66.7015 -288.666C-2.84653 -373.901 -101.997 -310.876 -154.758 -147.895C-207.519 15.085 -172.449 164.896 -112.887 254.461C-53.3257 344.027 -29.3183 201.125 97.0975 160.767Z" fill="#FFD9D9"/>
                <path d="M-745.108 -166.298C-1050.86 -98.3985 -605.259 143.312 -365.402 194.113C-125.545 244.915 93.3395 165.918 123.491 17.6691C153.642 -130.58 -16.3585 -291.941 -256.215 -342.743C-496.072 -393.544 -439.359 -234.198 -745.108 -166.298Z" fill="#FF4D4D"/>
            </svg>
            <svg onClick={()=> setLogin("none")}  className={styles.close} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FF4D4D">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
            </svg>
            <div className={styles.containerslogin}>
            <div className={styles.welcomeAndname}>
                <p className={styles.welcome}>Welcome to</p>
                <h1 className={styles.name}>EleganceEdge</h1>
            </div>
            <form action="" className={styles.inputs}>
                <input type="email" placeholder='email' className={styles.input} value={Info.email} onChange={handle} name='email'/>
                <input type="password" placeholder='password' className={styles.input}  value={Info.password} onChange={handle} name='password'/>
                {Message && <p style={{color:Message!="Loged in successfully" && Message!="you logd in already"?"red":"green"}}>{Message}</p>}
                <input type="submit" disabled={Disable} className={styles.send} onClick={submit}/>

            </form>

            <p className={styles.tosignin}>Dont have an account?<span onClick={tosingin} className={styles.loginpage}>Sign up</span></p>
        </div>

      </div>
    </div>
  )
}
