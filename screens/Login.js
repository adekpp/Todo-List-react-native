import { ActivityIndicator, Keyboard } from "react-native";
import { Box, Button, Text, Input } from "native-base";
import Toast from "react-native-toast-message";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../feauters/authSlice";
import { toastConfig } from "../components/errorToast";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginError, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginError) {
      showToast();
    }
    dispatch(clearError());
  }, [loginError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username: username, password: password }));
    Keyboard.dismiss();

    setUsername("");
    setPassword("");
  };

  const showToast = () => {
    Toast.show({
      type: "errorToast",
      text1: loginError,
      position: "top",
    });
    dispatch(clearError());
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.200"
    >
      <Box
        w="90%"
        bg="white"
        borderRadius={10}
        padding={10}
        shadowColor="black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.8}
        shadowRadius={3.84}
        elevation={5}
      >
        <Text
          fontSize={20}
          fontWeight="bold"
          textAlign="center"
          marginBottom={5}
        >
          Login
        </Text>
        <Input
          onChange={(e) => setUsername(e.nativeEvent.text)}
          placeholder="Username"
          mb={5}
          value={username}
        />
        <Input
          onChange={(e) => setPassword(e.nativeEvent.text)}
          type="password"
          placeholder="Password"
          mb={2}
          value={password}
        />
        <Text
          onPress={() => navigation.navigate("Register")}
          textDecorationLine="underline"
        >
          Don't have an account? Sing up here!
        </Text>
        <Button onPress={handleSubmit} disabled={loading} height={50} mt={2}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              fontSize={20}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Login
            </Text>
          )}
        </Button>
      </Box>
      <Toast config={toastConfig()} />
    </Box>
  );
};

export default Login;
