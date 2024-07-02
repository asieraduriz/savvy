import { useState, useCallback } from 'react';

type ToggleHook = (initialState?: boolean) => [
    isToggled: boolean,
    toggle: {
        on: () => void;
        off: () => void;
        flip: () => void;
    }
]

export const useToggle: ToggleHook = (initialState = false) => {
    const [isToggled, setState] = useState<boolean>(initialState);

    const on = useCallback(() => setState(true), []);
    const off = useCallback(() => setState(false), []);
    const flip = useCallback(() => setState(prev => !prev), []);

    return [isToggled, { on, off, flip }]
};