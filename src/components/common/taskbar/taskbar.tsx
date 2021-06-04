import React from 'react';
import { Image, Center } from '@chakra-ui/react';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { currentShortTime, currentShortDate } from '../../../helper/dateHelper';
import { WindowStore } from '../../../state/window/store';
import { openAppFromTaskbar } from '../../../state/window/reducer';
import { TaskbarIcon } from './taskbarIcon';
import { AppletType } from '../../../constants/enum/appletType';

export const Taskbar: React.FC = () => {
    const windStore = WindowStore.useState(store => store);

    const baseShortcuts = [
        {
            imgUrl: '/assets/img/appIcons/windows.svg',
        },
        {
            imgUrl: '/assets/img/appIcons/assistantNMS.png',
        },
        {
            imgUrl: '/assets/img/appIcons/assistantSMS.png',
        },
    ];

    const openApp = (appType: AppletType) => (e: any) => {
        WindowStore.update(openAppFromTaskbar(appType));
    }

    return (
        <div className="taskbar">
            <AnimatePresence>
                {
                    baseShortcuts.map((shortcut) => {
                        const classes = classNames('applet-shortcut noselect');
                        return (
                            <div
                                key={shortcut.imgUrl}
                                className={classes}>
                                <Image src={shortcut.imgUrl} alt={shortcut.imgUrl} />
                            </div>
                        );
                    })
                }
                {
                    windStore.activeApps.map((applet, index: number) => {
                        return (
                            <TaskbarIcon
                                key={applet.appType}
                                index={index}
                                applet={applet}
                                selected={applet.appType === windStore.currentFocused}
                                openApp={openApp}
                            />
                        );
                    })
                }
            </AnimatePresence>
            <div className="taskbar-tray noselect">
                <Center>
                    <p>{currentShortTime()}<br />{currentShortDate()}</p>
                </Center>
            </div>
        </div>
    );
}
