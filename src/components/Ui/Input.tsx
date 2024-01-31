import{InputHTMLAttributes} from 'react'
interface Iprops extends InputHTMLAttributes<HTMLInputElement> {


}

const Input = ({...rest} : Iprops)=> {
  return (
    
   
    <input type="text" name="" id="" className="border-[1px] border-gray-300 
    focus:before:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
    rounded-md px-3 py-3 text-md shadow-md h-9" {...rest}/>
  )
  
}

export default Input