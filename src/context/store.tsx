import React, { createContext, useState, FC } from "react";
import { IAudioItem } from "../types/IAudioItem";
import { TodoContextType } from "../types/IContext";
import chillHop from '../data/data'

const contextDefaultValues: TodoContextType = {
  audioItems: chillHop(),
  setActiveItem: () => { },
  getCurrentActiveItem: () => { }
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

  // get the current active item
  const getCurrentActiveItem = () => audioItems.find((item: IAudioItem) => item.active);

  // set the active item handler
  const setActiveItem = (id: string) => {
    // deactivate all items except the current active item
    let newAudioItems = audioItems.map((item: IAudioItem) => {
      if (item.id == id)
        return { ...item, active: true }
      else
        return { ...item, active: false }
    });
    setAudioItems(newAudioItems);
  };
  /************************ */

  return (
    <AudioContext.Provider
      value={{
        audioItems,
        getCurrentActiveItem,
        setActiveItem
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;