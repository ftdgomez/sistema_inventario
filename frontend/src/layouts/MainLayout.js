import React from 'react'
import Header from '../components/Header';

const MainLayout = ({children}) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="m-2">
        {children}
      </div>
    </div>
 )
}

export default MainLayout
