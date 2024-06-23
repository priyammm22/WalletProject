import { Link } from 'react-router-dom';

export function Buttons({ Css, onPress,label,to}) {
  let css = Css || "bg-black w-full h-9 rounded-lg text-white font-bold mt-2";
  let css2 = (Css)?"":"block w-60";
  // console.log(to);
  return (
    <div className={"flex justify-center"}>
     <Link to={to} className={css2}>
        <button onClick={onPress} className={css}>
          {label}
        </button>
      </Link>
    </div>
  );
}



