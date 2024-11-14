import {config} from "../config.ts";

const stoneSize = config.cellSize * 0.75;
const stoneMargin = (config.cellSize - stoneSize) / 2;

export const Stone = () => <div
    style={{
        position: 'absolute',
        width: stoneSize,
        height: stoneSize,
        left: stoneMargin,
        top: stoneMargin,
        backgroundColor: 'black',
        borderRadius: stoneSize / 2,
    }}
/>
