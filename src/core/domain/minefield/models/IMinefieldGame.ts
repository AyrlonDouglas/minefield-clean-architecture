import { IGame } from "@domain/common/models/IGame";
import { IMinefieldBoard } from "./IMinefieldBoard";

export interface IMinefieldGameParams {
    score: number;
    started: boolean;
    won: boolean;
    over: boolean;
    start: () => void;
    restart: () => void;
    board: IMinefieldBoard
}

export abstract class IMinefieldGame implements IGame {
    score: number;
    started: boolean;
    won: boolean;
    over: boolean;
    board: IMinefieldBoard

    constructor(params: IMinefieldGameParams) {
        this.score = params.score
        this.started = params.started
        this.won = params.won
        this.over = params.over
        this.board = params.board
    }

    start(): void { }
    restart(): void { }
}