import React, { useCallback } from "react";
import SingleTodo from "../components/SingleTodo";
import { useState, useEffect } from "react";
import { getTodos, addTodo } from "../feauters/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { RefreshControl, ScrollView } from "react-native";
import { Input, Box, VStack, HStack, Button, Text } from "native-base";
import { ActivityIndicator } from "react-native";

const Home = () => {
  const dispatch = useDispatch();
  const { todos, loading, onAddLoading } = useSelector((state) => state.todos);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getTodos()).then(() => setRefreshing(false));
  }, []);

  const handleAdd = () => {
    if (!text) {
      return;
    }

    const todo = {
      title: text,
      completed: false,
    };
    dispatch(addTodo(todo));
    setText("");
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box>
        <HStack>
          <HStack space={2} mt={5} flex={1} justifyContent="center">
            <Input
              w={300}
              h={50}
              placeholder="Add todo"
              onChangeText={(text) => {
                setText(text);
              }}
              value={text}
              bgColor="#fff"
              onSubmitEditing={handleAdd}
              maxLength={15}
            />
            <Button onPress={handleAdd} title="Add" color="brown">
              {onAddLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Add"
              )}
            </Button>
          </HStack>
        </HStack>
        <VStack mt={4}>
          {loading ? (
            <Box>
              <Text textAlign={"center"}>Loading...</Text>
            </Box>
          ) : (
            todos.map((todo) => <SingleTodo key={todo._id} todo={todo} />)
          )}
          {!loading && todos.length === 0 && (
            <Box>
              <Text textAlign={"center"}>No todos</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default Home;
