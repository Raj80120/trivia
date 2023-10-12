"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { questions, testData } from "@/constants";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
const Questions = () => {
  const router = useRouter();
  const noOfQuestions = sessionStorage.getItem("noOfQuestions");
  const category = sessionStorage.getItem("category");
  const dificulty = sessionStorage.getItem("dificulty");
  // https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${dificulty}&type=multiple
  // const API_URL = `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${dificulty}&type=multiple`;
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  let [points, setPoints] = useState(0);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       const resultData = await response.json();
  //       setQuestions(resultData);
  //       console.log(questions);
  //       // const {
  //       //   results: [{ correct_answer, incorrect_answers }],
  //       // } = resultData;
  //       // const options = [correct_answer, ...incorrect_answers];
  //       // setCorrectAnswer(correct_answer);
  //       // setWrongAnswer(incorrect_answers);
  //       // shuffleOptions(options);
  //     } catch (err) {
  //       console.log(err.stack);
  //     }
  //   };
  //   (async () => await fetchData())();
  // }, []);

  useEffect(() => {
    testData.length !== 0 ? shuffleOptions() : null;
  }, [currentQuestion]);

  const shuffleOptions = () => {
    const option = [
      testData.results[currentQuestion].correct_answer,
      ...testData.results[currentQuestion].incorrect_answers,
    ];
    for (let i = option.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [option[i], option[j]] = [option[j], option[i]];
    }
    setOptions(option);
  };
  // const handleAnswer = (answer) => {
  //   setCorrectAnswer(answer);
  //   console.log(answer);
  // };
  const handleSubmit = () => {
    if (2 > currentQuestion) {
      if (testData.results[currentQuestion].correct_answer === correctAnswer) {
        let score = points + 1;
        setPoints(score);
      }
      // questions.results[currentQuestion].correct_answer === correctAnswer
      //   ? setPoints(points + 1)
      //   : null;

      setCurrentQuestion(currentQuestion + 1);
      console.log(`answer at submit ${correctAnswer}`);
    } else {
      console.log(`points ${points}`);
      sessionStorage.setItem("points", points);
      router.push("/result");
    }
  };
  return (
    <div className="w-full mt-[30vh] p-5">
      <div className="flex flex-col  justify-center max-w-[600px] mx-auto ">
        <div>
          <h1 className="font-semibold text-[20px] flex justify-start">
            {testData.length !== 0 &&
              testData.results[currentQuestion].question}
          </h1>
        </div>
        <div className="flex flex-row justify-between flex-wrap mt-6">
          {options.map((item) => (
            <button
              type="button"
              className="flex w-[40%] border p-2  mb-4  items-center justify-center cursor-pointer focus:bg-blue-600 focus:text-white "
              key={item}
              value={item}
              onClick={() => setCorrectAnswer(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {testData.length !== 0 && (
          <div className="flex flex-row justify-center">
            <button
              className="border p-2 w-[30%] cursor-pointer active:bg-blue-600 active:text-white  "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}

        {testData.length === 0 && (
          <div>
            <p>oops ,something went wrong </p>
          </div>
        )}

        {/* {questions.length !== 0 ? (
          questions.results.map((item) => (
            <div key={item.category}>
              <h1 className="font-semibold text-[20px] flex justify-start">
                {item.question}
              </h1>
              <div className="flex flex-row justify-between flex-wrap mt-6">
                {options.map((option) => (
                  <button
                    className="flex w-[40%] border p-2  mb-4  items-center justify-center"
                    key={option}
                  >
                    {option}
                  </button>
                ))}
                <button className="flex w-[40%] border p-2  mb-4  items-center justify-center">
                  {item.correct_answer}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full  mt-[40%]">
            <p className="flex flex-row justify-center items-center">
              oops,no data found
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Questions;
