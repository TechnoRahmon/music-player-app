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
    const { artist, cover, name, active, id, audio } = item;
    //const audioObj = new Audio(audio);
    const [audioObj, setAudioObj] = useState<typeof Audio | any>(new Audio(audio));
    const [Play, setPlay] = useState<boolean>(false);
    const [CanPlay, setCanPlay] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [rangeValue, setRangeValue] = useState<number>(0);

    useEffect(() => {
        //audioObj.play();
        //setAudioObj(new Audio(audio))
        audioObj.src = audio;

    }, [id])

    const oncanplay = () => {
        try {
            setCanPlay(true);
            setPlay(true);
            audioObj.play(onPlayAudio);
            setDuration(audioObj.duration);
            //setCurrentTime(audioObj.currentTime) 
        } catch (error) {
            setCanPlay(false);
            setPlay(false)
            console.log(error)
        }
    }

    const onPlayAudio = (e: any) => {
        let tickInterval: any = setInterval(() => { tick(); }, 250);
        const tick = () => {
            if (tickInterval) {
                setCurrentTime(audioObj.currentTime);
            }
        }
        const paused = e.target.paused;
        if (paused) {
            clearInterval(tickInterval);
            tickInterval = null;
        }
    }
    const onRangeValueChange = (e: any) => {
        let value = e.target.value;
        console.log(value)
        audioObj.currentTime = Number(value) / 100 * duration;
    }

    useEffect(() => {
        audioObj.addEventListener('canplay', oncanplay);
        audioObj.addEventListener('play', onPlayAudio);

    }, [audioObj.src])







    useEffect(() => {
        setCurrentTime(audioObj.currentTime);
    }, [audioObj.currentTime])
    const togglePlay = () => {
        setPlay((state: boolean) => {
            state ? audioObj.pause() : audioObj.play(onPlayAudio);
            return !state;
        });

    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(seconds % 60).toString().padStart(2, '0');


        return `${m}:${s}`;
    }

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

            {/* begain ::  audio title  */}
            {/* <audio controls>
                <source src={Audio}></source>
            </audio> */}
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
        </div>
        // end :: audio item 
    )
}
