import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-700 text-white rounded-lg flex justify-evenly py-2'>
      <div className="logo font-extrabold">WELCOME TO TODO LIST</div>
        <ul className='flex'>
            <li className=' mx-3 cursor-pointer'>Home</li>
            <li className=' mx-3 cursor-pointer'>My Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
