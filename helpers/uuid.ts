import { UUID } from "../types";

const uuidPattern: UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

export const uuid = (): UUID => {
    let currentTime = new Date().getTime();
    const uuid = uuidPattern.replace(/[xy]/g, (character: string) => {
        const randomNumber = (currentTime + Math.random() * 16) % 16 | 0;
        currentTime = Math.floor(currentTime / 16);
        return (character === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8)).toString(16);
    });
    return uuid as UUID;
}
