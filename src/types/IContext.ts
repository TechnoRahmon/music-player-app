import { IAudioItem } from "./IAudioItem";


export type TodoContextType = {
    audioItems: Array<IAudioItem | any>;
    setActiveItem: (id: string) => void;
    getCurrentActiveItem:()=>void;
  };