import React, { useState, useRef, useCallback } from "react";
import { getMatrixOfNXM, gameOfLife } from "./logic";

const MATRIX_ROW_SIZE = 20;
const MATRIX_COLUMN_SIZE = 20;

function App() {
  const [grid, setGrid] = useState(getMatrixOfNXM(MATRIX_ROW_SIZE, MATRIX_COLUMN_SIZE));
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) => gameOfLife(g));
    setTimeout(runSimulation, 100);
  }, []);

  const updateGrid = (i, j) => {
    const newValue = !grid[i][j];
    setGrid((g) => {
      g[i][j] = newValue;
      return [...g];
    });
  };

  const onDrag = (i, j) => {
    setGrid((g) => {
      g[i][j] = 1;
      return [...g];
    });
  };

  return (
    <div className="App">
      <div className="functionality_bar">
        <div className="row">
          <div>
            <button
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                }
              }}
              style={{
                backgroundColor: running ? "#ffcdd2" : "#c8e6c9",
              }}
            >
              {running ? "Stop" : "Start"}
            </button>
          </div>
          <div>
            <button
              onClick={() => setGrid(getMatrixOfNXM(MATRIX_ROW_SIZE, MATRIX_COLUMN_SIZE))}
            >
              {"Clear"}
            </button>
          </div>
          <div>
            <button onClick={() => setGrid(getMatrixOfNXM(MATRIX_ROW_SIZE, MATRIX_COLUMN_SIZE, true))}>
              {"Random"}
            </button>
          </div>
        </div>
      </div>
      <div>
        {grid.map((row, i) => (
          <div className="row">
            {row.map((e, j) => (
              <div
                onDragOver={() => onDrag(i, j)}
                onDragStart={() => onDrag(i, j)}
                onDragCapture={() => onDrag(i, j)}
                onClick={() => updateGrid(i, j)}
              >
                <Box isAlive={e} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="hidden_text">Created with love by Moksh</div>
    </div>
  );
}

export default App;

function Box({ isAlive }) {
  const black = "#000000";
  return (
    <div
      className="grid_box"
      style={{
        backgroundColor: isAlive > 0 ? black : "white",
        color: isAlive > 0 ? black : "white",
      }}
    >
      {" "}
    </div>
  );
}
