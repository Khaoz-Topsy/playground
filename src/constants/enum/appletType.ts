export enum AppletType {
    none,

    setting,
    terminal,
    explorer,
    picture,
    tweeter,
    email,
    notes,
    iframe,

    kurt,
    vsCode,
    assistantNMS,
    assistantSMS,
    musicPlayer,
    monitor,
    liveTv,
    discordInvite,
    iotPublication,
    presentation,
    swagger,
    yellowPages,
    browser,

    // Funny
    nyanCat,
    minecraft,
    diablo,
}

export const appletsThatCanHaveTheirNamesChanged: Array<AppletType> = [
    AppletType.explorer,
    AppletType.picture,
    AppletType.notes,
];

export const appletsHiddenFromApplicationFolder: Array<AppletType> = [
    AppletType.explorer,
];