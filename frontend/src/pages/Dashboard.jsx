import { useEffect,useState } from "react";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";
import { Buttons } from "../components/Buttons";
export function Dashboard(){
    const [balance,setbalance] = useState();
    useEffect(()=>{
        const getbalance = async()=>{
           try{
            let token  = `Bearer ${localStorage.getItem('token')}`;
            const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers: {
                    Authorization:token
                }
              });
            if(res.data.success){
                // console.log(res.data.balance);
                setbalance(res.data.balance);
            }else{
                throw new Error(res.data.message);
            }
        }
         catch(e){
                alert("error while fetching balance"+e);
            }

        }
        getbalance();
    }
    ,[balance]);

    function onClickHandler() {
        localStorage.clear();
    }
    return (
        <div>
            <Appbar firstName={localStorage.getItem('name')}></Appbar>
            <Balance amount={balance}></Balance>
            <Users></Users>
            <Buttons  onPress={onClickHandler} label={"LogOut"} to={"/signin"}/> 
        </div>
    )
}