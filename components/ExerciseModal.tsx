import { Modal, ScrollView, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";
import { IExercise } from "@/infra/models";

type ExerciseModalProps = {
  onClose: () => void;
  onSave: (exercise: IExercise) => void;
};
export default function ExerciseModal({ onClose, onSave }: ExerciseModalProps) {
  const [exercise, setExercise] = useState<IExercise>({
    interval: 0,
    name: "",
    sets: 0,
  });
  const handleChange = (field: keyof IExercise) => (value: any) => {
    setExercise((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = () => {
    onSave(exercise);
  };
  return (
    <Modal onRequestClose={onClose} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.7)",
        }}
      >
        <View
          style={{
            backgroundColor: DefaultColors.background,
            justifyContent: "center",
            width: 320,
            height: 230,
            padding: 8,
            borderRadius: 16,
          }}
        >
          <ScrollView
            style={{ marginBottom: 8 }}
            contentContainerStyle={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Input
              label="Nome"
              value={exercise.name}
              onChangeText={handleChange("name")}
            ></Input>
            <Input
              keyboardType="numeric"
              label="Sets"
              value={exercise.sets.toString()}
              onChangeText={handleChange("sets")}
            ></Input>
            <Input
              keyboardType="numeric"
              label="Intervalo"
              value={exercise.interval.toString()}
              defaultValue={undefined}
              onChangeText={handleChange("interval")}
            ></Input>
            <Input
              label="Observações"
              value={exercise.observation ?? ""}
              onChangeText={handleChange("observation")}
            ></Input>
          </ScrollView>
          <DefaultButton center title="Salvar" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}
