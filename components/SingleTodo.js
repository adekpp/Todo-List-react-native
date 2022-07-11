import React from "react";

import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../feauters/todosSlice";
import { IconButton, Checkbox, Text, HStack } from "native-base";
import { Feather } from "@expo/vector-icons";

const SingleTodo = ({ todo }) => {
  const dispatch = useDispatch();

  // const [isUpdating, setIsUpdating] = useState(false);
  // const [newTitle, setNewTitle] = useState("");

  // const handleUpdate = (todo) => {
  //   const newTodo = {
  //     ...todo,
  //     title: newTitle,
  //   };
  //   dispatch(updateTodo(newTodo));
  //   setIsUpdating(false);
  // };

  const handleCompleted = (todo) => {
    const newTodo = {
      ...todo,
      completed: todo.completed ? false : true,
    };

    dispatch(updateTodo(newTodo));
  };

  const handleDelete = (todo) => {
    dispatch(deleteTodo(todo._id));
  };

  return (
    <HStack
      w="100%"
      bgColor={todo.completed ? "#f5f5f5" : "#fff"}
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={3}
      borderBottomColor="#ccc"
      borderBottomWidth={1}
    >
      <Checkbox
        isChecked={todo.completed}
        accessible={true}
        accessibilityLabel="Checkbox"
        onChange={() => handleCompleted(todo)}
        value={todo.title}
        colorScheme="green"
      />

      <Text
        onPress={() => handleCompleted(todo)}
        width="100%"
        flexShrink={1}
        textAlign="left"
        mx="2"
        fontSize={16}
        strikeThrough={todo.completed}
        _light={{
          color: todo.completed ? "gray.400" : "coolGray.800",
        }}
        _dark={{
          color: todo.completed ? "gray.400" : "coolGray.50",
        }}
      >
        {todo.title}
      </Text>
      <IconButton
        size="sm"
        colorScheme="trueGray"
        icon={<Feather name="x" size={24} color="red" />}
        onPress={() => handleDelete(todo)}
      />
    </HStack>
  );
};

export default SingleTodo;
