import {
  Group,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import tictactoelogo from "../tictactoelogo.png";
import { account } from "../appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [visible, { toggle }] = useDisclosure(false);

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupUser = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b$/.test(user.email);

    if (user.name === "") {
      setNameErr("Please enter user name.");
    } else if (user.name.length < 3) {
      setNameErr("User name should be at least 3 characters.");
    } else {
      setNameErr("");
    }

    if (user.email === "") {
      setEmailErr("Please enter email.");
    } else if (emailRegex === false) {
      setEmailErr("Please enter a valid email");
    } else {
      setEmailErr("");
    }

    if (user.password === "" || user.password.length < 8) {
      setPasswordErr("Please enter password.");
      return;
    } else {
      setPasswordErr("");
    }

    try {
      const newuser = account.create(
        uuidv4(),
        user.email,
        user.password,
        user.name
      );

      newuser
        .then((res) => {
          console.log(res);
          navigate("/signin");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signIn-container">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>

      <Paper className="signIn-box glassEffect">
        <Text className="Headings signIn-heading" mb="sm">
          Sign Up
        </Text>

        <div>
          <TextInput
            label="Name"
            title="Name"
            placeholder="Your name"
            className="login-input"
            styles={() => ({
              label: {
                color: theme.colors.gray[2],
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[8],
                },
                backgroundColor: theme.colors.blue[1],
              },
            })}
            required
            mb="xs"
            error={nameErr}
            onFocus={() => setNameErr("")}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />

          <TextInput
            label="Email"
            title="Email"
            placeholder="your@email.com"
            className="login-input"
            styles={() => ({
              label: {
                color: theme.colors.gray[2],
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[8],
                },
                backgroundColor: theme.colors.blue[1],
              },
            })}
            required
            mb="xs"
            error={emailErr}
            onFocus={() => setEmailErr("")}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />

          <PasswordInput
            className="login-input"
            withAsterisk
            label="Password"
            placeholder="Password"
            styles={(theme) => ({
              label: {
                color: theme.colors.gray[2],
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[8],
                },
                backgroundColor: theme.colors.blue[1],
              },
            })}
            error={passwordErr}
            onFocus={() => setPasswordErr("")}
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>

        <Group position="center" mt="xl">
          <button className="btn signIn-btn" size="sm" onClick={signupUser}>
            SIGN UP
          </button>
        </Group>
      </Paper>
    </div>
  );
}
