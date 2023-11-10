import { RANGE_NUMBER } from "../config/config";

function getRandomNumber() {
  return Math.floor(Math.random() * RANGE_NUMBER - 1) + 1;
}
export default getRandomNumber;
