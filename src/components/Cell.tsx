import {gameState, Point} from "../gameState.ts";
import {config} from "../config.ts";
import {Stone} from "./Stone.tsx";

type CellProps = {
    point: Point,
    haveStone: boolean,
    color?: 'red' | 'lightgray',
}

export const Cell = ({ point, haveStone, color }: CellProps) => {
    const [x, y] = point;

    return <div
        style={{
            position: 'absolute',
            width: config.cellSize,
            height: config.cellSize,
            bottom: y * config.cellSize,
            left: x * config.cellSize,
            borderRight: "1px solid black",
            borderTop: "1px solid black",
            lineHeight: `${config.cellSize}px`,
            backgroundColor: color,
        }}

        onClick={() => gameState.touch(point)}
    >
        {haveStone && <Stone />}
    </div>
}
