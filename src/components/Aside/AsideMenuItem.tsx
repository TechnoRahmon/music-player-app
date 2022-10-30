import React, { useContext } from 'react'
import { IAudioMenuItem } from '../../types/IAudioItem'
import { AudioContext } from './../../context/index'

type AsideMenuItemProps = {
    item: IAudioMenuItem
}
export default function AsideMenuItem({
    item
}: AsideMenuItemProps) {

    const { artist, cover, name, active, id } = item;

    // active className
    const isActive = active ? 'active' : '';
    // set active item from context
    const { setActiveItem, showMobileAside, isAsideShown } = useContext(AudioContext);

    // on menu item click 
    const onMenuItemClick = () => {
        setActiveItem(id);
        // check if mobile Aside is shown
        // then toggle it
        if (isAsideShown)
            showMobileAside();
    }

    return (
        /*begain :: Aside Menu Item  */
        <div className={`menu-item ${isActive}`} onClick={onMenuItemClick}>
            {/* begain :: Aside Menu Item image  */}
            <div className='menu-item-image-container'>
                <img src={cover} alt={name} />
            </div>
            {/* end :: Aside Menu Item image  */}

            {/* begain :: Aside Menu Item info  */}
            <div className='menu-item-info'>
                <span className='name'>{name}</span>
                <span className='artist'>{artist}</span>
            </div>
            {/* end  :: Aside Menu Item info  */}
        </div>
        /* end :: Aside Menu Item  */
    )
}
