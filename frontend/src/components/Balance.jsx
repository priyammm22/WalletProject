export function Balance({amount}){
    return <div className=" mt-2 bg-cyan-200 h-12 w-full flex justify-start items-center rounded-xl drop-shadow-md hover:drop-shadow-xl">

    <h1 className="font-semibold ml-2">Your balance  Rs</h1> 
    <h1 className="font-bold ml-2 text-green-600">{amount}</h1>
   

    </div>
}