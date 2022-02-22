import React, {useEffect, useState} from 'react';
import './App.scss';

function Square(props: { tile: Piece; row: number; col: number;}) {
  return <div className="square" style={{backgroundColor: GameTile.getColor(props.tile)}} />
}

enum Piece {
    Empty,
    Milk,
    Wall,
    Dad
}

class GameTile {
    static getColor(piece: Piece): string {
        switch (piece) {
            case Piece.Empty:
                return 'white';
            case Piece.Milk:
                return 'yellow';
            case Piece.Wall:
                return 'grey';
            case Piece.Dad:
                return 'brown';
            default:
                return 'white';
        }
    }
}

let level1:Piece[][] = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 0, 2, 2, 2, 2, 2, 2, 0, 2 ],
    [ 2, 0, 0, 0, 2, 0, 0, 0, 0, 2 ],
    [ 2, 2, 2, 0, 2, 0, 0, 2, Piece.Milk, 2 ],
    [ 2, Piece.Dad, 0, 0, 2, 2, 0, 0, 2, 2 ],
    [ 2, 2, 2, 0, 2, 0, 2, 0, 2, 2 ],
    [ 2, 0, 0, 0, 2, 0, 2, 0, 2, 2 ],
    [ 2, 0, 2, 0, 0, 0, 0, 0, 0, 2 ],
    [ 2, 0, 2, 0, 0, 0, 0, 0, 0, 2 ],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
];

function Board(props: {board: Piece[][]}) {
    return (
        <>
            {props.board.map((row, i) => (
                <div key={i} className="line">
                    {row.map((tile, j) => (
                        <Square key={j} tile={tile} row={i} col={j} />
                    ))}
                </div>
            ))}
        </>
    );
}

// Find Piece.Dad in a 2 dimensional array
function getPlayerLocation(board: Piece[][]): {row: number, col: number} | undefined {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === Piece.Dad) {
                return {row: i, col: j};
            }
        }
    }
}

function isBoardWin(board: Piece[][]) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === Piece.Milk) {
                return false;
            }
        }
    }

    return true;
}

// Take the Piece.Dad in the 2 dimensional array board and move it to the position if it is Piece.Empty
function movePlayer(board: Piece[][], direction:String): Piece[][] {
    let dadPosition = getPlayerLocation(board);

    if (dadPosition === undefined) return board;
    switch(direction) {
        case 'w':
            if (board[dadPosition.row - 1] && board[dadPosition.row - 1][dadPosition.col] === Piece.Empty) {
                board[dadPosition.row - 1][dadPosition.col] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            } else if (board[dadPosition.row - 1] && board[dadPosition.row - 1][dadPosition.col] === Piece.Milk) {
                board[dadPosition.row - 1][dadPosition.col] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            }
            return board;
        case 's':
            if (board[dadPosition.row + 1] && board[dadPosition.row + 1][dadPosition.col] === Piece.Empty) {
                board[dadPosition.row + 1][dadPosition.col] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            } else if (board[dadPosition.row + 1] && board[dadPosition.row + 1][dadPosition.col] === Piece.Milk) {
                board[dadPosition.row + 1][dadPosition.col] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            }
            return board;
        case 'a':
            if (board[dadPosition.row][dadPosition.col - 1] === Piece.Empty) {
                board[dadPosition.row][dadPosition.col - 1] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            } else if (board[dadPosition.row][dadPosition.col - 1] === Piece.Milk) {
                board[dadPosition.row][dadPosition.col - 1] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            }
            return board;
        case 'd':
            if (board[dadPosition.row][dadPosition.col + 1] === Piece.Empty) {
                board[dadPosition.row][dadPosition.col + 1] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            } else if (board[dadPosition.row][dadPosition.col + 1] === Piece.Milk) {
                board[dadPosition.row][dadPosition.col + 1] = Piece.Dad;
                board[dadPosition.row][dadPosition.col] = Piece.Empty;
            }
            return board;
        default:
            return board;
    }
}

function App() {
    let [gameBoard, setGameBoard] = useState(level1);
    let [won, setWon] = useState(false);

    useEffect(() => {
        document.addEventListener('keydown', function (event) {
            console.log(event.key);
            let gameBoardCopy = movePlayer([...gameBoard], event.key);

            if (isBoardWin(gameBoardCopy)) {
                setWon(true);
            }

            setGameBoard(gameBoardCopy);
        }, true);
    }, []);

  return (
    <div className="App">
        {won ? <h1>You won!</h1> : <Board board={[...gameBoard]} />}
    </div>
  );
}

export default App;
