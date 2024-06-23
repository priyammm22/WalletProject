export function MainHeading({label}){
          
return <div className="text-center font-bold text-lg">{label}</div>
}
export function SubHeading({label}){
  return   <div className="text-center font-md text-base text-gray-600">
    {label}
  </div>
}
export function InputBox({Css,label, placeholder,OnChange}) {
  let css1=Css?"flex justify-center mt-4":"";
    return <div className={css1}>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input onChange={OnChange} placeholder={placeholder} className={"w-full px-2 py-1 border rounded border-slate-200 "+Css} />
    </div>
}