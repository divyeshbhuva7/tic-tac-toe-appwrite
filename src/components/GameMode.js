import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import tictactoelogo from "../tictactoelogo.png";
import { Group, Image, Paper, Text } from "@mantine/core";
import { account, client, collID, databases, dbID } from "../appwriteConfig";
import { Account } from "appwrite";

function GameMode() {
  const navigate = useNavigate();
  const sharelink = client.config.endpoint;

  const [showGameLink, setShowGameLink] = useState(false);
  const [deactiveOnlineBtn, setDeactiveOnlineBtn] = useState(false);
  const [gameID, setGameID] = useState("");

  useEffect(() => {
    setGameID(uuidv4().slice(0, 8));
  }, []);

  function checkGameID() {
    if (gameID !== "") {
      navigate(`/game/${gameID}`);
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
  };

  const onlineGame = () => {
    setShowGameLink(true);
    setDeactiveOnlineBtn(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${sharelink}/game/${gameID}`);
  };

  return (
    <div className="gamemode-container">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>

      <Paper className="gamemode-box">
        <Group className="gamemodes">
          {!deactiveOnlineBtn ? (
            <button className="gamemode-btn" onClick={onlineGame}>
              PLAY ONLINE
            </button>
          ) : null}
        </Group>

        {showGameLink ? (
          <div className="gamelink">
            <Text className="link">{`${sharelink}/game/${gameID}`}</Text>
            <button className="gamemode-btn share" onClick={copyLink}>
              Copy link
            </button>

            <button className="gamemode-btn start" onClick={StartGame}>
              Start Game
            </button>
          </div>
        ) : null}
      </Paper>
    </div>
  );
}

export default GameMode;
