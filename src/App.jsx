import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App(){
  const [length , setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, steCharAllow] = useState(false) 
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  let str = "ABCDEFGHIJKLMNOPfdrsfgrwaerftweqfcasdfcaweqabcdefghijklmnop";  
  let characher = "{}@#$%^&*()~!][/";
  let number = '123456789';
  
    const passwordGenerator = useCallback(()=>{
      let pass = ''
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
      if(numberAllow) str += number
      if(charAllow) str += characher
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length +1)
        pass += str.charAt(char)
      }
      setPassword(pass)
    }, [length, numberAllow, charAllow, setPassword])

    const copyPasswordToClipboard = useCallback(()=>{
      passwordRef.current.select()
      passwordRef.current.setSelectionRange(0,101)
      window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(()=>{
      passwordGenerator()
    },[numberAllow, charAllow, length,passwordGenerator ])

  return (  
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0
        '>Copy</button>
       </div>
        <div className='flex text-sm gap-x-2' >
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            className='cursor-pointer'
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}  
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {numberAllow}
            id='numberInput'
            className='cursor-pointer'
            onChange={()=>{
              setNumberAllow((prev)=> !prev)
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked = {charAllow}
            id='charInput'
            className='cursor-pointer'
            onChange={()=>{
              steCharAllow((prev)=> !prev)
            }}
            />
            <label htmlFor='charInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
