import { EditTransactionForm } from "@/components/EditTransactionForm";
import { useLocalSearchParams } from "expo-router";

export default () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) throw new Error("No id in edit/[id]");
  return <EditTransactionForm id={id} />;
};
