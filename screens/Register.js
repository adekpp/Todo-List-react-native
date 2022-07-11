import { ActivityIndicator, Keyboard } from "react-native";
import { Box, Button, Text, Input } from "native-base";
import Toast from "react-native-toast-message";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../feauters/authSlice";
import { toastConfig } from "../components/errorToast";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { regError, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (regError) {
      showToast(regError);
    }
    dispatch(clearError());
  }, [regError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      showToast("Passwords do not match");
      return;
    }
    dispatch(register({ username: username, password: password }));
    Keyboard.dismiss();

    setUsername("");
    setPassword("");
    setRepeatPassword("");
  };

  const showToast = (text) => {
    Toast.show({
      type: "errorToast",
      text1: text,
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
          Register
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
        <Input
          onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
          type="password"
          placeholder="Repeat Password"
          mb={2}
          value={repeatPassword}
        />
        <Text
          onPress={() => navigation.navigate("Login")}
          textDecorationLine="underline"
        >
          Already have an account? Login here!
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
              Register
            </Text>
          )}
        </Button>
      </Box>
      <Toast config={toastConfig()} />
    </Box>
  );
};

export default Register;
