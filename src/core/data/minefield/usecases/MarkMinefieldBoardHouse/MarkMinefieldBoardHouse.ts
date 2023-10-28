import { IMinefieldBoardHouse, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IMarkMinefieldBoardHouse } from "@domain/minefield/usecases/IMarkMinefieldBoardHouse";

export class MarkMinefieldBoardHouse implements IMarkMinefieldBoardHouse {
    constructor(private minefieldBoardHouse: IMinefieldBoardHouse) { }

    mark(): IMinefieldBoardHouse {
        if (this.minefieldBoardHouse.state === MinefieldBoardHouseStateEnum.OPENED) {
            return this.minefieldBoardHouse
        }
        if (this.minefieldBoardHouse.state === MinefieldBoardHouseStateEnum.CLOSED) {
            this.minefieldBoardHouse.state = MinefieldBoardHouseStateEnum.MARKED
        } else {
            this.minefieldBoardHouse.state = MinefieldBoardHouseStateEnum.MARKED
            this.minefieldBoardHouse.state = MinefieldBoardHouseStateEnum.CLOSED
        }
        return this.minefieldBoardHouse
    }
}