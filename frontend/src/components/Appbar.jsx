export function Appbar({firstName}){

    if (firstName[0] >= 'a' && firstName[0] <= 'z') {
        firstName = firstName[0].toUpperCase() + firstName.slice(1);
    }

    return (
        // <div className="flex justify-between h-12 w-full bg-cyan-200 rounded-lg  drop-shadow-md hover:drop-shadow-xl" >
        //     <div className="p-1 mt-1 pl-2 text-lg">PayTM App</div>
        //     <div className="flex justify-center gap-2 items-center mt-1 h-10 w-20 mr-2">
        //         <div className=" text-lg">Hello,Priyam</div>
        //         <div className="h-4/5 w-4/5 m-auto font-medium text-2xl flex justify-center items-center rounded-full bg-orange-200">P</div>
        //     </div>
        // </div>
        <div class="flex justify-between h-12 w-full bg-cyan-200 rounded-lg shadow-md hover:shadow-xl">
    <div class="p-2 mt-2 pl-3 text-lg">PayTM App</div>
    <div class="flex justify-center items-center  mr-3">
        <div class="text-lg">Hello,{firstName}</div>
        <div class="h-10 w-10 ml-2 font-medium text-2xl flex justify-center items-center rounded-full bg-orange-200">{firstName[0]}</div>
    </div>
</div>

    )
}