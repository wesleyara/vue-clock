import { daysOfWeek } from "./constants";

export const getCurrentHour = () => {
  const now = new Date();

  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const formatedHour = hour < 10 ? "0" + hour : hour;
  const formatedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formatedSeconds = seconds < 10 ? "0" + seconds : seconds;

  const str = `${formatedHour}:${formatedMinutes}:${formatedSeconds}`;

  return str;
};

export const readOccurrence = (occurrence: string | string[]) => {
  if (Array.isArray(occurrence)) {
    const findDay: string[] = [];

    if (occurrence.length === 7) {
      return "Diariamente";
    }

    occurrence.forEach(day => {
      const find = daysOfWeek.find(item => item.value === day);

      if (find) {
        findDay.push(find.abv);
      }
    });

    return findDay.join(", ");
  }

  return occurrence;
};
