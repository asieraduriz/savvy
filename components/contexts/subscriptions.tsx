import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from "react";
import { Subscription } from "@/types";
import { InitialSubscriptions } from "./Stub";

type State = {
    subscriptions: Subscription[];
};

type Action = {
    type: "create" | "remove" | "update";
    subscription?: Subscription;
    id?: Subscription["id"]
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "create": {
            if (!action.subscription) {
                console.warn("No subscription passed");
                return state;
            }

            const subscriptions = Array.from(state.subscriptions);
            subscriptions.push(action.subscription);

            return { ...state, subscriptions };
        }
        case "remove": {
            if (!action.id) {
                console.warn("No subscription id passed");
                return state;
            }

            const subscriptions = Array.from(state.subscriptions).filter((subscription) => subscription.id !== action.id);

            return { ...state, subscriptions };
        }
        case "update": {
            if (!action.subscription) {
                console.warn("No subscription passed");
                return state;
            }

            const subscriptions = Array.from(state.subscriptions);
            const subscriptionIndex = subscriptions.findIndex((subscription) => subscription.id === action.subscription?.id);
            if (subscriptionIndex === -1) {
                console.warn("No subscription found");
                return state;
            }

            subscriptions[subscriptionIndex] = action.subscription;
            return { ...state, subscriptions };
        }
    }
};

const Context = createContext<(State & { dispatch: Dispatch<Action> }) | undefined>(undefined);

export const SubscriptionsProvider = (props: PropsWithChildren) => {
    const [{ subscriptions }, dispatch] = useReducer(reducer, { subscriptions: InitialSubscriptions });

    return <Context.Provider value={{ subscriptions, dispatch }}>{props.children}</Context.Provider>;
};

export const useSubscriptions = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useSubscriptions must be used within SubscriptionsProvider");

    return context.subscriptions;
};

export const useSubscription = (id: Subscription["id"]) => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useSubscription must be used within SubscriptionsProvider");

    const subscription = context.subscriptions.find((subscription) => subscription.id === id);
    if (!subscription) throw new Error(`Subscription ${id} not found`);
    return subscription;
}

export const useAddSubscription = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useAddSubscription must be used within SubscriptionsProvider");

    const create = (subscription: Subscription) => context.dispatch({ type: 'create', subscription })
    return create;
};

export const useRemoveSubscription = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useRemoveSubscription must be used within SubscriptionsProvider");

    const remove = (id: Subscription["id"]) => context.dispatch({ type: 'remove', id })
    return remove;
};

export const useUpdateSubscription = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useRemoveSubscription must be used within SubscriptionsProvider");

    const update = (id: Subscription["id"], subscription: Subscription) => context.dispatch({ type: 'update', id, subscription })
    return update;
}