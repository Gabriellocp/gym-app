import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import { useExerciseContext } from "@/components/ExerciseProvider";
import ExerciseItemList from "@/components/ExerciseItemList";
import ExerciseModal from "@/components/ExerciseModal";
import Input from "@/components/Input";
import { IExercise } from "@/infra/models";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function CreateWorkout() {
  const { exercises, create, save } = useExerciseContext();
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleCreate = (exercise: IExercise) => {
    const created = create(exercise);
    if (!created) {
      return;
    }
    handleShowModal();
  };
  const handleSave = () => {
    save(name, exercises);
  };
  return (
    <ContentView>
      <View style={{ flex: 1, gap: 24 }}>
        <Input onChangeText={setName}></Input>
        <FlatList
          data={exercises}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          renderItem={({ item }) => (
            <ExerciseItemList key={item.name} exercise={item} />
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
