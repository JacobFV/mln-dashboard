import { Router } from "next/router";
import { pages } from "../constants";

/**
 * @description Creates a countdown from `start` to 0. Then navigates
 * @param start Time to start at
 */
export default function useCountdown(
  start: number,
  onCompletion: () => void,
  onTick: () => void = () => {}
) {
  let delay = 5;
  setInterval(() => {
    delay -= 1;
    onTick();
    if (delay == 0) {
      onCompletion();
    }
    // TODO: see if it is possible to go back
    const prevURL = null;
  });
}
