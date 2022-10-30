import React, { useContext, useEffect, useState } from 'react'
import AudioItem from '../components/Home/AudioItem';
import { IAudioItem } from '../types/IAudioItem';
import { AudioContext } from './../context/index'

export default function Home() {
    const { currentActiveItem, goNext, goPrev } = useContext(AudioContext);

    useEffect(() => {

    }, [currentActiveItem]);

    return (
        <div className='home'>
            <div className='item-container'>
                {currentActiveItem?.id ?
                    <AudioItem item={currentActiveItem} goNext={goNext} goPrev={goPrev} /> :
                    ''}
            </div>


        </div>
    )
}
