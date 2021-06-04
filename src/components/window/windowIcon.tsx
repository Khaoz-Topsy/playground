import { AppImage } from '../../constants/appImage';
import { AppletType } from '../../constants/enum/appletType';
import { BasicImage } from '../../components/core/image';

export const windowIconString = (appType: AppletType): string => {
    switch (appType) {
        case AppletType.setting: return AppImage.settings;
        case AppletType.nyanCat: return AppImage.nyanCat;
    }
    return AppImage.error;
}

export const windowIcon = (appType: AppletType) => (<BasicImage imageUrl={windowIconString(appType)} />);
export const windowTaskbarIcon = (appType: AppletType) => (<BasicImage imageUrl={windowIconString(appType)} />);