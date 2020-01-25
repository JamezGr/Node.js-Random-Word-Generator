#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');

const options = yargs
 .usage("Usage: -n <number>")
 .option("n", { alias: "number", describe: "Number of Words to Generate", type: "int", demandOption: true })
 .argv;

const validateArgs = (option) => {
    if (typeof option == "number" && option > 0) {
      return {
        message:"Generating " + option + " word(s)...",
        words_to_select: option,
        is_valid: "true"
      }

    } else {
      return {
        message: "[ERROR]: Must be Integer Value and/or greater than 0...",
        is_valid: "false"
      }
    }
}

const generateWordsList = () => {
    let raw_data = fs.readFileSync("./name_data/words_dictionary.json");
    let name_data = JSON.parse(raw_data);
    // return number of words in Data Set + JSON Data
    return {
      name_data: name_data,
      list_length: Object.keys(name_data).length
    }
  }

// select Random Number Between 1 and Number of Words in Word Dictionary
const generateRandomNumber = () => {
    let max_number = generateWordsList().list_length;

    const randomNumber = Math.floor(Math.random() * max_number);

    return randomNumber
}

// select Random Word from Words Dictionary
const selectWord = (selector) => {
    let words_dictionary = generateWordsList().name_data;
    let random_word = Object.keys(words_dictionary)[selector];

    return random_word
}

// if the Argument given is a number
if (validateArgs(options.number).is_valid == "true") {
  console.log(validateArgs(options.number).message + "\n");

  let selector = 1;
  // number of words to generate given as argument
  let words_to_generate = options.number;

  while (selector < words_to_generate + 1) {
      let random_number = generateRandomNumber();
      let random_word = selectWord(random_number);

      // print random word
      console.log(random_word);
      selector++;
  }
} else if (validateArgs(options.number).is_valid == "false") {
  console.log(validateArgs(options.number).message);
}

// console.log(validateArgs(option));
// console.log(generateWordsList());
