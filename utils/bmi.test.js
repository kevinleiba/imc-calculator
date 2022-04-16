const { bmiToSentence, calculateBMI } = require("./bmi");

describe("BMI", () => {
  test("BMI to sentence", () => {
    expect(bmiToSentence(16)).toBe("Severe thinness");
    expect(bmiToSentence(17)).toBe("Underweight");
    expect(bmiToSentence(20)).toBe("Normal range");
    expect(bmiToSentence(29)).toBe("Overweight");
    expect(bmiToSentence(31)).toBe("Obese (Class I)");
    expect(bmiToSentence(36)).toBe("Obese (Class II)");
    expect(bmiToSentence(42)).toBe("Obese (Class III)");
  });

  test("can calculate a BMI", () => {
    expect(calculateBMI({ weight: 55, size: 170 })).toBe(19);
    expect(calculateBMI({ weight: 122, size: 180 })).toBe(37.7);
  });
});
