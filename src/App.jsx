import { useState, useCallback,useEffect ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


  //================  function app  =========================
function App() {
  
   //================  variables declaration  =========================

  const [length , setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState (false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // ref hoot 

  const passwordRef = useRef(null)



  //=================   callback function   ========================
  const passwordGenerator = useCallback(() =>{

let pass=""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if(numberAllowed) str += "0123456789"

if(charAllowed) str += "!@#$%^&*()~"

for(let i = 1; i<=length; i++){
  let char = Math.floor(Math.random()* str.length +1)
 
 
  pass += str.charAt(char)
  
}


  setPassword(pass)


  }
  ,[length,numberAllowed,charAllowed, setPassword])

//=======================   use Effect function    =====================================================

 const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  
  window.navigator.clipboard.writeText(password)

 }, 
[password])


// use effect function

useEffect(()=>{

passwordGenerator()

}, [length,numberAllowed,charAllowed,passwordGenerator])



// _______________------------------------------ returning to app main.jsx

  return (
    <>


  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>password generator
  
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>

    <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password'
    readOnly  ref={passwordRef}/>
    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
 </div>
    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>


    {/* length value input   */}

      <input type="range"  onChange={(e) => {setLength(e.target.value)}} min={6} max={100} value={length} className='cursor-pointer'/>
      <label>length :{length}</label>
    </div>
     <div className='flex items-cneter gap-x-1'>

{/* checkbox input   */}


    <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {
      setNumberAllowed((prev) => !prev);
    }} />
    <label htmlFor="numberINput" >Number</label>


    {/* char input   */}

    <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={() => {
      setCharAllowed((prev) => !prev);
    }} />
    <label htmlFor="numberINput" >characters</label>


     </div>
    </div>
    
    </div>
    </>
  )
}

export default App
