import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { IMinefieldBoardHouse, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IOpenSurroundingHousesWhenEmpty } from "@domain/minefield/usecases/IOpenSurroundingHousesWhenEmpty";
import { cloneDeep } from "lodash";

interface OpenSurroundingHousesWhenEmptyParams {
    board: IMinefieldBoard
    house: IMinefieldBoardHouse
}

export class OpenSurroundingHousesWhenEmpty implements IOpenSurroundingHousesWhenEmpty {
    private board: IMinefieldBoard
    private house: IMinefieldBoardHouse

    constructor(params: OpenSurroundingHousesWhenEmptyParams) {
        this.board = cloneDeep(params.board)
        this.house = params.house
    }

    open(): IMinefieldBoard {
        this.house.position.positionsAroundAvailable({
            sizeOnXAxis: this.board.sizeOnXAxis,
            sizeOnYAxis: this.board.sizeOnYAxis
        }).forEach(([x, y]) => {
            const house = this.board.boardHouses[x][y]

            if (house.state === MinefieldBoardHouseStateEnum.CLOSED) {
                house.state = MinefieldBoardHouseStateEnum.OPENED

                if (house.minesAround === 0) {
                    this.board = new OpenSurroundingHousesWhenEmpty({
                        board: this.board,
                        house
                    }).open()
                }
            }
        })
        return this.board
    }
}