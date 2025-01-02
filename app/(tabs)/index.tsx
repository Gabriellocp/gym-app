import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import { Link } from "expo-router";
export default function Home() {
  return (
    <ContentView>
      <Link href="/workout/select" asChild>
        <DefaultButton title="Iniciar treino" />
      </Link>
    </ContentView>
  );
}
