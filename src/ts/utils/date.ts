export function formattedDate(date: Date | string) {
    return new Date(date).toLocaleDateString("uk");
}
