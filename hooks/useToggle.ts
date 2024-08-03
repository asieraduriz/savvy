import { useState, useCallback } from "react";

type ToggleHook = (initialState?: boolean) => [
    isToggled: boolean,
    toggle: {
        on: () => void;
        off: () => void;
        flip: () => void;
    }
];

export const useToggle: ToggleHook = (initialState = false) => {
    const [isToggled, setState] = useState<boolean>(initialState);

    const on = useCallback(() => setState(true), []);
    const off = useCallback(() => setState(false), []);
    const flip = useCallback(() => setState((prev) => !prev), []);

    return [isToggled, { on, off, flip }];
};

type AnimateHook = () => [animate: "left" | "right" | undefined, flip: () => void];

export const useAnimateToggle: AnimateHook = () => {
    const [animate, setAnimate] = useState<ReturnType<AnimateHook>[0]>(undefined);

    const flip = useCallback(() => setAnimate((prev) => (prev === "left" ? "right" : "left")), []);

    return [animate, flip];
};
