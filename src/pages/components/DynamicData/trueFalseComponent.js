import { Check, Cross } from "@/styles/icons";
import { useState } from "react";
const TrueFalseComponent = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState({});

  function CheckCorrection(user_answer = "False", correct_answer) {
    if (user_answer == correct_answer) {
      return <Check />;
    } else {
      return <Cross />;
    }
  }
  return (
    <div className="flex flex-col min-h-screen min-w-full gap-20">
      <h1 className="text-[25pt] font-semibold"> True False</h1>
      <div className="w-full flex flex-col gap-5">
        {data.map((item, index) => {
          return (
            <div key={index} className="flex flex-between items-center gap-6">
              <input
                type="checkbox"
                disabled={submitted}
                className="w-max"
                onChange={(e) =>
                  setAnswer((pre) => ({
                    ...pre,
                    [index]: e.target.checked ? "True" : "False",
                  }))
                }
              />
              <p className="col-span-4 w-full">{item.question}</p>
              {submitted && CheckCorrection(answer[index], item.correct_answer)}
            </div>
          );
        })}
      </div>
      <button
        className="bg-blue-600 w-[120px] h-[40px] text-white"
        onClick={() => setSubmitted(true)}
      >
        Submit
      </button>
    </div>
  );
};

export default TrueFalseComponent;
