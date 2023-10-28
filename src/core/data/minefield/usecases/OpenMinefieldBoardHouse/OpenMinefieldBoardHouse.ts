import { IMinefieldBoardHouse, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IOpenMinefieldBoardHouse } from "@domain/minefield/usecases/IOpenMinefieldBoardHouse";

export class OpenMinefieldBoardHouse implements IOpenMinefieldBoardHouse {
    constructor(private minefieldBoardHouse: IMinefieldBoardHouse) { }

    open() {
        if (this.minefieldBoardHouse.state === MinefieldBoardHouseStateEnum.CLOSED) {
            this.minefieldBoardHouse.state = MinefieldBoardHouseStateEnum.OPENED
        }
        return this.minefieldBoardHouse
    }
}