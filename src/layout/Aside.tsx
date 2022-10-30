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
        {MenuItems.length ? MenuItems.map((item: IAudioMenuItem) => {
          return <AsideMenuItem item={item} />
        }) : ''}
      </div>

      <div className='menuItems mobileMenu'>
        {MenuItems.length ? MenuItems.map((item: IAudioMenuItem) => {
          return <AsideMenuItem item={item} />
        }) : ''}
      </div>
    </div>
  )
}
