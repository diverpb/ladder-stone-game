import './App.css'
import { config } from "./config.ts";
import { observer } from "mobx-react-lite";
import { gameState, getLadderPoints } from "./gameState.ts";
import { Cell } from "./components/Cell.tsx";

const ladderPoints = getLadderPoints();

const App = observer(() => {
    const { field } = gameState;

    return (
        <div style={{ display: 'flex'}}>
            <div style={{marginRight: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button type="button" onClick={() => gameState.resetState()}>
                    Все херня<br/>давай по новой
                </button>
                <button type="button" onClick={() => gameState.goBack()}>
                    {"< Назад"}
                </button>
            </div>
            <div style={{
                position: 'relative',
                width: config.fieldSize * config.cellSize,
                height: config.fieldSize * config.cellSize,
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
            }}>
                {ladderPoints.map(point => (
                    <Cell key={point.toString()} point={point} color="lightgray" />
                ))}
                {field.flatMap((column, x) => {
                    return column.map((value, y) => (
                        <Cell key={`${x}-${y}`} point={[x,y]} haveStone={!!value} />
                    ))
                })}
                {gameState.error && <Cell point={gameState.error} color="red" />}
            </div>
        </div>
    )
})

export default App
