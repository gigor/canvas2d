export default (min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
