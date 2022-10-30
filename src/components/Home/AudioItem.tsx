import React, { useEffect, useState } from 'react'
import { IAudioItem } from '../../types/IAudioItem'

type AudioItemProps = {
    item: IAudioItem,
    goNext: () => void,
    goPrev: () => void,
}
export default function AudioItem({
    goNext,
    goPrev,
    item
}: AudioItemProps) {
    const { artist, cover, name, id, audio } = item;
    const [audioObj, setAudioObj] = useState<typeof Audio | any>(new Audio(audio));
    const [Play, setPlay] = useState<boolean>(false);
    const [CanPlay, setCanPlay] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    useEffect(() => {
        // if item id is changed then update the audio object src
        audioObj.src = audio;

    }, [id])
    // on can audio object play handler
    const oncanplay = () => {
        try {
            // set canPlay to true
            setCanPlay(true);
            // set Play to true
            setPlay(true);
            // play the audio 
            audioObj.play();
            // update the duration state
            setDuration(audioObj.duration);
        } catch (error) {
            // if there is an error 
            setCanPlay(false);
            setPlay(false)
            console.log(error)
        }
    }
    // on audio play handler
    const onPlayAudio = (e: any) => {
        // define the timer
        let tickInterval: any = setInterval(() => { tick(); }, 250);
        // timer callback
        const tick = () => {
            // if timer exisits then update the currentTime value
            if (tickInterval) {
                setCurrentTime(audioObj.currentTime);
            }
        }
        // get if the audio object is paused 
        const paused = e.target.paused;
        // if paused then clear the timer intreval
        if (paused) {
            clearInterval(tickInterval);
            tickInterval = null;
        }
    }
    /*********************** */

    /* on range input change  */
    const onRangeValueChange = (e: any) => {
        // get entrie value
        let value = e.target.value;
        // update the audio current time
        audioObj.currentTime = Number(value) / 100 * duration;
    }
    /************************** */
    // check if the  audio object src changed then subscribe audio events
    useEffect(() => {
        // canplay event
        audioObj.addEventListener('canplay', oncanplay);
        // play event
        audioObj.addEventListener('play', onPlayAudio);

    }, [audioObj.src])

    /* on toogle play */
    const togglePlay = () => {
        setPlay((state: boolean) => {
            state ? audioObj.pause() : audioObj.play(onPlayAudio);
            return !state;
        });

    }
    /********************** */

    /* formatTime */
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(seconds % 60).toString().padStart(2, '0');


        return `${m}:${s}`;
    }
    /*********************** */

    return (
        // begain :: audio item 
        <div className='audio-item'>

            {/* begain ::  Item image  */}
            <div className='item-image-container'>
                <img src={cover} alt={name} />
            </div>
            {/* end ::  Item image  */}

            {/* begain ::  Item info  */}
            <div className='item-info'>
                <span className='artist'>{artist}</span>
            </div>
            {/* end  ::  Item info  */}


            {/* begain ::  audio title  */}
            <h2 className='auio-title'>Player</h2>
            {/* end  ::  audio title  */}


            {/* begain ::  audio progress-bar section  */}
            {!CanPlay ? 'Loading ... ' :
                <div className='progress-bar-container'>
                    <span className='current-time'>{formatTime(currentTime ?? 0)}</span>
                    <input className="reangeBar" type="range" name="audioitem" min={0} value={Math.floor((currentTime * 100) / duration)} max={100} onChange={onRangeValueChange} />
                    <span className='total-time'>{formatTime(duration ?? 0)}</span>
                </div>
            }

            {/* end  ::  audio progress-bar section   */}
            
            {/* begain  ::  audio tool bar section   */}
            <div className='tool-bar'>
                <div className='prev'>
                    <i className="fa-solid fa-angle-left" onClick={goPrev}></i>
                </div>
                <div className='play'>
                    <i className={!Play ? "fa-solid fa-play" : "fa-regular fa-circle-pause"} onClick={togglePlay}></i>
                </div>

                <div className='next'>
                    <i className="fa-solid fa-angle-right" onClick={goNext}></i>
                </div>
            </div>
            {/* end  ::  audio tool bar section   */}
        </div>
        // end :: audio item 
    )
}
