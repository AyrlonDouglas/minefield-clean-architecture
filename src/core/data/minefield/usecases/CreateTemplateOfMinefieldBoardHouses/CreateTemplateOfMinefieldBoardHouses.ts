import { IMinefieldBoardHouse, MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { ICreateTemplateOfMinefieldBoardHouses } from "@domain/minefield/usecases/ICreateTemplateOfMinefieldBoardHouses";
import { MinefieldBoardHouse } from "../../models/MinefieldBoardHouse";
import { Position } from "@data/common/models/Position";

interface Params {
    sizeOnXAxis: number;
    sizeOnYAxis: number;
}
export class CreateTemplateOfMinefieldBoardHouses implements ICreateTemplateOfMinefieldBoardHouses {
    private sizeOnXAxis: number;
    private sizeOnYAxis: number;

    constructor(params: Params) {
        this.sizeOnXAxis = params.sizeOnXAxis
        this.sizeOnYAxis = params.sizeOnYAxis
    }

    create(): IMinefieldBoardHouse[][] {
        if (this.sizeOnXAxis <= 0 || this.sizeOnYAxis <= 0) {
            throw new Error('size axis must be greater than zero')
        }
        const boardHouses: IMinefieldBoardHouse[][] = []
        for (let x = 0; x < this.sizeOnXAxis; x++) {
            boardHouses.push([])
            for (let y = 0; y < this.sizeOnYAxis; y++) {
                const minefieldBoardHouse = new MinefieldBoardHouse({
                    content: MinefieldBoardHouseContentEnum.FREE,
                    minesAround: 0,
                    position: new Position(x, y),
                    state: MinefieldBoardHouseStateEnum.CLOSED
                })
                boardHouses[x].push(minefieldBoardHouse)
            }
        }
        return boardHouses
    }
}