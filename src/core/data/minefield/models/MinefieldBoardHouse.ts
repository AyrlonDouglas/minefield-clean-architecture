import { IPosition } from "@domain/common/models/IPosition";
import { IMinefieldBoardHouse, IMinefieldBoardHouseParams, MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";

export interface MinefieldBoardHouseParams extends IMinefieldBoardHouseParams { }

export class MinefieldBoardHouse implements IMinefieldBoardHouse {
    content: MinefieldBoardHouseContentEnum;
    state: MinefieldBoardHouseStateEnum;
    readonly position: IPosition;
    readonly minesAround: number;

    constructor(params: MinefieldBoardHouseParams) {
        this.position = params.position
        this.state = params.state
        this.content = params.content
        this.minesAround = params.minesAround
    }
}