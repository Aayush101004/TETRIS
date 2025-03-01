import { useCallback, useEffect, useMemo, useState } from "react";
export const useGameStatus = rowsCleared =>{
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
    const linePoints = useMemo(() => [0, 40, 0, 100, 0, 300, 0, 1200], []);
    const calcScore = useCallback(() => {
        if (rowsCleared > 0){
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prevRows => prevRows + rowsCleared);
        }
    }, [level, linePoints, rowsCleared])
    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);
    return [score, setScore, rows, setRows, level, setLevel];
}