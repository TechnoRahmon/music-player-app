import React, { useContext } from 'react'
import AudioItem from '../components/Home/AudioItem';
import { AudioContext } from './../context/index'

export default function Home() {
    const { currentActiveItem, goNext, goPrev, showMobileAside } = useContext(AudioContext);

    return (
        <div className='home'>
            {/*begain ::  menu icon for mobile size */}
            <div className="mobile-list-icon">
                <i className="fa-solid fa-list" onClick={showMobileAside}></i>
            </div>
            {/*end ::  menu icon for mobile size */}
            <div className='item-container'>
                {currentActiveItem?.id ?
                    <AudioItem item={currentActiveItem} goNext={goNext} goPrev={goPrev} /> :
                    <div className='home-title-container'>
                        <h2 >Select your music and enjoy &#127926;</h2>
                    </div>
                }
            </div>


        </div>
    )
}
