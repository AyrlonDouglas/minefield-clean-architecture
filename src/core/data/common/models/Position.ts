import { IPosition } from "@domain/common/models/IPosition";

export class Position implements IPosition {

    constructor(public readonly x: number, public readonly y: number,) { }

    positionsAroundAvailable({ sizeOnXAxis, sizeOnYAxis }: { sizeOnXAxis: number, sizeOnYAxis: number }) {
        return [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]]
            .filter(([x, y]) => x >= 0 && y >= 0 && x < sizeOnXAxis && y < sizeOnYAxis)
    }
}