import React from 'react';
import Cell from './Cell';
import { StyledNextTetromino } from './styles/styledNextTetromino';

const NextTetromino = ({ tetromino }) => {
    // Create a 4x4 grid to consistently display all tetromino types
    const grid = Array(4).fill(Array(4).fill(0));

    // Calculate offsets to center the tetromino
    const startY = Math.floor((4 - tetromino.length) / 2);
    const startX = Math.floor((4 - tetromino[0].length) / 2);

    // Create display grid with centered tetromino
    const displayGrid = grid.map((row, y) =>
        row.map((_, x) => {
            const tetrominoY = y - startY;
            const tetrominoX = x - startX;

            if (
                tetrominoY >= 0 &&
                tetrominoY < tetromino.length &&
                tetrominoX >= 0 &&
                tetrominoX < tetromino[0].length
            ) {
                return tetromino[tetrominoY][tetrominoX];
            }
            return 0;
        })
    );

    return (
        <StyledNextTetromino>
            <div style={{ width: '70px' }}>
                Next:
                <span style={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(4, calc(15px))',
                    gridTemplateColumns: 'repeat(4, calc(15px))',
                    gap: '1px',
                    marginTop: '10px',
                    background: '#111',
                    padding: '2px',
                    border: '2px solid #333'
                }}>
                    {displayGrid.map((row, y) =>
                        row.map((cell, x) => (
                            <Cell key={`${y}-${x}`} type={cell} />
                        ))
                    )}
                </span>
            </div>
        </StyledNextTetromino>
    );
};

export default NextTetromino;