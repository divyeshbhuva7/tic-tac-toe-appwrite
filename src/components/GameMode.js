import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import tictactoelogo from "../tictactoelogo.png";
import { Group, Image, Paper, Text } from "@mantine/core";
import { account, client, collID, databases, dbID } from "../appwriteConfig";

function GameMode() {
  const navigate = useNavigate();
  const sharelink = client.config.endpoint;

  const [showGameLink, setShowGameLink] = useState(false);
  const [showCreateGameBtn, setShowCreateGameBtn] = useState(false);
  const [userID, setUserID] = useState("");
  const [gameID, setGameID] = useState("");

  useEffect(() => {
    setGameID(uuidv4().slice(0, 8));

    const getUser = account.get();
    getUser
      .then((res) => {
        const fullUserId = res.$id;
        setUserID(fullUserId.slice(0, 8));
      })
      .catch((err) => console.log(err));
  }, []);

  const onlineGame = () => {
    setShowGameLink(true);
    setShowCreateGameBtn(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${sharelink}/game/${userID}/${gameID}`);
  };

  function checkGameID() {
    if (gameID !== "") {
      navigate(`/game/${userID}/${gameID}`);
    } else {
      return;
    }
  }

  const StartGame = () => {
    const GameData = databases.createDocument(dbID, collID, gameID, {
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
    try {
      checkGameID();
    } catch (err) {
      console.log(err);
    }
    navigate(`/game/${userID}/${gameID}`);
  };

  return (
    <div className="gamemode-container signIn-container">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>

      <Paper className="signIn-box gamemode-box glassEffect">
        <div>
          {!showCreateGameBtn ? (
            <Group position="center">
              <button className="btn createGame-btn" onClick={onlineGame}>
                Create Game
              </button>
            </Group>
          ) : null}

          {showGameLink ? (
            <div className="gamestart-container">
              <Text className="link">{`${sharelink}/game/${userID}/${gameID}`}</Text>
              <div className="gamestart-btn">
                <button className="btn sharelink-btn" onClick={copyLink}>
                  Copy link
                </button>
                <button className="btn startgame-btn" onClick={StartGame}>
                  Start Game
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Paper>
    </div>
  );
}

export default GameMode;
