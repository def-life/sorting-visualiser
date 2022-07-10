import React, { Fragment, useEffect, useState } from "react";
import "./Visualiser.css";
import mergeSort from "../../sortAlgos/mergeSort";
import { debounce, disable_btn, enable_btn } from "../../sortAlgos/util";
import quickSort from "../../sortAlgos/quickSort";
import heapSort from "../../sortAlgos/heapSort";

const RANGE = 0.6 * window.innerHeight;
const LOWER_LIMIT = 5;
const DELAY = 10;

export default function Visualiser() {
  const [array, setArray] = useState([]);

  function createArray() {
    const width = window.innerWidth;
    const temp = [];

    // due to inaccuracy of innerWidth 4 to 5 element might overflow so therefore is subtract 5
    for (let i = 0; i < (width - 0.2 * width) / 5 - 5; i++) {
      temp.push(Math.floor(Math.random() * RANGE + LOWER_LIMIT));
    }
    setArray(temp);
  }

  useEffect(() => {
    createArray();
    const delay = 500;

    function callback(ev) {
      createArray();
    }

    window.addEventListener("resize", debounce(callback, delay));

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);

  function animateHeapSort() {
    document.querySelector(".visualiser").scrollIntoView();
    disable_btn();
    const animations = heapSort(array);

    const bars = document.querySelectorAll(".bar");

    setTimeout(() => {
      enable_btn();
    }, DELAY * animations.length);

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [first, second, third] = animations[i];

        if (third === "color") {
          bars[first].style.background = "blue";
          bars[second].style.background = "blue";
        } else if (third === "revert") {
          bars[first].style.background = "orange";
          bars[second].style.background = "orange";
        } else {
          // swap
          const [first, firstVal, , second, secondVal] = animations[i];
          bars[first].style.height = `${firstVal}px`;
          bars[second].style.height = `${secondVal}px`;
        }

        if (i === animations.length - 1) {
          setArray([...array]);
        }
      }, i * DELAY);
    }
  }

  function animateMergeSort() {
    // first scroll to the top;
    document.querySelector(".visualiser").scrollIntoView();
    // disable buttons
    disable_btn();

    const animations = mergeSort(array);
    const bars = document.querySelectorAll(".bar");

    setTimeout(() => {
      enable_btn();
    }, DELAY * animations.length);

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [first, second] = animations[i];
        if (i % 3 === 0) {
          bars[first].style.background = "blue";
          bars[second].style.background = "blue";
        } else if (i % 3 === 1) {
          bars[first].style.background = "orange";
          bars[second].style.background = "orange";
        } else {
          // overwrite value
          bars[first].style.height = `${second}px`;
        }

        if (i === animations.length - 1) {
          setArray([...array]);
        }
      }, i * DELAY);
    }
  }

  function animateQuickSort() {
    // first scroll to the top;
    document.querySelector(".visualiser").scrollIntoView();
    // disable buttons
    disable_btn();
    const animations = quickSort(array);

    const bars = document.querySelectorAll(".bar");

    setTimeout(() => {
      enable_btn();
    }, DELAY * animations.length);

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [first, second, third] = animations[i];

        if (third === "color") {
          bars[first].style.background = "blue";
          bars[second].style.background = "blue";
        } else if (third === "revert") {
          bars[first].style.background = "orange";
          bars[second].style.background = "orange";
        } else {
          // swap
          const [first, firstVal, , second, secondVal] = animations[i];

          bars[first].style.height = `${firstVal}px`;
          bars[second].style.height = `${secondVal}px`;
        }

        if (i === animations.length - 1) {
          setArray([...array]);
        }
      }, i * DELAY);
    }
  }

  return (
    <Fragment>
      <div className="visualiser">
        {array.map((number, index) => {
          return (
            <div
              style={{ height: `${number}px` }}
              className="bar"
              key={index}
              id={index}
            ></div>
          );
        })}
      </div>
      <div className="buttons">
        <button className="first_btn" onClick={createArray}>
          New array
        </button>
        <button className="second_btn" onClick={animateMergeSort}>
          Merge sort
        </button>
        <button className="third_btn" onClick={animateQuickSort}>
          Quick sort
        </button>
        <button className="fourth_btn" onClick={animateHeapSort}>
          Heap sort
        </button>
      </div>

    </Fragment>
  );
}
