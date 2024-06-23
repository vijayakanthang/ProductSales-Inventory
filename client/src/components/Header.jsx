import React from 'react'
import '../Styles/Header.css'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className='nav-bar'>
        <Link to ='/' className='p'><p >Inventory</p></Link>
        <Link to ='/stats' className='p'><p >Statistics</p></Link>
        <Link to ='/additem' className='p'><p >Add Item</p></Link>
      </div>
    </div>
  )
}

export default Header
