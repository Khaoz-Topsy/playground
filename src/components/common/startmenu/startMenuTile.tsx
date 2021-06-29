import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { StartMenuSize } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';

interface IProps {
    id: number;
    name: LocaleKey;
    imgUrl: string;
    isFull?: boolean;
    backgroundColour?: string;
    backgroundImage?: string;
    textColour?: string;
    size: StartMenuSize;
    onClick: (e: any) => void;
}

export const StartMenuTile: React.FC<IProps> = (props: IProps) => {
    const baseCss = `tile tile-${StartMenuSize[props.size]}`;
    const styleObj = {
        backgroundColor: props.backgroundColour,
        backgroundImage: props.backgroundImage,
        color: props.textColour,
    };
    return (
        <div key={props.id}
            onClick={props.onClick}
            className={classNames(baseCss, { 'full': props.isFull })}
            style={styleObj}
        >
            <BasicImage imageUrl={props.imgUrl} />
            <p>{translate(props.name)}</p>
        </div>
    );
}

