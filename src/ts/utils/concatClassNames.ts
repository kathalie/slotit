export function concatClassNames(...classNames: (string | undefined)[]): string {
    return classNames.filter(name => name !== undefined).join(" ");
}
