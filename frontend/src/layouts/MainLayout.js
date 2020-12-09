import React, {useState} from 'react'
import Header from '../components/Header';
import icon from '../assets/icon.png'
const MainLayout = ({children}) => {
  const [headerState, setHeaderState] = useState(false)
  return (
    <div className="main-layout" style={{gridTemplateColumns: `${headerState ? '42px' : '240px'} 1fr`}}>
      <div onClick={()=>setHeaderState(!headerState)} style={{display: headerState ? 'none' : 'block'}}>
        <Header headerState={headerState} setHeaderState={setHeaderState} />
      </div>
      <div className="bg-white shadow-lg" style={{display: headerState ? 'block' : 'none'}}>
        <img className="w-100 p-2" src={icon} alt=""/>
        <button onClick={()=>setHeaderState(!headerState)} className='btn btn-light border my-4'>
          {'>'}
        </button>
      </div>
      <div className="m-2">
        {children}
      </div>
    </div>
 )
}

export default MainLayout
