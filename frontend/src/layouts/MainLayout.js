import React, {useState} from 'react'
import Header from '../components/Header';
import icon from '../assets/icon.png'
const MainLayout = ({children}) => {
  const [headerState, setHeaderState] = useState(false)

  return (
    <div className="main-layout">
      <div onClick={()=>setHeaderState(!headerState)}>
        <Header />
      </div>
      <div className="m-2">
        {children}
      </div>
    </div>
 )
}

export default MainLayout
