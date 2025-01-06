import { DefaultColors } from "@/constants/Colors";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Counter({ time }: { time: number }) {
  const [timer, setTimer] = useState(0);
  setTimeout(() => {
    setTimer((prev) => prev + 1);
  }, 1000);
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: timer > time ? DefaultColors.error : DefaultColors.accent,
        }}
      >
        {timer}
      </Text>
    </View>
  );
}
