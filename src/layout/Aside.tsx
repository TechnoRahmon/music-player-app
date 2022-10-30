import React, { useContext } from 'react'
import AsideMenuItem from '../components/Aside/AsideMenuItem';
import { IAudioMenuItem } from '../types/IAudioItem';
import { AudioContext } from '../context/index'

export default function Aside() {
  const { audioItems, isAsideShown, showMobileAside } = useContext(AudioContext);

  const MenuItems: Array<IAudioMenuItem> = audioItems;

  return (
    <div className='aside '>
      {/* begain :: desktop aside */}
      <div className='menuItems desktopMenu'>
        <h3 className='aside-title'>Library</h3>
        {MenuItems.length ? MenuItems.map((item: IAudioMenuItem) => {
          return <AsideMenuItem item={item} key={item.id} />
        }) : ''}
      </div>
      {/* end :: desktop aside */}
      {/* begain :: mobile aside */}
      <div className={`menuItems mobileMenu ${isAsideShown ? 'show' : ''}`}>
        <div className='mobile-header'>
          <h3 className='aside-title'>Library</h3>
          <i className="fa-solid fa-chevron-down" onClick={showMobileAside}></i>
        </div>

        {MenuItems.length ? MenuItems.map((item: IAudioMenuItem) => {
          return <AsideMenuItem item={item} key={item.id} />
        }) : ''}
      </div>
      {/* end :: mobile aside */}
    </div>
  )
}
