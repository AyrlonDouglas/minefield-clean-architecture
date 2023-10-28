import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { ISomeMineHasBeenOpened } from "@domain/minefield/usecases/ISomeMineHasBeenOpened";

export class SomeMineHasBeenOpened implements ISomeMineHasBeenOpened {

    constructor(private board: IMinefieldBoard) {
    }

    verify() {
        return this.board.boardHouses
            .some(row => row
                .some(boardHouse => boardHouse.state === MinefieldBoardHouseStateEnum.OPENED &&
                    boardHouse.content === MinefieldBoardHouseContentEnum.MINE))
    }
}