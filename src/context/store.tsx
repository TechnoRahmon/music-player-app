import React, { createContext, useState, FC } from "react";
import { IAudioItem } from "../types/IAudioItem";
import { TodoContextType } from "../types/IContext";
import chillHop from '../data/data'

// get the current active item
const getCurrentActiveItem = () => chillHop().find((item: IAudioItem) => item.active);

const contextDefaultValues: TodoContextType = {

  audioItems: chillHop(),
  setActiveItem: () => { },
  currentActiveItem: getCurrentActiveItem(),
  goNext: () => { },
  goPrev: () => { }
};

export const AudioContext = createContext<TodoContextType>(
  contextDefaultValues
);
type AudioProviderProps = {
  children: React.ReactNode;
}

const AudioProvider = ({ children }: AudioProviderProps) => {
  // audio items state array 
  const [audioItems, setAudioItems] = useState<Array<IAudioItem | any>>(contextDefaultValues.audioItems);

  // current active item state
  const [currentActiveItem, setCurrentActiveItem] = useState<IAudioItem | any>(contextDefaultValues.currentActiveItem)

  // set the active item handler
  const setActiveItem = (id: string) => {
    // deactivate all items except the current active item
    let newAudioItems = audioItems.map((item: IAudioItem) => {
      if (item.id == id) {
        let activeItem: IAudioItem | any = { ...item, active: true };
        setCurrentActiveItem(activeItem);
        return activeItem
      }
      else
        return { ...item, active: false }
    });
    setAudioItems(newAudioItems);
  };
  /************************ */

  // navigate to next audio item
  const goNext = () => {
    debugger
    const index = audioItems.findIndex((item: IAudioItem) => item.active);
    if (index >= 0 && index < (audioItems.length - 1)) {
      setActiveItem(audioItems[index + 1].id);
    } else
      setActiveItem(audioItems[0].id);
  }
  /************************** */
  // navigate to prev audio item
  const goPrev = () => {
    debugger
    const index = audioItems.findIndex((item: IAudioItem) => item.active);
    if (index > 0 && index <= (audioItems.length - 1)) {
      setActiveItem(audioItems[index - 1].id);
    } else
      setActiveItem(audioItems[audioItems.length - 1].id);
  }
  /************************** */
  return (
    <AudioContext.Provider
      value={{
        audioItems,
        currentActiveItem,
        setActiveItem,
        goNext,
        goPrev
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;