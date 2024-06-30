import { Subscription } from "@/types";
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer, useState } from "react";

type State = {
    preferredCurrency: Subscription["currency"]
}

type Action = {
    type: 'currency',
    currency?: Subscription["currency"]
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "currency": {
            if (!action.currency) {
                console.warn("No currency passed");
                return state;
            }
            return { ...state, preferredCurrency: action.currency };
        }
    }
}

const Context = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, { preferredCurrency: '€' });


    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export const useSettings = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useSettings must be used within SettingsProvider");

    return context.state;
}

export const useSetPreferredCurrency = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error("useSetPreferredCurrency must be used within SettingsProvider");

    const set = (currency: Subscription["currency"]) => context.dispatch({ type: 'currency', currency });
    return set;
}