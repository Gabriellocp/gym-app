import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import { useCreateExerciseContext } from "@/components/CreateExerciseProvider";
import ExerciseItemList from "@/components/ExerciseItemList";
import ExerciseModal from "@/components/ExerciseModal";
import Input from "@/components/Input";
import { useState } from "react";
import { FlatList, View } from "react-native";

export type IExercise = {
  name: string;
  sets: number;
  interval: number;
  observation?: string;
};

export default function CreateWorkout() {
  const { exercises, create } = useCreateExerciseContext();
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

  return (
    <ContentView>
      <View style={{ flex: 1, gap: 24 }}>
        <Input></Input>
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
    </ContentView>
  );
}
