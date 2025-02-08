export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // Only process non-empty tetromino cells
            if (player.tetromino[y][x] !== 0) {
                const newX = x + player.pos.x + moveX;
                const newY = y + player.pos.y + moveY;

                // Check boundaries and existing blocks
                if (
                    newX < 0 || // Left boundary
                    newX >= STAGE_WIDTH || // Right boundary
                    newY >= STAGE_HEIGHT || // Bottom boundary
                    (newY >= 0 && stage[newY] && stage[newY][newX] && stage[newY][newX][1] !== 'clear') 
                ) {
                    return true;
                }
            }
        }
    }
    return false;
};