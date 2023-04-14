import { Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { collID, databases, dbID } from "../appwriteConfig";
import { useLocation } from "react-router-dom";

function Game() {
  const { width, height } = useViewportSize();
  const Boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const location = useLocation();
  const locationArr = location.pathname.split("/");
  const gameID = locationArr[locationArr.length - 1];

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

  const [currPlayer, setCurrPlayer] = useState("O");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${dbID}.collections.${collID}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        console.log(response.payload);
      }
    );
  }, []);

  // setInterval(() => {
  //   const latestGameData = databases.getDocument(dbID, collID, gameID);
  //   latestGameData
  //     .then((res) => {
  //       // console.log(res.val0);
  //       setBoxCount({
  //         ...boxCount,
  //         val0: res.val0,
  //         val1: res.val1,
  //         val2: res.val2,
  //         val3: res.val3,
  //         val4: res.val4,
  //         val5: res.val5,
  //         val6: res.val6,
  //         val7: res.val7,
  //         val8: res.val8,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, 50000);
  console.log(boxCount);

  const boxClick = (idx) => {
    if (
      winner === "" &&
      (boxCount[`val${idx}`] === undefined || boxCount[`val${idx}`] === "")
    ) {
      switch (idx) {
        case 0:
          setBoxCount({ ...boxCount, val0: currPlayer });
          victory();
          break;
        case 1:
          setBoxCount({ ...boxCount, val1: currPlayer });
          victory();
          break;
        case 2:
          setBoxCount({ ...boxCount, val2: currPlayer });
          victory();
          break;
        case 3:
          setBoxCount({ ...boxCount, val3: currPlayer });
          victory();
          break;
        case 4:
          setBoxCount({ ...boxCount, val4: currPlayer });
          victory();
          break;
        case 5:
          setBoxCount({ ...boxCount, val5: currPlayer });
          victory();
          break;
        case 6:
          setBoxCount({ ...boxCount, val6: currPlayer });
          victory();
          break;
        case 7:
          setBoxCount({ ...boxCount, val7: currPlayer });
          victory();
          break;
        case 8:
          setBoxCount({ ...boxCount, val8: currPlayer });
          victory();
          break;

        default:
          break;
      }
    } else {
      return;
    }

    currPlayer === "O" ? setCurrPlayer("X") : setCurrPlayer("O");
  };

  useEffect(() => {
    const updateGameData = databases.updateDocument(dbID, collID, gameID, {
      val0: boxCount.val0,
      val1: boxCount.val1,
      val2: boxCount.val2,
      val3: boxCount.val3,
      val4: boxCount.val4,
      val5: boxCount.val5,
      val6: boxCount.val6,
      val7: boxCount.val7,
      val8: boxCount.val8,
    });
    updateGameData
      .then(() => {
        // console.log(gameID);
      })
      .catch((err) => console.log(err));

    victory();
  }, [boxClick]);

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

      if (
        boxCount[`val${a}`] !== null &&
        boxCount[`val${b}`] !== null &&
        boxCount[`val${c}`] !== null
      ) {
        if (
          boxCount[`val${a}`] &&
          boxCount[`val${a}`] === boxCount[`val${b}`] &&
          boxCount[`val${a}`] === boxCount[`val${c}`]
        ) {
          setWinner(boxCount[`val${a}`]);

          return;
        }
      } else {
        return;
      }
    }
  }

  const handleReset = () => {
    setWinner("");
    setCurrPlayer("O");
    setBoxCount({
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
  };
  const userSignOut = () => {
    const deleteGame = databases.deleteDocument(dbID, collID, gameID);
    deleteGame
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    handleReset();
  };

  return (
    <div className="Game">
      <nav className="navbar">
        <h2>Tic-Tac-Toe</h2>
        <div className="Restart-btn" onClick={handleReset}>
          <span>RESTART</span>
        </div>
        <div className="Restart-btn" onClick={userSignOut}>
          <span>SIGN OUT</span>
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
