import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { IApplet } from '../../contracts/interface/IApplet';
import { AppletType } from '../../constants/enum/appletType';
import { LaunchedApp } from '../../contracts/launchedApp';
import { windowActionEvent } from '../../constants/enum/customWindowEvent';
import { PullstateCore } from '../../state/stateCore';
import { closeApp, maximiseApp, minimiseApp, setNewFocusForApp } from '../../state/window/reducer';
import { windowDisplayer } from './windowDisplayer';
import { defaultWindowCoordShift, defaultWindowXPosition, defaultWindowYPosition } from '../../constants/window';

interface IProps { }

interface IModalProps {
    isOpen: boolean;
    applet: AppletType;
}

export const WindowManager: React.FC<IProps> = (props: IProps) => {
    const { WindowStore } = PullstateCore.useStores();
    const activeApps: Array<LaunchedApp> = WindowStore.useState(store => store.activeApps);
    const currentFocused: AppletType = WindowStore.useState(store => store.currentFocused);
    const [modalData, setModalData] = useState<IModalProps>({
        isOpen: false,
        applet: AppletType.none,
    });

    const onMaximise = (appletType: AppletType) => (e: any) => WindowStore.update(maximiseApp(appletType));

    const onSetFocus = (appletType: AppletType) => (e: any) => {
        if (e?.customEvent === windowActionEvent) return;
        WindowStore.update(setNewFocusForApp(appletType))
    };
    const onMinimise = (appletType: AppletType) => (e: any) => WindowStore.update(minimiseApp(appletType));
    const onClose = (appletType: AppletType) => (e: any) => WindowStore.update(closeApp(appletType));

    const onCloseModal = () => WindowStore.update(closeApp(modalData.applet),
        () => setModalData({
            isOpen: false,
            applet: AppletType.none,
        })
    );

    const renderSupportedWindows = (currentlyFocused: AppletType) => (app: LaunchedApp, index: number) => {
        const coordShift = defaultWindowCoordShift * (index % 10);
        const appProps: IApplet = {
            ...app,
            isFocused: app.appletType === currentlyFocused,
            zIndex: app.openOrder,
            ...app.meta,
            defaultX: defaultWindowXPosition + coordShift,
            defaultY: defaultWindowYPosition + coordShift,
            onSetFocus: onSetFocus(app.appletType),
            onMinimise: onMinimise(app.appletType),
            onMaximise: onMaximise(app.appletType),
            onClose: onClose(app.appletType),
        };

        const applet = windowDisplayer(appProps);
        if (applet != null) return applet;

        if (!modalData.isOpen) {
            setModalData({
                isOpen: true,
                applet: app.appletType,
            });
        }
        return <span key={`notFound-${index}`}></span>
    }

    return (
        <div className="window-manager layer fullscreen">
            <AnimatePresence>
                {
                    activeApps
                        .map(renderSupportedWindows(currentFocused))
                }
            </AnimatePresence>
            <Modal isOpen={modalData.isOpen} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>App failed to launch</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Could not launch the requested app. This is most likely not you fault and is due to creator of this website missing something.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

