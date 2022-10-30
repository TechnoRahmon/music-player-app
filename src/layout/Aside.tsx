import React ,{useContext} from 'react'
import AsideMenuItem from '../components/Aside/AsideMenuItem';
import { IAudioMenuItem } from '../types/IAudioItem';
import {AudioContext}  from '../context/index'

type AsideProps={
  setCurrentActiveItem:(id:string)=>void;
}
export default function Aside({
  setCurrentActiveItem
}:AsideProps) {
  const {audioItems} = useContext(AudioContext);

  const MenuItems: Array<IAudioMenuItem> = audioItems;

  return (
    <div className='aside '>
      <div className='menuItems desktopMenu'>
      <h3 className='aside-title'>Library</h3>
        {MenuItems.length ? MenuItems.map((item: IAudioMenuItem) => {
          return <AsideMenuItem item={item} key={item.id}/>
        }) : ''}
      </div>

      <div className='menuItems mobileMenu'>
        <h3 className='aside-title'>Library</h3>
        {MenuItems.length ? MenuItems.map((item: IAudioMenuItem) => {
          return <AsideMenuItem item={item} key={item.id} />
        }) : ''}
      </div>
    </div>
  )
}
