import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import icon from '../assets/icon.png'
const MainLayout = ({history, children}) => {
  const [headerState, setHeaderState] = useState(false)

  useEffect(()=> {
    setHeaderState(!headerState)
  }, [])

  return (
    <div className="main-layout">
      <div className={`m-header ${!headerState && 'm-header-active'}`} onClick={()=>setHeaderState(headerState)}>
        <Header headerState={headerState} setHeaderState={setHeaderState} />
      </div>
      <div onClick={()=> setHeaderState(!headerState)} className="m-header-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z"/></svg>
      </div>
      <div className="m-2">
        {children}
      </div>
    </div>
 )
}

export default MainLayout
