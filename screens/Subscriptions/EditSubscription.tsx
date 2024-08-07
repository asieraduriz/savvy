import { EditSubscriptionForm } from "@/components/EditSubscrptionForm";
import { View } from "@/components/Themed";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { FC } from "react";

type Props = {
  id: string;
};

export const EditSubscriptionScreen: FC<Props> = ({ id }) => {
  const { subscriptions } = useSubscriptions();
  const subscription = subscriptions.find((sub) => sub.id === id);

  if (!subscription) throw new Error(`No subscription with id ${id} found`);
  return (
    <View>
      <EditSubscriptionForm subscription={subscription} />
    </View>
  );
};
