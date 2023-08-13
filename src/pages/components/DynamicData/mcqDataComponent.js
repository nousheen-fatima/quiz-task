import { Check, Cross } from "@/styles/icons";
import { useState } from "react";
const McqDataComponent = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState({});

  function CheckCorrection(user_answer, correct_answer) {
    if (user_answer == correct_answer) {
      return <Check />;
    } else {
      return <Cross />;
    }
  }
  return (
    <div className="flex flex-col min-h-screen min-w-full gap-20">
      <h1 className="text-[25pt] font-semibold"> Multiple Choice</h1>
      <div className="w-full flex flex-col gap-5">
        {data.map((item, index) => {
          return (
            <div key={index} className="flex flex-between items-center gap-6">
              <div className="flex flex-col items-center justify-between gap-10">
                <p className="text-start font-semibold">
                  {index + 1} : {item.question}
                </p>
                <div className="flex flex-col min-w-full gap-6">
                  {[...item.incorrect_answers, item.correct_answer].map(
                    (option, option_index) => {
                      return (
                        <div
                          key={option_index}
                          className="flex items-center gap-6"
                        >
                          <input
                            type="radio"
                            disabled={submitted}
                            name={item.correct_answer}
                            id=""
                            className="w-max"
                            onChange={(e) =>
                              setAnswer({ ...answer, [index]: option })
                            }
                          />
                          <p>{option}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
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

export default McqDataComponent;
