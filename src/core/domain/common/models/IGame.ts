export interface IGame {
    started: boolean
    won: boolean
    over: boolean
    start: () => void
    restart: () => void
}