const uuidPattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

const uuid = () => {
  let currentTime = new Date().getTime();
  const uuid = uuidPattern.replace(/[xy]/g, (character) => {
    const randomNumber = (currentTime + Math.random() * 16) % 16 | 0;
    currentTime = Math.floor(currentTime / 16);
    return (character === "x" ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

console.log(uuid());
