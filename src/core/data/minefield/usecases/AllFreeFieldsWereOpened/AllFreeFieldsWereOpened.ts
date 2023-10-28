import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IAllFreeFieldsWereOpened } from "@domain/minefield/usecases/IAllFreeFieldsWereOpened";

export class AllFreeFieldsWereOpened implements IAllFreeFieldsWereOpened {
    constructor(private board: IMinefieldBoard) { }
    verify(): boolean {
        return !this.board
            .boardHouses
            .some(row => row
                .some(boardHouse => boardHouse.content === MinefieldBoardHouseContentEnum.FREE
                    && boardHouse.state === MinefieldBoardHouseStateEnum.CLOSED))
    }

}