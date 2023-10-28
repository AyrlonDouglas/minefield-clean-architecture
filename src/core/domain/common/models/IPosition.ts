export interface IPosition {
    readonly x: number
    readonly y: number
    readonly positionsAroundAvailable: (params: positionsAroundAvailableParams) => number[][]
}

interface positionsAroundAvailableParams {
    sizeOnXAxis: number
    sizeOnYAxis: number
}