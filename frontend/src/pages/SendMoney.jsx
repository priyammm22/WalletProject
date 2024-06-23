import { InputBox } from "../components/Heading"
import { MainHeading } from "../components/Heading"
import {useState} from 'react'
import { Buttons } from "../components/Buttons";
import { useParams } from "react-router-dom";
import axios from "axios";


 export function SendMoney(){
    const [amount,setamount]  =  useState();

   let {userId}  = useParams();
    let debounce1;
function onChangeHandler(e){

    clearTimeout(debounce1);
     debounce1=setTimeout(()=>{
     setamount(e.target.value)
    },500)
}
async function onClickHandler() {
    try {
      let token = `Bearer ${localStorage.getItem('token')}`;
      console.log(token);
      let amount2 = parseInt(amount);
  
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: userId,
          amount: amount2
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
  
      if (res.data.success) {
        alert(`${amount} is successfully transferred`);
      } else {
        throw new Error("Transfer failed");
      }
    } catch (e) {
      console.error("Error:", e);
      alert(`Error: ${e.response?.data?.message || e.message}`);
    }
  }


return <div className="bg-yellow-400 w-full min-h-screen flex justify-center items-start">
    <div className="bg-green-300 w-72 h-40 rounded-xl pt-4 mt-44">
        <MainHeading label={"Send Money"}/>
        <InputBox Css={"w-52"} placeholder={"Enter amount"} OnChange={onChangeHandler}></InputBox>
        <Buttons Css={"bg-green-700 w-32 h-9 rounded-lg text-white font-bold mt-4 mb-4"} label={"Confirm"} onPress={onClickHandler} ></Buttons>
    </div>
</div>


}
