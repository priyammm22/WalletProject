import {Link} from "react-router-dom"

export function BottomWarning({label,buttonText,to}){
    return <div className="py-2 text-sm justify-center">
        <div className="inline">{label}</div>
        <Link className="pointer underline pl-1 cursor-pointer text-blue-600" to={to}>
            {buttonText}
        </Link>
    </div> 
}
