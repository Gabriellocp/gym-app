import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import { useExerciseContext } from "@/components/ExerciseProvider";
import ExerciseItemList from "@/components/ExerciseItemList";
import ExerciseModal from "@/components/ExerciseModal";
import Input from "@/components/Input";
import { Exercise } from "@/domain/models";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useNavigation } from "expo-router";
import { useWorkoutContext } from "@/components/WorkoutProvider";

export default function CreateWorkout() {
  const navigate = useNavigation();
  const { exercises, create, remove, reset } = useExerciseContext();
  const { save, update } = useWorkoutContext();
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleCreate = (exercise: Exercise) => {
    const created = create(exercise);
    if (!created) {
      return;
    }
    handleShowModal();
  };
  const handleSave = () => {
    const workout = { name, exercises };
    save(workout).then((v) => {
      update((prev) => {
        if (v) {
          return [...prev, v];
        }
        return prev;
      });
      navigate.goBack();
    });
  };
  useEffect(() => {
    reset();
  }, []);
  return (
    <ContentView>
      <View style={{ flex: 1, gap: 24 }}>
        <Input
          onChangeText={setName}
          label="Nome do treino"
          value={name}
        ></Input>
        <FlatList
          data={exercises}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          renderItem={({ item }) => (
            <ExerciseItemList
              key={item.name}
              exercise={item}
              onRemove={remove}
            />
          )}
        />
      </View>
      {showModal && (
        <ExerciseModal
          onClose={handleShowModal}
          onSave={handleCreate}
        ></ExerciseModal>
      )}
      <DefaultButton
        title="Novo exercício"
        onPress={handleShowModal}
        style={{ container: { alignSelf: "center" } }}
      />
      <DefaultButton
        title="Salvar"
        onPress={handleSave}
        style={{ container: { alignSelf: "center" } }}
      />
    </ContentView>
  );
}
