import { IPosition } from "./IPosition"

export interface IBoardHouse<Content, State> {
    readonly content: Content
    state: State
    position: IPosition
}