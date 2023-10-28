export interface IBoard<T> {
    readonly sizeOnXAxis: number
    readonly sizeOnYAxis: number
    boardHouses: T[][]
}