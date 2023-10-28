import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IOpenAllMInedHouses } from "@domain/minefield/usecases/IOpenAllMInedHouses";
import { cloneDeep } from "lodash";

export class OpenAllMinedHouses implements IOpenAllMInedHouses {
    private board: IMinefieldBoard

    constructor(board: IMinefieldBoard) {
        this.board = cloneDeep(board)
    }

    open(): IMinefieldBoard {
        this.board.boardHouses.forEach(row => {
            row.forEach(house => {
                if (house.content === MinefieldBoardHouseContentEnum.MINE) {
                    house.state = MinefieldBoardHouseStateEnum.OPENED
                }
            })
        })
        return this.board
    }
}