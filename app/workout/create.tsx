import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import { useExerciseContext } from "@/components/ExerciseProvider";
import ExerciseItemList from "@/components/ExerciseItemList";
import ExerciseModal from "@/components/ExerciseModal";
import Input from "@/components/Input";
import { Exercise } from "@/domain/models";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { useWorkoutContext } from "@/components/WorkoutProvider";
import { useServiceContext } from "@/components/ServiceProvider";
import useModal from "@/hooks/useModal";

export default function CreateWorkout() {
  const {
    exercises,
    create,
    remove,
    reset,
    update: updateExercise,
  } = useExerciseContext();
  const { save, update, loadById } = useWorkoutContext();
  const [name, setName] = useState("");
  // const [showModal, setShowModal] = useState(false);
  const { isVisible, toggle } = useModal();
  //check if it's editing
  const { id } = useGlobalSearchParams();

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const handleCreate = (exercise: Exercise) => {
    if (editingExercise) {
      updateExercise(exercise);
    } else {
      const created = create(exercise);
      if (!created) {
        return;
      }
    }
    handleCloseModal();
  };
  useEffect(() => {
    if (id) {
      const fetch = async () => {
        const workout = await loadById(id as string);
        setName(workout?.name ?? "");
        for (const ex of workout?.exercises ?? []) {
          create(ex);
        }
      };
      fetch();
    }
    return () => {
      reset();
    };
  }, [id]);
  const handleSave = async () => {
    const workout = { name, exercises };
    if (!id) {
      await save(workout);
    } else {
      await update({ ...workout, id: id as string });
    }
  };
  const handleCloseModal = () => {
    toggle();
    setEditingExercise(null);
  };
  return (
    <ContentView>
      <View style={{ flex: 1, gap: 24 }}>
        <Input
          onChangeText={setName}
          label="Nome do treino"
          value={name}
          editable={!id}
        ></Input>
        <FlatList
          data={exercises}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => {
                setEditingExercise(item);
                toggle();
              }}
            >
              <ExerciseItemList
                key={item.id}
                exercise={item}
                onRemove={remove}
              />
            </Pressable>
          )}
        />
      </View>

      <ExerciseModal
        visible={isVisible}
        data={editingExercise}
        onClose={handleCloseModal}
        onSave={handleCreate}
      ></ExerciseModal>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
        <DefaultButton
          title="Novo exercício"
          onPress={toggle}
          style={{ container: { alignSelf: "center" } }}
        />
        <DefaultButton
          title="Salvar"
          onPress={handleSave}
          style={{ container: { alignSelf: "center" } }}
        />
      </View>
    </ContentView>
  );
}
