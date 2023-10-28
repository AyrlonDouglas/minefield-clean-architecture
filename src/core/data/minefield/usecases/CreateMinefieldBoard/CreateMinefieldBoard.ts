import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { ICreateMinefieldBoard } from "@domain/minefield/usecases/ICreateMinefieldBoard";
import { CreateTemplateOfMinefieldBoardHouses } from "../CreateTemplateOfMinefieldBoardHouses/CreateTemplateOfMinefieldBoardHouses";
import { PlantMinesInMinefieldHouses } from "../PlantMinesInMinefieldHouses/PlantMinesInMinefieldHouses";
import { MinefieldBoard } from "../../models/MinefieldBoard";

interface CreateMinefieldBoardParams {
    sizeOnXAxis: number
    sizeOnYAxis: number
    numberOfMines: number
}

export class CreateMinefieldBoard implements ICreateMinefieldBoard {
    private sizeOnXAxis: number
    private sizeOnYAxis: number
    private numberOfMines: number

    constructor(params: CreateMinefieldBoardParams) {
        this.sizeOnXAxis = params.sizeOnXAxis
        this.sizeOnYAxis = params.sizeOnYAxis
        this.numberOfMines = params.numberOfMines
    }

    create(): IMinefieldBoard {
        const templateMinefieldHouses = new CreateTemplateOfMinefieldBoardHouses({
            sizeOnXAxis: this.sizeOnXAxis,
            sizeOnYAxis: this.sizeOnYAxis
        }).create()

        const minefieldHousesWithMines = new PlantMinesInMinefieldHouses({
            minefieldHouses: templateMinefieldHouses,
            numberOfMines: this.numberOfMines
        }).plant()

        const board = new MinefieldBoard({
            sizeOnXAxis: this.sizeOnXAxis,
            sizeOnYAxis: this.sizeOnYAxis,
            numberOfMines: this.numberOfMines,
            boardHouses: minefieldHousesWithMines
        })
        return board
    }
}