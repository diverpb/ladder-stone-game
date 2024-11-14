import { makeAutoObservable, toJS } from "mobx";
import { config } from "./config.ts";

type Field = number[][];
export type Point = [number, number];

const getInitialField = () => {
    const field = Array.from({ length: config.fieldSize })
        .map(
            () => Array.from({ length: config.fieldSize }).fill(0)
        ) as Field

    field[0][0] = 1;

    return field;
}

const checkMoveForError = (field: Field, [x, y]: Point): null | Point => {
    if (!field[x][y]) return [x, y];
    if (x >= config.fieldSize -1) return [x, y];
    if (y >= config.fieldSize -1) return [x, y];
    if (field[x][y+1]) return [x, y+1];
    if (field[x+1][y]) return [x+1, y];

    return null;
}

export const getLadderPoints = () => {
    const points: Point[] = [];
    for (let x = 0; x < config.ladderSize;  x++) {
        for (let y = 0; y < config.ladderSize - x; y++) {
            points.push([x,y])
        }
    }

    return points;
}

class GameState {
    constructor() {
        makeAutoObservable(this)
    }

    history: Field[] = [];

    field = getInitialField();

    moveStone([x,y]: Point) {
        this.history.push(toJS(this.field));
        this.field[x][y] = 0;
        this.field[x+1][y] = 1;
        this.field[x][y+1] = 1;
    }

    error: Point | null = null;

    showError(point: Point) {
        this.error = point;
        setTimeout(() => {
            this.error = null;
        }, 200)
    }

    touch(point: Point) {
        if (this.error) return;

        const error = checkMoveForError(this.field, point);
        if (error) {
            this.showError(error);
        } else {
            this.moveStone(point);
        }
    }

    resetState() {
        this.field = getInitialField();
        this.history = [];
    }

    goBack() {
        if (!this.history.length) return;

        this.field = this.history.pop();
    }
}

export const gameState = new GameState();
