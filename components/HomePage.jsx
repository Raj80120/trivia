"use client";
import React, { useState } from "react";
import { numberOfQuestions } from "@/constants";
import { dificultyLevel } from "@/constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trivia_categories } from "@/constants";
const HomePage = () => {
  const API_URL = "https://opentdb.com/api_category.php";
  const [categoryData, setcategoryData] = useState([]);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDificultyOpen, setIsDificultyOpenOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(
    "Choose number of Questions"
  );
  const [category, setcategory] = useState("Choose category");
  const [categoryId, setcategoryId] = useState(0);

  const [dificulty, setDificulty] = useState("Choose dificulty");

  const noOfQustionsDropdown = () => {
    setIsOpen(!isOpen);
  };
  const categoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };
  const dificultyDropdown = () => {
    setIsDificultyOpenOpen(!isDificultyOpen);
  };

  const handleQuestion = (value) => {
    setNoOfQuestions(value);
    setIsOpen(false);
  };
  const handleCatrgory = (value, id) => {
    setcategory(value);
    setcategoryId(id);
    setIsCategoryOpen(false);
  };
  const handleDificulty = (value) => {
    setDificulty(value);
    setIsDificultyOpenOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("noOfQuestions", noOfQuestions);
    sessionStorage.setItem("category", categoryId);
    sessionStorage.setItem("dificulty", dificulty);
    sessionStorage.setItem("userName", userName);
    if (
      userName != "" &&
      noOfQuestions != 0 &&
      category != "" &&
      dificulty !== ""
    ) {
      router.push("/questions");
    }
    // router.push("/questions");
  };
  useEffect(() => {
    setcategoryData(trivia_categories);

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(API_URL);
    //     const result = await response.json();
    //     setcategoryData(result.trivia_categories);
    //     console.log(result);
    //   } catch (err) {
    //     console.log(err.stack);
    //   }
    // };
    // (async () => await fetchData())();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="flex justify-center items-center font-semibold text-[22px]">
          Trivia Time
        </h1>
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Enter your Name"
            required
            className="border p-2 mt-5"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {/* number of questions dropdown start */}

          <div>
            <button
              type="button"
              className="border w-full p-2 mt-3"
              onClick={noOfQustionsDropdown}
              required
            >
              {noOfQuestions}
            </button>
            {isOpen && (
              <ul className="w-full h-20 overflow-auto">
                {numberOfQuestions.length !== 0
                  ? numberOfQuestions.map((item) => (
                      <li
                        key={item.id}
                        className="border p-2 cursor-pointer"
                        onClick={() => handleQuestion(item.value)}
                      >
                        {item.value}
                      </li>
                    ))
                  : "oops,no result"}
              </ul>
            )}
          </div>

          {/* <CustomDropdown
              numberOfQuestions={numberOfQuestions}
              noOfQustionsDropdown={noOfQustionsDropdown}
              handleQuestion={handleQuestion}
              isOpen={isOpen}
            /> */}
          {/* number of questions dropdown End */}

          {/* category dropdown start */}
          <div>
            <button
              type="button"
              className="border w-full p-2 mt-3"
              onClick={categoryDropdown}
              required
            >
              {category}
            </button>
            {isCategoryOpen && (
              <ul className="w-full h-20 overflow-auto">
                {categoryData.length !== 0
                  ? categoryData.map((item) => (
                      <li
                        key={item.id}
                        className="border p-2 cursor-pointer"
                        onClick={() => handleCatrgory(item.name, item.id)}
                      >
                        {item.name}
                      </li>
                    ))
                  : "oops,no result"}
              </ul>
            )}
          </div>
          {/* category dropdown End */}

          {/* dificulty dropdown start */}
          <div>
            <button
              type="button"
              className="border w-full p-2 mt-3"
              onClick={dificultyDropdown}
              required
            >
              {dificulty}
            </button>
            {isDificultyOpen && (
              <ul className="w-full">
                {dificultyLevel.length !== 0
                  ? dificultyLevel.map((item) => (
                      <li
                        key={item.id}
                        className="border p-2 cursor-pointer "
                        onClick={() => handleDificulty(item.value)}
                      >
                        {item.value}
                      </li>
                    ))
                  : "oops,no result"}
              </ul>
            )}
          </div>
          {/* dificulty dropdown End */}

          <button
            type="submit"
            className="w-full bg-gray-400 text-white mt-4 p-3"
            onClick={(e) => handleSubmit(e)}
          >
            Start Trivia
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
