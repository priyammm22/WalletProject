import { useEffect, useState } from "react"
import { Buttons } from "./Buttons"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    // Replace with backend call
    let Debounce;
    const [users, setUsers] = useState();
    const [filter,setFilter]  = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        console.log("recher here useeffect");
        console.log(localStorage.getItem('token'));
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data.user);
            } catch (error) {
                alert("Error while getting user from server");
            }
        };

        fetchData();
    }, [filter]); // Empty dependency array ensures this runs only once



    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={
                (e)=>{
                clearTimeout(Debounce);
                Debounce = setTimeout(()=>{
                    setFilter(e.target.value);
                },500)
            }
            } placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users && users.length > 0 ? (
                users.map(user =>  <User key={user._id} user={user} />)
            ) : (
                <div>No users found.</div>
            )}
        </div>
    </>
}

function User({user}) {


    if (user.firstName[0] >= 'a' && user.firstName[0] <= 'z') {
        user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
    }
    return <div className="flex justify-between ">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Buttons label={"Send Money"} to={`/sendmoney/${user._id}`}/>
        </div>
    </div>
}