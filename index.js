const STORE = {
  // Array With Quiz Questions
  questionNumber: 0, // Variable for the current question being displayed on the quiz
  score: 0, // Variable for User Score
  page: "landing", // This sets the landing page as the default page for our quiz.
  questions: [
    // Quiz Questions
    {
      title: "What was the first video game console to be sold for home use?", // Question to be displayed
      answers: [
        // Multiple-Choice answers
        "Magnavox Odyssey",
        "Nintendo Entertainment System (NES)",
        "Atari 2600",
        "Sega Genesis",
      ],
      correct: 0, // This defines the correct answer to the question based on its order within "answers"
    },
    {
      title:
        "Mario originally debuted in Nintendo’s Donkey Kong (1981), but he wasn’t the plumber we know and love today – what job did he have in his first appearance?",
      answers: [
        "Chef",
        "Construction Worker",
        "Private Investigator",
        "Carpenter",
      ],
      correct: 3,
    },
    {
      title:
        "Which of the following games was not a launch title for the Playstation 4?",
      answers: [
        "Knack",
        "Dark Souls 2",
        "Assassin's Creed IV: Black Flag",
        "Warframe",
      ],
      correct: 1,
    },
    {
      title:
        "With franchises like Call of Duty and games like Fortnite and Apex Legends garnering massive audiences, first-person shooters are among the most popular video games. Which game is credited with inventing this genre?",
      answers: [
        "Wolfenstein 3D",
        "Doom",
        "Fatal Fury",
        "Star Wars: Dark Forces",
      ],
      correct: 0,
    },
    {
      title:
        "With over 155 million units sold, what is the best-selling video game console of all time?",
      answers: [
        "Nintendo Wii",
        "Sony Playstation 2",
        "Microsoft Xbox 360",
        "Sega Dreamcast",
      ],
      correct: 1,
    },
  ],
};

function render() {
  // Render Function
  const question = STORE.questions[STORE.questionNumber]; // This defines the current quiz question
  if (STORE.page == "landing") {
    // Renders the Splash Page
    $("main").html(`
<section>
    <h2>Test your gaming knowledge! See how many questions you can answer.</h2>
    <button id = "start">Start Quiz</button>
</section>
`);
  } else if (STORE.page == "question") {
    // Renders the current question in the quiz
    $("main").html(`
    <section>
    <h3>Question ${STORE.questionNumber + 1}/${STORE.questions.length}</h3>

       <form>
    <h2>${question.title}</h2>
      <ol type = "A">
    <li><input type = "radio" name = "answers" value = "0"/>
    <label>${question.answers[0]}</label></li>
    <li><input type = "radio" name = "answers" value = "1"/>
    <label>${question.answers[1]}</label></li>
    <li><input type = "radio" name = "answers" value = "2"/>
    <label>${question.answers[2]}</label></li>
    <li><input type = "radio" name = "answers" value = "3"/>
    <label>${question.answers[3]}</label></li>
    </ol>
    <button id = "submit">Submit</button>
    </form>

    <h4>Current Score: ${STORE.score}</h4>
</section>
    `);
  } else if (STORE.page == "feedback") {
    // Renders the feedback page for the first four questions
    $("main").html(`
    <section>
    <h3>${STORE.feedback}</h3>
    
    <h4>Current Score: ${STORE.score}</h4>
    <button id = "next">Next Question</button>
</section>
    `);
  } else if (STORE.page == "feedback-final") {
    // Renders the feedback page for the final question, which leads the user to the results page
    $("main").html(`
    <section>
    <h3>${STORE.feedback}</h3>

    <h4>Current Score: ${STORE.score}</h4>
    <button id = "next">See Results</button>
</section>
    `);
  } else if (STORE.page == "results") {
    // Renders the results page.
    $("main").html(`
    <h2>Congratulations, you completed the quiz! Your final score is ${STORE.score}/${STORE.questions.length}.</h2>
    <br/>
    <h2>Would you like to try again?</h2>
    <button id = "restart">Start Over</button>
    `);
  }
}

function eventListeners() {
  // Event Listener Functions
  $("body").on("click", "#start", (e) => {
    // Start Page
    STORE.page = "question";
    render();
  });
  $("body").on("submit", "form", (e) => {
    // This listens for when the user submits an answer and defines what feedback message they get
    e.preventDefault();
    const userAnswer = e.target.answers.value; // This defines the answer the user gave
    const question = STORE.questions[STORE.questionNumber]; // This defines the current question being asked in the quiz
    if (userAnswer == question.correct) {
      // This checks if the user-given answer is correct
      STORE.score++; // Adds one point to the user's score
      STORE.feedback = "That's correct! Good Job."; // Correct Answer Message
    } else {
      // If the user answers incorrectly, this feedback message displays instead
      STORE.feedback =
        "Sorry, that's incorrect. The correct answer is " +
        question.answers[question.correct] +
        "."; // Incorrect Answer Message, which also provides the correct answer
    }
    STORE.questionNumber++;
    if (STORE.questionNumber == STORE.questions.length) {
      // If this is the last question, we render the "feedback-final" page
      STORE.page = "feedback-final";

      render();
    } else if (STORE.questionNumber < STORE.questions.length) {
      STORE.page = "feedback";

      render();
    }
  });
  $("body").on("click", "#next", (e) => {
    // This takes the user to the next question in the quiz
    e.preventDefault();
    if (STORE.questionNumber == STORE.questions.length) {
      // If there are no more questions, renders the results page
      STORE.page = "results";
      render();
    } else 
    STORE.page = "question";
    render();
  });

  $("body").on("click", "#restart", (e) => {
    // Resets all values and restarts the quiz
    e.preventDefault();
    STORE.page = "landing";
    STORE.score = 0;
    STORE.questionNumber = 0;
    render();
  });
}

function main() {
  // This function runs our other two functions.
  render();
  eventListeners();
}

$(main);
