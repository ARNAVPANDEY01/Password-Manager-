import React from 'react'

const Navbar = () => {
  return (
    <nav className = 'bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-6 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className = 'text-green-500'> &lt;</span>
          <span>Pass</span><span className = 'text-green-500'>OP/&gt;</span>
          
        </div>
        
        {/* <ul>
          <li className='flex gap-4'>
              <a className='hover:font-bold' href='#'>Home</a>
              <a className='hover:font-bold' href='#'>About</a>
              <a className='hover:font-bold' href='#'>Contact</a>
          </li>
        </ul> */}
        {/* <button className='dbg-green-600 my-5 rounded-full flex justify-between item-center'> 
          <img  className='invert w-10 p-1' src="/icons/download.png" alt="github logo" />
          <span className='font-bold px-2 justify-between item-center' >GitHub</span>
        </button> */}

        <button className='bg-green-500 rounded-full  my-5 text-white flex justify-between items-center' >
          <img className='invert w-10 p-1'  src="/icons/github.png" alt="github logo" />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>
    </nav>
      
   
  )
}

export default Navbar
