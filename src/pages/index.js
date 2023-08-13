import { useState } from "react";
import McqDataComponent from "./components/DynamicData/mcqDataComponent";
import TrueFalseComponent from "./components/DynamicData/trueFalseComponent";

export default function App() {
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
    type: "",
  });
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState({
    category_error: "",
    difficulty_error: "",
    type_error: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const { category, difficulty, type } = value;

    if (!category) {
      setHasError(true);
      setError((preState) => ({
        ...preState,
        category_error: "Please fill the category",
      }));
    }
    if (!difficulty) {
      setHasError(true);
      setError((preState) => ({
        ...preState,
        difficulty_error: "Please fill the difficulty",
      }));
    }
    if (!type) {
      setHasError(true);
      setError((preState) => ({
        ...preState,
        type_error: "Please fill the type",
      }));
    }

    if (!hasError) {
      const url = `https://opentdb.com/api.php?amount=5&category=${category}&type=${type}&difficulty=${difficulty}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setData(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  console.log(hasError, error);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {data.length == 0 || hasError ? (
        <div className="w-96 p-6 bg-white rounded shadow-md">
          <h1 className="text-3xl font-bold mb-2">Quizzical</h1>
          <h2 className="text-lg mb-4">
            Answer the questions and test your skills
          </h2>
          <div className="mb-4">
            <div className="bg-red-500">
              {error.category_error.length ? error.category_error : ""}
            </div>

            <label className="mr-2 font-semibold">category : </label>
            <select
              className="w-full px-2 py-1 border rounded"
              name="category"
              onChange={handleChange}
            >
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>
            </select>
          </div>
          <div className="mb-4">
            <div className="bg-red-500">
              {error.difficulty_error.length ? error.difficulty_error : ""}
            </div>
            <label className="mr-2 font-semibold">Difficulty : </label>
            <select
              name="difficulty"
              className="w-full px-2 py-1 border rounded"
              onChange={handleChange}
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <div className="bg-red-500">
              {error.type_error.length ? error.type_error : ""}
            </div>

            <label className="mr-2 font-semibold">Type of Questions : </label>
            <select
              className="w-full px-2 py-1 border rounded"
              onChange={handleChange}
              name="type"
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>
          <div>
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        {
          boolean: <TrueFalseComponent data={data} />,
          multiple: <McqDataComponent data={data} />,
        }[value.type]
      )}
    </div>
  );
}
