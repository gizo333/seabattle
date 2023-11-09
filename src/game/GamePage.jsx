import React, { useState, useEffect } from 'react';
import './gamePage.css';
import Sidebar from '../component/sidbar';
import ShipSelection from '../component/selectShip'

function GameBoard({ selectedShip, selectedShipQuantities, updateShipQuantities, maxShipQuantities, enemyIs,rows, cols, isGameStarted,board,attackEnemy,ships,setShips }) {
    let [startCell, setStartCell] = useState(0)
    let [endCell, setEndCell] = useState(0)

    // нажатие по ячейке 
    function handleCellClick(row, col) {
        if (isGameStarted && enemyIs) {
            attackEnemy(row, col)
        }
        if (selectedShip && !isGameStarted) {
            placeShip(row, col)
        }
    }

    function hasNeighboringOccupiedCells(board, row, col) {
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (isValidCell(board, i, j) && board[i][j].isOccupied) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function isValidCell(board, row, col) {
        return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
    }
    
    function canPlaceShip(board, startCell, endCell, shipLength) {
        for (let r = startCell.row; r <= endCell.row; r++) {
            for (let c = startCell.col; c <= endCell.col; c++) {
                if (board[r][c].isOccupied || hasNeighboringOccupiedCells(board, r, c)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // ставит корабль от startcell до endcell
    function placeShip(row, col) {
        if (startCell === 0) {
            startCell = { row, col };
        } else if (endCell === 0) {
            endCell = { row, col };
            const shipLength = selectedShip.length;
            let isHorizontal = startCell.row === endCell.row;
    
            if (
                (isHorizontal && endCell.col - startCell.col + 1 === shipLength) ||
                (!isHorizontal && endCell.row - startCell.row + 1 === shipLength)
            ) {
                if (canPlaceShip(board, startCell, endCell, shipLength) &&
                    selectedShipQuantities[selectedShip.name] < maxShipQuantities[selectedShip.name]) {
                    const shipCoordinates = [];
    
                    for (let r = startCell.row; r <= endCell.row; r++) {
                        for (let c = startCell.col; c <= endCell.col; c++) {
                            board[r][c].isOccupied = true;
                            shipCoordinates.push({ row: r, col: c });
                        }
                    }
    
                    updateShipQuantities({
                        ...selectedShipQuantities,
                        [selectedShip.name]: selectedShipQuantities[selectedShip.name] + 1
                    });
    
                    setShips([...ships, { type: selectedShip.name, coordinates: shipCoordinates, isHorizontal }]);
                }
            }
    
            console.log(board);
            setStartCell(0);
            setEndCell(0);
        }
    }
    
    
    return (
        <div className="game-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`cell ${cell.isOccupied ? 'occupied' : ''} ${enemyIs ? 'enemycell' : ''} ${cell.isAttacked ? 'attacked' : ''} ${cell.isMissed ? 'missed' : ''}`}
                            onClick={() => handleCellClick(cell.row, cell.col)}
                        >
                        </div>
                    ))}
                </div>
            ))}
        </div>

    );
}




// основной компонент
function Game() {
    const [selectedShipMessage, setSelectedShipMessage] = useState('');
    const rows = 10;
    const cols = 10;

    const [selectedShip, setSelectedShip] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [board, setBoard] = useState(() => initializeBoard(rows, cols));
    const [enemyBoard, setEnemyBoard] = useState(() => initializeBoard(rows, cols));
    const [ships, setShips] = useState([]);
    const [enemyShips, setEnemyShips] = useState([]);
    const [rememberAI, setRememberAI] = useState({ row: null, col: null });
    let [enemyScore, setEnemyScore] = useState(10);
    let [playerScore, setPlayerScore] = useState(10);

    const maxShipQuantities = {
        ShipOne: 4,
        ShipTwo: 3,
        ShipThree: 2,
        ShipFour: 1,
    };

    const [selectedShipQuantities, setSelectedShipQuantities] = useState({
        ShipOne: 0,
        ShipTwo: 0,
        ShipThree: 0,
        ShipFour: 0,
    });

    // нажатие на корабль
    function handleShipSelect(ship) {
        setSelectedShip(ship);
        setSelectedShipMessage(`Выбран корабль: ${ship.name}`);
    }

    // проверка умер ли корабль, bool type
    function isShipDestroyed(ship, board) {
        for (const coord of ship.coordinates) {
            const { row, col } = coord;
            if (!board[row][col].isAttacked) {
                return false; 
            }
        }
        return true;
    }

    // игрок атакует ячейку врага, затем автоматически срабатывает ход врага
    function attackEnemy(row, col) {
        if (isPlayerTurn) {
            let areYouAttacked = false;
            if (enemyBoard[row][col].isOccupied) {
                enemyBoard[row][col].isAttacked = true;
                const attackedShip = enemyShips.find((ship) => {
                    return ship.coordinates.some((coord) => coord.row === row && coord.col === col);
                });
                // корабль врага уничтожен
                if (attackedShip && isShipDestroyed(attackedShip, enemyBoard)) {
                    setEnemyScore(enemyScore - 1);
                    console.log('Enemy ship destroyed!');
                    if (enemyScore === 0) {
                        console.log('You win!');
                    }
                }
                areYouAttacked = true;
            } else {
                enemyBoard[row][col].isMissed = true;
            }
            setEnemyBoard([...enemyBoard]);

            if (areYouAttacked) {
                setIsPlayerTurn(true);
            } else {
                setIsPlayerTurn(false);
                setTimeout(() => {
                    enemyTurn();
                }, 10);
            }
            if (playerScore === 0) {
                console.log('You lose!');
            }
        }
    }
    
    
      // TODO: сделать таймаут на enemyturn() при попадании в корабль игрока
      function enemyTurn() {
            let areEnemyAttacked = false;
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
              if (board[randomRow][randomCol].isOccupied) {
                if (board[randomRow][randomCol].isAttacked) {
                    enemyTurn();
                }
                board[randomRow][randomCol].isAttacked = true;
                const attackedShip = ships.find((ship) => {
                    return ship.coordinates.some((coord) => coord.row === randomRow && coord.col === randomCol);
                });
                areEnemyAttacked=true;
                // корабль игрока уничтожен
                setRememberAI({row:randomCol,col:randomRow})
                if (attackedShip && isShipDestroyed(attackedShip, board)) {
                    setRememberAI({row:null,col:null})
                    setPlayerScore(playerScore--)
                    console.log('Ship destroyed!');
                }
              } else {
                if (board[randomRow][randomCol].isMissed) { // если уже промах
                    enemyTurn();
                }
                board[randomRow][randomCol].isMissed = true;
              }
              if (areEnemyAttacked) {
                setIsPlayerTurn(false);
                enemyTurn()
              }else{
                setIsPlayerTurn(true); 
              }
      }
    
    // нажатие кнопки начать игру
    function startGame() {
        console.log(enemyShips);
        const totalShipsPlaced = Object.values(selectedShipQuantities).reduce((sum, quantity) => sum + quantity, 0);

        if (isGameStarted === false && totalShipsPlaced > 0) { // totalShipsPlaced === 1o
            console.log("Игра началась!", ships)
            setIsGameStarted(true);
        }
    }

    // возвращает пустую доску
    function initializeBoard(rows, cols) {
        const board = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push({ row: i, col: j, isOccupied: false });
            }
            board.push(row);
        }
        return board;
    }

    // активируется когда игра еще не началась, генерация доски противника
    useEffect(() => {
        if (!isGameStarted && enemyShips.length === 0) {
            setEnemyBoard(randomizeEnemyShips([...enemyBoard], enemyShips));
        }
    }, [isGameStarted, enemyShips, enemyBoard, setEnemyBoard]);


    function randomBoolean() {
        return Math.random() < 0.5;
    }
    
    function getRandomCoordinate(max) {
        return Math.floor(Math.random() * max);
    }
    
    function hasDiagonalOverlap(board, row, col, rows, cols) {
        for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
                if (board[r][c].isOccupied) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function placeShipHorizontally(board, randomRow, randomCol, length, rows, cols) {
        const shipCoordinates = [];
    
        for (let c = randomCol; c < randomCol + length; c++) {
            if (board[randomRow][c].isOccupied || hasDiagonalOverlap(board, randomRow, c, rows, cols)) {
                return null; // Overlapping ships, invalid placement
            }
            shipCoordinates.push({ row: randomRow, col: c });
        }
    
        return shipCoordinates;
    }
    
    function placeShipVertically(board, randomRow, randomCol, length, rows, cols) {
        const shipCoordinates = [];
    
        for (let r = randomRow; r < randomRow + length; r++) {
            if (board[r][randomCol].isOccupied || hasDiagonalOverlap(board, r, randomCol, rows, cols)) {
                return null; // Overlapping ships, invalid placement
            }
            shipCoordinates.push({ row: r, col: randomCol });
        }
    
        return shipCoordinates;
    }
    
    function randomizeEnemyShips(board, enemyShips) {
        const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        const rows = board.length;
        const cols = board[0].length;
    
        for (const length of shipLengths) {
            let validPlacement = false;
    
            while (!validPlacement) {
                const isHorizontal = randomBoolean();
                const randomRow = getRandomCoordinate(rows);
                const randomCol = getRandomCoordinate(cols);
    
                let shipCoordinates = null;
    
                if (isHorizontal && randomCol + length <= cols) {
                    shipCoordinates = placeShipHorizontally(board, randomRow, randomCol, length, rows, cols);
                } else if (!isHorizontal && randomRow + length <= rows) {
                    shipCoordinates = placeShipVertically(board, randomRow, randomCol, length, rows, cols);
                }
    
                if (shipCoordinates !== null) {
                    validPlacement = true;
    
                    for (const coord of shipCoordinates) {
                        board[coord.row][coord.col].isOccupied = true;
                    }
    
                    enemyShips.push({ coordinates: shipCoordinates, isHorizontal });
                }
            }
        }
        return board;
    }
    
    
    

    return (
        <div className="main_container">
            <Sidebar />
            <div className="main_content">
                <div className="game-boards-container">
                    <GameBoard
                        selectedShip={selectedShip}
                        selectedShipQuantities={selectedShipQuantities}
                        maxShipQuantities={maxShipQuantities}
                        updateShipQuantities={setSelectedShipQuantities}
                        enemyIs={false}
                        isGameStarted={isGameStarted}
                        board={board}
                        setBoard={setBoard}
                        isPlayerTurn={isPlayerTurn}
                        setIsPlayerTurn={setIsPlayerTurn}
                        attackEnemy={attackEnemy}
                        ships={ships}
                        setShips={setShips}
                    />
                    <GameBoard
                        enemyIs={true}
                        isGameStarted={isGameStarted}
                        board={enemyBoard}
                        setBoard={setEnemyBoard}
                        isPlayerTurn={isPlayerTurn}
                        setIsPlayerTurn={setIsPlayerTurn}
                        attackEnemy={attackEnemy}
                        ships={ships}
                        setShips={setShips}
                    />
                </div>
                <ShipSelection
                onShipSelect={handleShipSelect}
                selectedShip={selectedShip}
                selectedShipQuantities={selectedShipQuantities}
                selectedShipMessage={`Выбран корабль: ${selectedShip ? selectedShip.name : 'не выбран'}`}
                ShipSelection startGame={startGame}
                ></ShipSelection>
            </div>
        </div>
    );
}

export default Game;
