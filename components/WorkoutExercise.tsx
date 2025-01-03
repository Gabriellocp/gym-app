import { IActiveExercise, IExercise, IStatus } from "@/infra/models";
import { Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";
import { useWorkoutContext } from "./WorkoutProvider";

type WorkoutExerciseProps = {
  exercise: IExercise;
  status: IStatus;
  onStatusChanged: (status: IActiveExercise) => void;
};
export default function WorkoutExercise({
  exercise,
  status,
  onStatusChanged,
}: WorkoutExerciseProps) {
  const { startSet, pauseSet, finishSet, resumeSet } = useWorkoutContext();
  const handleControl = (cb: any) => {
    const ex = cb;
    if (!ex) {
      return;
    }
    onStatusChanged(ex);
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
          <Text>Intervalo: {exercise.interval}</Text>
        </View>
      </View>
      <View>
        {
          {
            ACTIVE: (
              <>
                <DefaultButton
                  title={"PAUSE"}
                  onPress={() => handleControl(pauseSet())}
                />
                {/* <DefaultButton title={"FINISH"} onPress={onChange} /> */}
              </>
            ),
            PAUSED: (
              <>
                <DefaultButton
                  title={"RESUME"}
                  onPress={() => handleControl(resumeSet())}
                />
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
    </View>
  );
}
