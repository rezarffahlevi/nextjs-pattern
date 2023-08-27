

export const textToSlug = (text:string) => {
    return text?.replaceAll(' ', '_').toLowerCase();
}