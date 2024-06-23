import { MainHeading, SubHeading, InputBox } from "../components/Heading";
import { Buttons } from "../components/Buttons";
import { BottomWarning } from "../components/BottomWarning";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Adjust if you're using a different router
import axios from "axios";
function SignUp() {
  let debounce1,debounce2,debounce3,debounce4;
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [success, Setsuccess] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        if (success) {
            navigate('/dashboard');
        } else{
            navigate('/signup');
        }
    }, [success, navigate]);
  return (
    <div className="flex justify-center items-center">
      <div className="w-96 h-auto bg-blue-200 flex justify-center mt-10">
        <div className="w-80 h-auto border border-black rounded-md bg-white px-10 my-10">
          <MainHeading label="Sign-Up"></MainHeading>
          <SubHeading label="Enter your information to create an acount"></SubHeading>
          <InputBox
            OnChange={(e) => {
              // let debounce;
              clearTimeout(debounce1);
              debounce1 = setTimeout(() => {
                setFirstName(e.target.value);
              }, 1000);
            }}
            label="First Name"
            placeholder="john"
          ></InputBox>
          <InputBox
            OnChange={(e) => {
              
              clearTimeout(debounce2);
              debounce2 = setTimeout(() => {
                setlastName(e.target.value);
              }, 1000);
            }}
            label="Last Name"
            placeholder="Pearl"
          ></InputBox>
          <InputBox
            OnChange={(e) => {
              
              clearTimeout(debounce3);
              debounce3 = setTimeout(() => {
                setusername(e.target.value);
              }, 1000);
            }}
            label="Username"
            placeholder="xxxxxxxx@xxxx.xxx"
          ></InputBox>
          <InputBox
            OnChange={(e) => {
              // let debounce4;
              clearTimeout(debounce4);
              debounce4 = setTimeout(() => {
                setpassword(e.target.value);
              }, 1000);
            }}
            label="password"
            placeholder="must contian a-z A-Z 0-9 (@#$%&^)"
          ></InputBox>

          <Buttons
            onPress={async () => {
              try{ const res = await axios.post(
                "http://localhost:3000/api/v1/user/Signup",
                {
                  username,
                  password,
                  firstName,
                  lastName,
                }
              );
               
              if(res.data.success){
                  Setsuccess((s) => res.data.success);
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("name", firstName);
                }else {
                  console.log(res.data.message);
                  throw new Error(res.data.message);
                }
              }catch(e){
                console.log(e);
                  alert(e.message);
                }
            }}
            label={"Sign-Up"}
          />


          <BottomWarning
            label="Already have an account?"
            buttonText="Sign-in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
}
// https://youtu.be/ytAF37274yo?si=KPFWXvUQMDgmHvaP
export { SignUp };
