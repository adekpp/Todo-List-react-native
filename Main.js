import React from "react";
import { StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { logout } from "./feauters/authSlice";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import { Text, HStack, Box, IconButton, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function Main() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: "Todo List",
              headerRight: () => (
                <Box flexShrink={1} alignItems="flex-end">
                  <HStack space={3} alignItems="center">
                    <Text>Hello, {user.username}!</Text>
                    <IconButton
                      size="sm"
                      colorScheme="trueGray"
                      icon={
                        <Icon
                          as={Entypo}
                          name="log-out"
                          size="md"
                          color="red.600"
                        />
                      }
                      onPress={() => dispatch(logout())}
                    />
                  </HStack>
                </Box>
              ),
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              headerTitle: "Login to your account",
            }}
          />
        )}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            headerTitle: "Register",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
