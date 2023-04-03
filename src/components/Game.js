import { Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { client, collID, databases, dbID } from "../appwriteConfig";

function Game() {
  const { width, height } = useViewportSize();
  const Boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const [boxCount, setBoxCount] = useState({
    val0: "",
    val1: "",
    val2: "",
    val3: "",
    val4: "",
    val5: "",
    val6: "",
    val7: "",
    val8: "",
  });

  const [gameID, setGameID] = useState("");
  const [user, setUser] = useState("O");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const gamedata = databases.listDocuments(dbID, collID);
    gamedata
      .then((res) => {
        setGameID(res.documents[0].$id);
      })
      .catch((err) => console.log(err));
  }, []);

  const boxClick = (idx) => {
    if (
      winner === "" &&
      (boxCount[`val${idx}`] === undefined || boxCount[`val${idx}`] === "")
    ) {
      switch (idx) {
        case 0:
          setBoxCount({ ...boxCount, val0: user });
          break;
        case 1:
          setBoxCount({ ...boxCount, val1: user });
          break;
        case 2:
          setBoxCount({ ...boxCount, val2: user });
          break;
        case 3:
          setBoxCount({ ...boxCount, val3: user });
          break;
        case 4:
          setBoxCount({ ...boxCount, val4: user });
          break;
        case 5:
          setBoxCount({ ...boxCount, val5: user });
          break;
        case 6:
          setBoxCount({ ...boxCount, val6: user });
          break;
        case 7:
          setBoxCount({ ...boxCount, val7: user });
          break;
        case 8:
          setBoxCount({ ...boxCount, val8: user });
          break;

        default:
          break;
      }
      const updateGameData = databases.updateDocument(dbID, collID, gameID, {
        ...boxCount,
      });
      updateGameData
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      return;
    }

    user === "O" ? setUser("X") : setUser("O");
  };

  // victory cases -------------------------------------------------
  function victory() {
    const possibleCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < possibleCases.length; i++) {
      const [a, b, c] = possibleCases[i];

      console.log(boxCount[`val${a}`].value);

      // if (
      //   boxCount[a].val &&
      //   boxCount[a].val === boxCount[b].val &&
      //   boxCount[a].val === boxCount[c].val
      // ) {
      //   setWinner(boxCount[a].val);

      //   return;
      // }
    }
  }

  const handleReset = () => {
    setWinner("");
    setBoxCount([
      { val: "" },
      { val: "" },
      { val: "" },
      { val: "" },
      { val: "" },
      { val: "" },
      { val: "" },
      { val: "" },
      { val: "" },
    ]);
  };

  return (
    <div className="Game">
      <nav className="navbar">
        <h2>Tic-Tac-Toe</h2>
        <div className="btn Restart-btn" onClick={handleReset}>
          <span>Restart</span>
        </div>
      </nav>

      <div className="Gamepad">
        <div>
          <div className="board">
            {Boxes.map((elem, idx) => (
              <button className={`box`} key={idx} onClick={() => boxClick(idx)}>
                <Text c="red">{boxCount[`val${idx}`]}</Text>
              </button>
            ))}
          </div>
          <div className="horizontal-border">
            <div></div>
            <div></div>
          </div>
          <div className="verticle-border">
            <div></div>
            <div></div>
          </div>
        </div>
        {winner !== "" ? (
          <p className="winner-announcement">"{winner}" wins the game...!!</p>
        ) : null}
      </div>
      {winner !== "" ? <Confetti width={width} height={height} /> : null}
    </div>
  );
}

export default Game;
