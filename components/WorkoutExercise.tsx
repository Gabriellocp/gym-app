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
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: DefaultColors.accentText,
          }}
        >
          {exercise.name}
        </Text>

        <Text
          style={{
            flexDirection: "column",
            color: DefaultColors.accentText,
          }}
        >
          {`Séries: ${exercise.currentSet}/${exercise.sets}\n`}
          {`Reps: ${exercise.reps}\n`}
          {canPlay && `Intervalo: ${exercise.interval}`}
        </Text>
      </View>
      {canPlay && (
        <View>
          {
            {
              DOING: (
                <>
                  <DefaultButton
                    title={"Descanso"}
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
                      title={"Próxima"}
                      onPress={() => handleControl(resumeSet())}
                    />
                  )}
                  <DefaultButton
                    title={"Finalizar"}
                    onPress={() => handleControl(finishSet())}
                  />
                </>
              ),
              FINISHED: (
                <View>
                  <Text style={{ color: DefaultColors.accentText }}> ✅</Text>
                </View>
              ),
              UNDONE: (
                <DefaultButton
                  title={"Iniciar"}
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
