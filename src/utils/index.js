function calculateWinner(cur, size) {
    if (cur == null || cur.isX == null) return null;

    const numCellAdjacentSame = (squares) => {
        let count = 1;

        for (let i = 3; i >= 0; i--)
            if (squares[i]) count++;
            else break;
        for (let i = 5; i < 9; i++)
            if (squares[i]) count++;
            else break;

        return count;
    };

    const resetCheck5Squares = () => {
        return [false, false, false, false, true, false, false, false, false];
    };

    const getWinnerLocation = (state) => {
        let winnerLocation = [];
        for (let i = 3; i >= 0; i--)
            if (check5Squares[i]) {
                if (state === 1)
                    winnerLocation.push(
                        xCur + (deltaLocation[i] + yCur) * size
                    );
                else if (state === 2)
                    winnerLocation.push(deltaLocation[i] + xCur + yCur * size);
                else if (state === 3)
                    winnerLocation.push(
                        deltaLocation[i] +
                            xCur +
                            (deltaLocation[i] + yCur) * size
                    );
                else if (state === 4)
                    winnerLocation.push(
                        deltaLocation[i] +
                            xCur +
                            (deltaLocation[8 - i] + yCur) * size
                    );
            } else break;

        for (let i = 5; i < 9; i++)
            if (check5Squares[i]) {
                if (state === 1)
                    winnerLocation.push(
                        xCur + (deltaLocation[i] + yCur) * size
                    );
                else if (state === 2)
                    winnerLocation.push(deltaLocation[i] + xCur + yCur * size);
                else if (state === 3)
                    winnerLocation.push(
                        deltaLocation[i] +
                            xCur +
                            (deltaLocation[i] + yCur) * size
                    );
                else if (state === 4)
                    winnerLocation.push(
                        deltaLocation[i] +
                            xCur +
                            (deltaLocation[8 - i] + yCur) * size
                    );
            } else break;
        winnerLocation.push(xCur + yCur * size);
        return winnerLocation.sort((a, b) => a - b);
    };

    const xCur = cur.location.x,
        yCur = cur.location.y,
        isXCur = cur.squares[xCur + yCur * size],
        deltaLocation = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    let check5Squares = [
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
    ];

    // Duyệt hàng dọc
    for (let i = 0; i < deltaLocation.length; i++) {
        let tempY = deltaLocation[i] + yCur;
        if (i !== 4 && tempY < size && tempY >= 0) {
            if (
                cur.squares[xCur + tempY * size] != null &&
                cur.squares[xCur + tempY * size] === isXCur
            )
                check5Squares[i] = true;
        }
    }

    if (numCellAdjacentSame(check5Squares) === 5)
        return {
            // Chúng ta sẽ gửi về 2 giá trị là: Người thắng cuộc và vị trí thắng cuộc.
            winnerPlayer: cur.squares[xCur + yCur * size],
            winnerLocation: getWinnerLocation(1),
        };

    check5Squares = resetCheck5Squares();

    // Duyệt hàng ngang
    for (let i = 0; i < deltaLocation.length; i++) {
        let tempX = deltaLocation[i] + xCur;
        if (i !== 4 && tempX < size && tempX >= 0) {
            if (
                cur.squares[tempX + yCur * size] != null &&
                cur.squares[tempX + yCur * size] === isXCur
            )
                check5Squares[i] = true;
        }
    }

    if (numCellAdjacentSame(check5Squares) === 5)
        return {
            // Chúng ta sẽ gửi về 2 giá trị là: Người thắng cuộc và vị trí thắng cuộc.
            winnerPlayer: cur.squares[xCur + yCur * size],
            winnerLocation: getWinnerLocation(2),
        };
    check5Squares = resetCheck5Squares();

    // Duyệt đường chéo chính
    for (let i = 0; i < deltaLocation.length; i++) {
        let tempX = deltaLocation[i] + xCur;
        let tempY = deltaLocation[i] + yCur;
        if (
            i !== 4 &&
            tempX < size &&
            tempX >= 0 &&
            tempY < size &&
            tempY >= 0
        ) {
            if (
                cur.squares[tempX + tempY * size] != null &&
                cur.squares[tempX + tempY * size] === isXCur
            )
                check5Squares[i] = true;
        }
    }

    if (numCellAdjacentSame(check5Squares) === 5)
        return {
            // Chúng ta sẽ gửi về 2 giá trị là: Người thắng cuộc và vị trí thắng cuộc.
            winnerPlayer: cur.squares[xCur + yCur * size],
            winnerLocation: getWinnerLocation(3),
        };
    check5Squares = resetCheck5Squares();

    // Duyệt đường chéo phụ
    for (let i = 0; i < deltaLocation.length; i++) {
        let tempX = deltaLocation[i] + xCur;
        let tempY = deltaLocation[deltaLocation.length - 1 - i] + yCur;
        if (
            i !== 4 &&
            tempX < size &&
            tempX >= 0 &&
            tempY < size &&
            tempY >= 0
        ) {
            if (
                cur.squares[tempX + tempY * size] != null &&
                cur.squares[tempX + tempY * size] === isXCur
            )
                check5Squares[i] = true;
        }
    }

    if (numCellAdjacentSame(check5Squares) === 5)
        return {
            // Chúng ta sẽ gửi về 2 giá trị là: Người thắng cuộc và vị trí thắng cuộc.
            winnerPlayer: cur.squares[xCur + yCur * size],
            winnerLocation: getWinnerLocation(4),
        };
    check5Squares = resetCheck5Squares();

    return null;
}

export { calculateWinner };
