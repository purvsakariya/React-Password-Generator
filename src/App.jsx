import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [num, setnum] = useState(false)
  const [char, setchar] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenretor = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str += "1234567890"
    if(char) str += "!@#$%^&*(){}[]`"
    console.log(str)
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      setpassword(pass)
    }
  },[length,num,char,setpassword])

  const passwordCopy = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenretor()
  },[length,num,char,passwordGenretor])

  return (
    <div className='flex justify-center text-white align-middle flex-col m-10 gap-2 bg-gray-700 p-5'> 
      <div className='flex justify-center'>
        <input 
          value={password} 
          className=' outline-none border-none px-2 w-100' 
          type="text" 
          placeholder='Password' 
          ref={passwordRef}
          readOnly/>
        <button 
          className='bg-blue-700 rounded-2xl px-2 py-1.5 shrink-0'
          onClick={passwordCopy}
        >Copy</button>
      </div>
      <div className='flex justify-center gap-3'>
        <input 
          type="range" 
          name="lenthg" 
          min={6} 
          max={100} 
          value={length} 
          className=' cursor-pointer' 
          onChange={(e)=>{setlength(e.target.value)}}/>
        <legend>Lenthg: {length}</legend>
        <input 
          type="checkbox" 
          id='inputNum' 
          name="number" 
          defaultChecked={num} 
          onChange={()=>setnum((pre) => !pre)}/>
        <legend htmlFor="inputNum">Number</legend>
        <input 
          type="checkbox" 
          id='inputChar' 
          name="character"
          defaultChecked={char} 
          onChange={()=>setchar((pre) => !pre)}/>  
        <legend 
          htmlFor="inputChar">Character
        </legend>
      </div>
    </div>
  )
}

export default App
