import { useCallback, useState } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { randomTetromino, TETROMINOS } from '../tetrominos';
export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x:0 , y:0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
        next: randomTetromino().shape
    });
    const rotate = (matrix, dir) => {
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map(col => col[index])
        )
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }
    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
        const oripos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, {x:0, y: 0})){
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1: -1));
            if (offset > clonedPlayer.tetromino[0].length){
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = oripos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    }
    const updatePlayerPos = ({ x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x : (prev.pos.x + x), y : (prev.pos.y + y)},
            collided,
            next: prev.next
        }))
    }
    const resetPlayer = useCallback(() => {
        const currentPiece = player.next;
        const nextPiece = randomTetromino();
        setPlayer(prev => ({
            pos: {x: Math.floor(STAGE_WIDTH / 2 - 1), y: 0},
            tetromino: currentPiece,
            collided: false,
            next: nextPiece.shape
        }))
    }, [player.next])
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}