function bmiToSentence(bmi) {
  if (bmi > 40) return "Obese (Class III)";
  if (bmi > 35) return "Obese (Class II)";
  if (bmi > 30) return "Obese (Class I)";
  if (bmi > 25) return "Overweight";
  if (bmi > 18.5) return "Normal range";
  if (bmi > 16.5) return "Underweight";
  return "Severe thinness";
}

function calculateBMI({ weight, size }) {
  const formattedSize = size / 100;

  const rawImc = weight / (formattedSize * formattedSize);
  const roundedImc = Math.round(rawImc * 10) / 10;
  return roundedImc;
}

module.exports = { bmiToSentence, calculateBMI };
