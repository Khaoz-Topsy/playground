import { site } from './site';
import { Backgrounds, FileIcon, External, AppletIcon, MiscIcon } from './appImage';
import { MarkdownFile } from './markdownFile';
import { DesktopIcons } from './desktopIconList';
import { IFolder } from '../contracts/interface/IFolder';
import { Folder } from '../contracts/implementation/Folder';
import { allKnownApps, KnownApplets } from './knownApplets';
import { imageFile, linkFile, markDownFile } from '../helper/fileHelper';
import { sortByPropDesc } from '../helper/sortHelper';
import { translate } from '../integration/i18n';
import { LocaleKey } from '../localization/LocaleKey';

export const applicationFolderId: any = '0.0';
export const desktopFolderId: any = '0.1';
export const documentFolderId: any = '0.2';

export const getFilesOnDisk = (): IFolder => {
    const rootFolder = new Folder({ name: LocaleKey.root });

    const appFolderIndex = rootFolder.addSubFolder(new Folder({
        name: LocaleKey.applications,
        imgUrl: AppletIcon.application,
    }));
    const allKnownAppsSorted = sortByPropDesc(allKnownApps().map(ka => ({ ...ka, translated: translate(ka.name) })), 'translated');
    for (const app of allKnownAppsSorted) {
        (rootFolder.contents[appFolderIndex] as Folder)?.addFile?.(app);
    }

    const desktopFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.desktop }));
    for (const icon of DesktopIcons) {
        (rootFolder.contents[desktopFolderIndex] as Folder)?.addFile?.(icon);
    }

    const documentFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.documents }));
    const docFolder = getFolder(rootFolder, documentFolderIndex);
    const documentFolderSecretsIndex = docFolder?.addSubFolder?.(new Folder({ name: LocaleKey.secrets }));
    const secretsDocFolder = getFolder(docFolder, documentFolderSecretsIndex);
    const documentFolderMoreSecretsIndex = secretsDocFolder?.addSubFolder?.(new Folder({ name: LocaleKey.moreSecrets }));
    const moreSecretsDocFolder = getFolder(secretsDocFolder, documentFolderMoreSecretsIndex);
    moreSecretsDocFolder.addFile(markDownFile(LocaleKey.secretFileName, MarkdownFile.secrets));

    // getFolder(rootFolder, documentFolderIndex)?.addFile?.(markDownFile(LocaleKey.readMe, MarkdownFile.secrets));
    for (const background of Backgrounds) {
        docFolder?.addFile?.(imageFile(background.name as any, null, [background.url]));
    }

    // const kurtFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'Kurt' }));
    // getFolder(rootFolder, kurtFolderIndex)?.addFile(linkFile('Android App', FileIcon.android, site.assistantApps.nms.googlePlay));

    const assistantNMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.assistantNMS }));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(markDownFile(LocaleKey.readMe, MarkdownFile.assistantNMSGeneral));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile(LocaleKey.androidApp, FileIcon.android, site.assistantApps.nms.googlePlay));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile(LocaleKey.iOSApp, FileIcon.apple, site.assistantApps.nms.appleStore));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile({ ...KnownApplets.noMansSky });
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile(LocaleKey.webApp, FileIcon.web, site.assistantApps.nms.webapp));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile(LocaleKey.homepage, FileIcon.web, site.assistantApps.nms.website));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile({ ...KnownApplets.swagger, meta: { src: site.assistantApps.nms.api } });
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile(LocaleKey.github, FileIcon.github, site.assistantApps.nms.github));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile({ ...KnownApplets.twitterTimeline, meta: { src: site.assistantApps.nms.twitter } });
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(imageFile('loader.svg' as any, External.assistantNmsLoader, [External.assistantNmsLoader]));

    const assistantSMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.assistantSMS }));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(markDownFile(LocaleKey.readMe, MarkdownFile.assistantSMSGeneral));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile(LocaleKey.androidApp, FileIcon.android, site.assistantApps.sms.googlePlay));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile(LocaleKey.iOSApp, FileIcon.apple, site.assistantApps.sms.appleStore));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile({ ...KnownApplets.scrapMechanic });
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile(LocaleKey.webApp, FileIcon.web, site.assistantApps.sms.webapp));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile({ ...KnownApplets.swagger, meta: { src: site.assistantApps.sms.api } });
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile(LocaleKey.github, FileIcon.github, site.assistantApps.sms.githubOrg));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile({ ...KnownApplets.vsCode, meta: { url: site.assistantApps.sms.vscodeUrlForApp } });

    const assistantAppsFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.assistantApps }));
    getFolder(rootFolder, assistantAppsFolderIndex)?.addFile(markDownFile(LocaleKey.readMe, MarkdownFile.assistantAppsGeneral));
    getFolder(rootFolder, assistantAppsFolderIndex)?.addFile(linkFile(LocaleKey.homepage, MiscIcon.assistantApps, site.assistantApps.website));
    getFolder(rootFolder, assistantAppsFolderIndex)?.addFile(linkFile('Discord' as any, FileIcon.discord, site.assistantApps.discord));
    getFolder(rootFolder, assistantAppsFolderIndex)?.addFile(linkFile(LocaleKey.twitterFeed, AppletIcon.twitter, site.assistantApps.nms.twitter));

    return rootFolder.toIFolder();
};

const getFolder = (rootFolder: Folder, index: number): Folder => rootFolder.contents[index] as Folder;

