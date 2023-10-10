import { config } from "./config.js";
import { client } from "./client.js";
import { renderQuesttion } from "./renderQuestion.js";
export const getQuestions = async (query = {}, isTotal = false) => {
  const queryString = new URLSearchParams(query).toString();
  const { response, data } = await client.get(`/quiz?${queryString}`);

  if (!isTotal) {
    renderQuesttion(data);
  }
  return data;
};
