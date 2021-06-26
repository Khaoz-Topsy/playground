import { Store } from "pullstate";

export interface ISettingStore {
    background: string;
    enabledClippy: boolean;
    brightness: number;
    volume: number;
}

export const SettingStore = new Store<ISettingStore>({
    background: 'bg1',
    enabledClippy: false,
    brightness: 100,
    volume: 100,
});