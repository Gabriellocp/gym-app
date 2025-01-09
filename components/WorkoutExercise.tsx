import {
  ActiveExercise,
  Exercise,
  ExerciseStatus,
  Status,
} from "@/domain/models";
import { Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";
import { useWorkoutContext } from "./WorkoutProvider";
import { useState } from "react";
import Counter from "./Counter";

type WorkoutExerciseProps = {
  exercise: ActiveExercise;
  status: ExerciseStatus;
  onControl: (exercise: ActiveExercise) => void;
  canPlay?: boolean;
};
export default function WorkoutExercise({
  exercise,
  status,
  onControl,
  canPlay = true,
}: WorkoutExerciseProps) {
  const { startSet, pauseSet, finishSet, resumeSet } = useWorkoutContext();
  const [isLastSet, setIsLastSet] = useState(false);
  const handleControl = (cb: ActiveExercise | null | undefined) => {
    const ex = cb;
    if (!ex) {
      return;
    }
    if (ex.currentSet >= ex.sets) {
      setIsLastSet(true);
    }
    onControl(ex);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: DefaultColors.primary,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {exercise.name}
        </Text>
        <View>
          <Text>Séries: {exercise.sets}</Text>
          {canPlay && (
            <>
              <Text>Intervalo: {exercise.interval}</Text>
              <Text>Intervalo: {exercise.currentSet}</Text>
            </>
          )}
        </View>
      </View>
      {canPlay && (
        <View>
          {
            {
              DOING: (
                <>
                  <DefaultButton
                    title={"INTERVAL"}
                    onPress={() => handleControl(pauseSet())}
                  />
                  {/* <DefaultButton title={"FINISH"} onPress={onChange} /> */}
                </>
              ),
              INTERVAL: (
                <>
                  <Counter time={exercise.interval} />
                  {!isLastSet && (
                    <DefaultButton
                      title={"RESUME"}
                      onPress={() => handleControl(resumeSet())}
                    />
                  )}
                  <DefaultButton
                    title={"FINISH"}
                    onPress={() => handleControl(finishSet())}
                  />
                </>
              ),
              FINISHED: (
                <View>
                  <Text>CONGRATS!</Text>
                </View>
              ),
              UNDONE: (
                <DefaultButton
                  title={"PLAY"}
                  onPress={() => handleControl(startSet(exercise))}
                />
              ),
            }[status]
          }
        </View>
      )}
    </View>
  );
}
