import React, { useEffect, useState, useRef } from 'react';
import { Drawer, useDisclosure, useToast } from '@chakra-ui/react';
import Mousetrap from 'mousetrap';

import { SpotlightSearch } from './components/common/spotlight/spotlight';
import { NotificationDrawer } from './components/common/drawer/notificationDrawer';
import { Desktop } from './components/common/desktop/desktop';
import { Taskbar } from './components/common/taskbar/taskbar';
import { WindowManager } from './components/window/windowManager';
import { StartMenu } from './components/common/startmenu/startMenu';
import { FoundSecretType } from './constants/enum/foundSecretType';
import { knownKeybinds } from './constants/keybind';
import { addSecretIfNotFound } from './helper/secretFoundHelper';
import { IDependencyInjection, withServices } from './integration/dependencyInjection';
import { initLocalization } from './integration/i18n';
import { SillyService } from './services/SillyService';
import { defaultSettingProps } from './state/setting/store';
import { defaultSecretProps } from './state/secrets/store';
import { loadStateFromLocalStorage } from './state/stateFromLocalStorage';
import { PullstateCore } from './state/stateCore';

interface IExpectedServices {
  sillyService: SillyService
}
interface IWithoutExpectedServices { };
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const AppUnconnected: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const [isSpotlightOpen, setSpotlightOpen] = useState(false);
  const toastFunc = useToast();
  const appRef = useRef(null);

  const { SettingStore, SecretStore } = PullstateCore.useStores();
  const currentSettings = SettingStore.useState(store => store);
  const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
  const brightnessPerc = (currentSettings.brightness / 2) + 50;

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      const stateFromLocalStorage = loadStateFromLocalStorage();
      const settingStore = { ...defaultSettingProps, ...stateFromLocalStorage.SettingStore };
      const secretStore = { ...defaultSecretProps, ...stateFromLocalStorage.SecretStore };

      SettingStore.update(store => ({ ...store, ...settingStore }));
      SecretStore.update(store => ({ ...store, ...secretStore }));
      initLocalization(settingStore.language);
    }
    Mousetrap.bind(knownKeybinds.spotlight, () => toggleSpotlight());
    Mousetrap.bind(knownKeybinds.konami, () => konamiCodeFunc());

    return () => {
      Mousetrap.unbind(knownKeybinds.spotlight);
      Mousetrap.unbind(knownKeybinds.konami);
    }
    // eslint-disable-next-line
  }, [isSpotlightOpen]);

  const toggleStartMenu = (newValue?: boolean) => {
    setStartMenuOpen(newValue ?? (!isStartMenuOpen));
  };

  const toggleSpotlight = (newValue?: boolean) => {
    const newIsSpotlightOpen = newValue ?? (!isSpotlightOpen);
    setSpotlightOpen(newIsSpotlightOpen);
    // if (newIsSpotlightOpen == false) {
    //   (appRef as any)?.component?.focus?.();
    // }
  };

  const konamiCodeFunc = () => addSecretIfNotFound({
    secretStore: SecretStore,
    currentSecretsFound,
    toastFunc,
    secretToAdd: FoundSecretType.harlemShake,
    callbackFinally: () => props.sillyService.doHarlemShake?.(),
  });

  return (
    <div
      ref={appRef}
      className="fullscreen layer"
      style={{ filter: `brightness(${brightnessPerc}%)` }}
    >
      <Desktop />
      <WindowManager />
      <Taskbar
        drawerOnOpen={onOpen}
        toggleStartMenu={toggleStartMenu}
      />
      <StartMenu
        isOpen={isStartMenuOpen}
        toggleStartMenu={toggleStartMenu}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <NotificationDrawer
          onClose={onClose}
        />
      </Drawer>
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => toggleSpotlight(false)}
      />
    </div>
  );
}

export const App = withServices<IWithoutExpectedServices, IExpectedServices>(
  AppUnconnected,
  (services: IDependencyInjection): IExpectedServices => ({ sillyService: services.sillyService }),
);
