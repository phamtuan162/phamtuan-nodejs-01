const handlePercentCorrect = (data, turnMax) => {
  const turnCorrect = data.length;
  const correct = data.some((item) => item.right);
  let percentResult = (((turnMax - turnCorrect) / turnMax) * 100).toFixed(2);
  if (turnCorrect === 1) {
    percentResult = 100;
  }
  if (turnCorrect === +turnMax && correct) {
    percentResult = ((1 / turnMax) * 100).toFixed(2);
  }
  if (turnCorrect === turnMax && !correct) {
    percentResult = 0;
  }
  return percentResult;
};
export default handlePercentCorrect;
