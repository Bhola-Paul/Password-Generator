import { useState, useCallback, useEffect,useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [isnum,setisnum]=useState(false)
  const [ischar,setischar]=useState(false)
  const [pass,settpass]=useState("")

  const passref=useRef(null);
  const passwordgenerator=useCallback(()=>{
    let pass2=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isnum) str+="1234567890"
    if(ischar) str+="!@#$%&*"
    for (let i = 0; i < length; i++) {
      let ch=Math.floor(Math.random()*str.length+1)
      pass2+=str[ch];
    }
    settpass(pass2)
  },[length,isnum,ischar,settpass])
  const copyPasswordToClipboard=useCallback(()=>{
    passref.current?.select()
    passref.current?.setSelectionRange(0,25)
    window.navigator.clipboard.writeText(pass)

  },[pass])
  useEffect(()=>{
    passwordgenerator()
  },[length,isnum,ischar,passwordgenerator])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black-900 bg-blue-700'>
      <h1 className='text-white text-centre my-3 py-4'>Password Generator</h1>
      <div className='className" flex shadow rounded-lg overflow-hidden mb-4" '>
        <input 
          type="text" 
          value={pass}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passref}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-green-400 text-white px-5 py-2 shrink-0'
        >Copy</button>

      </div>
      <div className='flex text-sm gap-x-2 py-16 text-white'>
        <div className='flex items-centre gap-x-1'>
        <input 
        type="range" 
        min={6}
        max={25}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label>Length:{length}</label>
        </div>
        <div className='flex items-centre gap-x-1'>
        <input 
          type='checkbox'
          defaultChecked={isnum}
          id="numinput"
          onChange={()=>{
            setisnum((prev)=>!prev)
          }}
        />
        <label htmlFor="numinput">Numbers</label>
        </div>
        <div className='flex items-centre gap-x-1'>
        <input 
          type='checkbox'
          defaultChecked={ischar}
          id="charinput"
          onChange={()=>{
            setischar((prev)=>!prev)
          }}
        />
        <label htmlFor="charinput">Characters</label>
        </div>
      </div>
      
     </div>
    </>
  )
}

export default App
