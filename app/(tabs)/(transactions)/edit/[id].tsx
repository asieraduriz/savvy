import { Pages } from "@/pages";
import { useLocalSearchParams } from "expo-router";

export default () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) throw new Error("No id in edit/[id]");
  return <Pages.EditTransaction id={id} />;
};
