import { FileType, IAppletFile, IFile } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { Backgrounds, FileIcon, External, AppletIcon } from "./appImage";
import { DataFile } from "./dataFile";
import { DesktopIcons } from "./desktopIconList";
import { allKnownApps, KnownApplets } from "./knownApplets";
import { site } from "./site";

export const documentFolder = {
    id: 3,
    name: 'Documents',
    contents: [
        {
            id: 3.1,
            name: 'ReadMe.md',
            imgUrl: FileIcon.markdown,
            type: FileType.markdown,
        },
        ...Backgrounds.map((b, index) => ({
            id: 3.1 + ((index + 1) / 100),
            name: b.name,
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [b.url]
            }
        })),
    ]
};

export const projectsFolders: Array<IFile | IAppletFile | IFolder> = [
    {
        id: 4,
        name: 'AssistantNMS',
        contents: [
            {
                id: 4.1,
                name: 'Android App',
                imgUrl: FileIcon.android,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.googlePlay,
                    showExternalIcon: true,
                }
            },
            {
                id: 4.2,
                name: 'iOS App',
                imgUrl: FileIcon.apple,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.appleStore,
                    showExternalIcon: true,
                }
            },
            {
                id: 4.3,
                name: 'WebApp',
                imgUrl: FileIcon.web,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.webapp,
                    showExternalIcon: true,
                }
            },
            {
                id: 4.4,
                name: 'Homepage',
                imgUrl: FileIcon.web,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.website
                }
            },
            {
                id: 4.5,
                name: 'loader.svg',
                imgUrl: External.assistantNmsLoader,
                type: FileType.image,
                meta: {
                    images: [External.assistantNmsLoader]
                }
            },
            {
                id: 4.99,
                name: 'README.md',
                imgUrl: FileIcon.markdown,
                type: FileType.markdown,
                meta: {
                    file: DataFile.assistantNMSGeneral
                }
            }
        ]
    },
    {
        id: 5,
        name: 'AssistantSMS',
        contents: [
            {
                id: 5.1,
                name: 'Android App',
                imgUrl: FileIcon.android,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.sms.googlePlay,
                    showExternalIcon: true,
                }
            },
            {
                id: 5.2,
                name: 'iOS App',
                imgUrl: FileIcon.apple,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.sms.appleStore,
                    showExternalIcon: true,
                }
            },
            {
                id: 5.3,
                name: 'WebApp',
                imgUrl: FileIcon.web,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.sms.webapp,
                    showExternalIcon: true,
                }
            },
            {
                ...KnownApplets.scrapMechanic,
                id: 5.4,
            },
            {
                id: 5.99,
                name: 'README.md',
                imgUrl: FileIcon.markdown,
                type: FileType.markdown,
                meta: {
                    file: DataFile.assistantSMSGeneral
                }
            }
        ]
    }
];

export const filesOnDisk: IFolder = {
    id: 0,
    name: 'root',
    contents: [
        {
            id: 1,
            name: 'Applications',
            imgUrl: AppletIcon.application,
            contents: allKnownApps(),
        },
        {
            id: 2,
            name: 'Desktop',
            contents: DesktopIcons
        },
        documentFolder,
        ...projectsFolders,
    ]
};