import { IMinefieldBoard, IMinefieldBoardParams } from "@domain/minefield/models/IMinefieldBoard";
import { IMinefieldBoardHouse } from "@domain/minefield/models/IMinefieldBoardHouse";
import { cloneDeep } from "lodash";

export interface MinefieldBoarParams extends IMinefieldBoardParams { }
export class MinefieldBoard implements IMinefieldBoard {
    readonly sizeOnXAxis: number;
    readonly sizeOnYAxis: number;
    readonly numberOfMines: number;
    boardHouses: IMinefieldBoardHouse[][];

    constructor(params: MinefieldBoarParams) {
        this.sizeOnXAxis = params.sizeOnXAxis
        this.sizeOnYAxis = params.sizeOnYAxis
        this.numberOfMines = params.numberOfMines
        this.boardHouses = cloneDeep(params.boardHouses)
    }
}