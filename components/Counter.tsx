import { DefaultColors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Counter({ time }: { time: number }) {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
    totalSecondsTime: 0,
  });
  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => {
        const addMinute = Math.floor(prev.totalSecondsTime / 59);
        return {
          minutes: addMinute,
          seconds: Math.floor(prev.seconds / 59) === 1 ? 0 : prev.seconds + 1,
          totalSecondsTime: prev.totalSecondsTime + 1,
        };
      });
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "800",
          color:
            timer.totalSecondsTime > time
              ? DefaultColors.error
              : DefaultColors.accentText,
        }}
      >
        {`${timer.minutes.toString().padStart(2, "0")}:${timer.seconds
          .toString()
          .padStart(2, "0")}`}
      </Text>
    </View>
  );
}
