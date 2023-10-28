import { IBoard } from "@domain/common/models/IBoard";
import { IMinefieldBoardHouse } from "./IMinefieldBoardHouse";

export interface IMinefieldBoardParams {
    sizeOnXAxis: number;
    sizeOnYAxis: number;
    numberOfMines: number;
    boardHouses: IMinefieldBoardHouse[][];
}

export abstract class IMinefieldBoard implements IBoard<IMinefieldBoardHouse> {
    sizeOnXAxis: number;
    sizeOnYAxis: number;
    numberOfMines: number;
    boardHouses: IMinefieldBoardHouse[][];

    constructor(params: IMinefieldBoardParams) {
        this.sizeOnXAxis = params.sizeOnXAxis
        this.sizeOnYAxis = params.sizeOnYAxis
        this.numberOfMines = params.numberOfMines
        this.boardHouses = params.boardHouses
    }
}