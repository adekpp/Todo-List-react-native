import { Text, View } from "native-base";

export const toastConfig = () => {
  return {
    errorToast: ({ text1, props }) => (
      <View py={2} px={3} bgColor="red.400" borderRadius={50}>
        <Text fontSize={14} fontWeight="bold" color={"white"}>
          {text1}
        </Text>
      </View>
    ),
  };
};
