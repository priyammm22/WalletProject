import { InputBox,MainHeading,SubHeading } from "../components/Heading";
import { Buttons } from "../components/Buttons";
import { BottomWarning } from "../components/BottomWarning";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function Signin(){
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [success, Setsuccess] = useState(false);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
      if (success) {
          navigate('/dashboard');
      } else{
          navigate('/signin');
      }
  }, [success, navigate]);

    return (
        <div className="flex justify-center items-center">
        <div className="w-96 h-auto bg-blue-200 flex justify-center mt-10">
          <div className="w-80 h-auto border border-black rounded-md bg-white px-10 my-10">
            <MainHeading  label="Sign-in"></MainHeading>
            <SubHeading label="Enter your Register Email & password"></SubHeading>
            <InputBox OnChange={(e)=>{
              setusername(e.target.value)
            }} label="Username" placeholder="xxxxxxxx@xxxx.xxx"></InputBox>
            <InputBox OnChange={(e)=>{
              setpassword(e.target.value);
            }}
              label="password"
              placeholder="Password"
            ></InputBox>
           
             <Buttons  onPress={
             async ()=>{
           try{   
                const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
                  username,
                  password
                })
                // console.log(res);
                if(res.data.success){
                  Setsuccess(res.data.success);
                  localStorage.setItem("token",res.data.token);
                  localStorage.setItem("name",res.data.name);
                }else{
                  console.log(res.data.message);
                  throw new Error(res.data.message);
                }
              }
                catch(e){
                  // console.log(e);
                  alert(e.data?.message || e.message);
                }
                // console.log(success);
         
                
              }
             } label={"Sign-in"}/>
             
             <BottomWarning label="Don't  have an account?" buttonText="Sign-up" to="/signup" />
            </div>
          </div>
        </div>
    )
}