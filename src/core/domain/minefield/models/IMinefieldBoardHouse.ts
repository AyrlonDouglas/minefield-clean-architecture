import { IBoardHouse } from "@domain/common/models/IBoardHouse";
import { IPosition } from "@domain/common/models/IPosition";

export interface IMinefieldBoardHouseParams {
    content: MinefieldBoardHouseContentEnum;
    state: MinefieldBoardHouseStateEnum;
    position: IPosition;
    minesAround: number
}

export abstract class IMinefieldBoardHouse implements IBoardHouse<MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum>{
    content: MinefieldBoardHouseContentEnum;
    state: MinefieldBoardHouseStateEnum;
    readonly position: IPosition;
    minesAround: number;

    constructor(params: IMinefieldBoardHouseParams) {
        this.content = params.content
        this.state = params.state
        this.position = params.position
        this.minesAround = params.minesAround
    }
}

export enum MinefieldBoardHouseContentEnum {
    'FREE',
    'MINE'
}

export enum MinefieldBoardHouseStateEnum {
    'OPENED',
    'CLOSED',
    'MARKED'
}