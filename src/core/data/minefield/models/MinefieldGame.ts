import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { IMinefieldGame, IMinefieldGameParams } from "@domain/minefield/models/IMinefieldGame";

export interface MinefieldGameParams extends IMinefieldGameParams { }

export class MinefieldGame implements IMinefieldGame {
    score: number;
    started: boolean;
    won: boolean;
    over: boolean;
    board: IMinefieldBoard;

    constructor(params: MinefieldGameParams) {
        this.score = params.score
        this.board = params.board
        this.started = params.started
        this.won = params.won
        this.over = params.over
    }

    start(): void {
        throw new Error("Method not implemented.");
    }
    restart(): void {
        throw new Error("Method not implemented.");
    }
}