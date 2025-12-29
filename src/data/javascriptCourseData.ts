import { Level } from './courseData';

export const javascriptTheory: Record<number, {
  title: string;
  points: string[];
  examples: { code: string; description?: string }[];
}> = {
  1: {
    title: "Intro & Console",
    points: [
      "JavaScript is the language of the web",
      "console.log() displays output in the browser console",
      "Text must be wrapped in quotes (' or \" or `)",
      "Comments use // for single line or /* */ for multiple lines"
    ],
    examples: [
      { 
        code: 'console.log("Hello, World!");', 
        description: "This logs: Hello, World!" 
      },
      { 
        code: '// This is a comment\nconsole.log("Hi");  // inline', 
        description: "Comments help explain your code" 
      }
    ]
  },
  2: {
    title: "Variables & Types",
    points: [
      "Use let or const to declare variables",
      "const cannot be reassigned, let can be",
      "Values can be numbers, strings, or booleans",
      "Variable names are case-sensitive"
    ],
    examples: [
      { 
        code: 'let age = 18;\nconst name = "Alex";\nconsole.log(age);', 
        description: "Storing and using variables" 
      },
      { 
        code: 'let x = "5";  // string\nlet y = 5;    // number', 
        description: '"5" and 5 are different types!' 
      }
    ]
  },
  3: {
    title: "Conditions",
    points: [
      "if statements make decisions in your code",
      "Conditions return true or false",
      "Use curly braces {} to group code blocks",
      "Use else to handle the other case"
    ],
    examples: [
      { 
        code: 'if (age >= 18) {\n  console.log("Adult");\n}', 
        description: "Checks if age is 18 or more" 
      },
      { 
        code: 'if (x > 5) {\n  console.log("Big");\n} else {\n  console.log("Small");\n}', 
        description: "if/else handles both cases" 
      }
    ]
  },
  4: {
    title: "Loops",
    points: [
      "Loops repeat code multiple times",
      "for loops have 3 parts: init, condition, update",
      "i++ is shorthand for i = i + 1",
      "Curly braces {} contain the loop body"
    ],
    examples: [
      { 
        code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', 
        description: "Logs: 0, 1, 2" 
      },
      { 
        code: 'const names = ["Ana", "Ben"];\nfor (let name of names) {\n  console.log(name);\n}', 
        description: "Loops through an array" 
      }
    ]
  },
  5: {
    title: "Functions",
    points: [
      "Functions are reusable blocks of code",
      "Use function keyword or arrow syntax =>",
      "Call a function using its name with parentheses",
      "Functions can take parameters and return values"
    ],
    examples: [
      { 
        code: 'function greet() {\n  console.log("Hello!");\n}\n\ngreet();', 
        description: "Define and call a function" 
      },
      { 
        code: 'const add = (a, b) => a + b;\nconsole.log(add(2, 3));', 
        description: "Arrow function with parameters" 
      }
    ]
  }
};

export const javascriptCourseData: Level[] = [
  {
    id: 1,
    title: "Intro & Console",
    description: "Understand JavaScript basics and console.log()",
    icon: "🌐",
    color: "primary",
    totalXP: 50,
    badge: "JS Starter",
    lessons: [
      {
        id: "1-1",
        title: "What is JavaScript?",
        description: "Learn about JavaScript programming",
        xpReward: 25,
        questions: [
          {
            id: "1-1-1",
            type: "mcq",
            prompt: "JavaScript is primarily used for:",
            options: [
              { id: "a", text: "Cooking recipes" },
              { id: "b", text: "Web development" },
              { id: "c", text: "Painting" },
              { id: "d", text: "Music production" },
            ],
            correctAnswer: "b",
            explanation: "JavaScript is the programming language of the web, used to make websites interactive!"
          },
          {
            id: "1-1-2",
            type: "mcq",
            prompt: "Which symbol starts a single-line comment in JavaScript?",
            options: [
              { id: "a", text: "//" },
              { id: "b", text: "#" },
              { id: "c", text: "<!--" },
              { id: "d", text: "**" },
            ],
            correctAnswer: "a",
            explanation: "In JavaScript, single-line comments start with //. Everything after // on that line is ignored."
          }
        ]
      },
      {
        id: "1-2",
        title: "console.log()",
        description: "Display output in the console",
        xpReward: 25,
        questions: [
          {
            id: "1-2-1",
            type: "fill-blank",
            prompt: "Fill in the blank to log 'Hello World':",
            code: '____("Hello World");',
            correctAnswer: "console.log",
            explanation: "console.log() displays text and values in the browser console."
          },
          {
            id: "1-2-2",
            type: "fix-code",
            prompt: "Fix the code to log 'Hi':",
            code: 'console.logg("Hi");',
            correctAnswer: 'console.log("Hi");',
            explanation: "The method is spelled 'log', not 'logg'. Watch out for typos!"
          },
          {
            id: "1-2-3",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'console.log("JavaScript");',
            correctAnswer: "JavaScript",
            explanation: "console.log() outputs the text inside the quotes exactly as written."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Variables & Types",
    description: "Store data using variables",
    icon: "📦",
    color: "info",
    totalXP: 70,
    lessons: [
      {
        id: "2-1",
        title: "Variables",
        description: "Store and name your data",
        xpReward: 35,
        questions: [
          {
            id: "2-1-1",
            type: "mcq",
            prompt: "Which keyword creates a variable that can be reassigned?",
            options: [
              { id: "a", text: "const" },
              { id: "b", text: "let" },
              { id: "c", text: "var" },
              { id: "d", text: "final" },
            ],
            correctAnswer: "b",
            explanation: "Use 'let' when you need to reassign a variable later. 'const' cannot be reassigned!"
          },
          {
            id: "2-1-2",
            type: "fill-blank",
            prompt: "Complete the code to set age to 10:",
            code: "let age = ____;",
            correctAnswer: "10",
            explanation: "Variables store values. Here we assign the number 10 to the variable 'age'."
          }
        ]
      },
      {
        id: "2-2",
        title: "Strings vs Numbers",
        description: "Different data types behave differently",
        xpReward: 35,
        questions: [
          {
            id: "2-2-1",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'let x = "5";\nconsole.log(x + x);',
            correctAnswer: "55",
            explanation: "When you add strings together, they concatenate. '5' + '5' = '55', not 10!"
          },
          {
            id: "2-2-2",
            type: "fix-code",
            prompt: "Fix this code so it logs 21:",
            code: 'let age = "20";\nconsole.log(age + 1);',
            correctAnswer: 'let age = 20;\nconsole.log(age + 1);',
            explanation: "Remove the quotes around 20 to make it a number. String + number concatenates in JS!"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Conditions",
    description: "Make decisions with if/else",
    icon: "🔀",
    color: "accent",
    totalXP: 80,
    badge: "Logic Thinker",
    lessons: [
      {
        id: "3-1",
        title: "if statement",
        description: "Make decisions in code",
        xpReward: 40,
        questions: [
          {
            id: "3-1-1",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'let x = 10;\nif (x > 5) {\n  console.log("Yes");\n}',
            correctAnswer: "Yes",
            explanation: "Since x (10) is greater than 5, the condition is true, so 'Yes' is logged."
          },
          {
            id: "3-1-2",
            type: "fill-blank",
            prompt: "Fill in the comparison operator:",
            code: 'if (age ____ 18) {\n  console.log("Adult");\n}',
            correctAnswer: ">=",
            explanation: "The >= operator means 'greater than or equal to'. It checks if age is 18 or more."
          }
        ]
      },
      {
        id: "3-2",
        title: "else block",
        description: "Handle the other case",
        xpReward: 40,
        questions: [
          {
            id: "3-2-1",
            type: "fix-code",
            prompt: "Fix the syntax error:",
            code: 'if x > 5 {\n  console.log("Hi");\n}',
            correctAnswer: 'if (x > 5) {\n  console.log("Hi");\n}',
            explanation: "JavaScript if statements need parentheses () around the condition!"
          },
          {
            id: "3-2-2",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'let x = 3;\nif (x > 5) {\n  console.log("A");\n} else {\n  console.log("B");\n}',
            correctAnswer: "B",
            explanation: "Since x (3) is NOT greater than 5, the else block runs and logs 'B'."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Loops",
    description: "Repeat actions with for loops",
    icon: "🔄",
    color: "warning",
    totalXP: 90,
    lessons: [
      {
        id: "4-1",
        title: "for loop basics",
        description: "Repeat code multiple times",
        xpReward: 45,
        questions: [
          {
            id: "4-1-1",
            type: "fill-blank",
            prompt: "Complete the loop to run 3 times:",
            code: 'for (let i = 0; i < ____; i++) {\n  console.log(i);\n}',
            correctAnswer: "3",
            explanation: "i < 3 means the loop runs while i is 0, 1, 2 - exactly 3 times!"
          },
          {
            id: "4-1-2",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'for (let i = 0; i < 2; i++) {\n  console.log("Hi");\n}',
            correctAnswer: "Hi\nHi",
            explanation: "i < 2 means i goes from 0 to 1, so the loop runs twice, logging 'Hi' each time."
          }
        ]
      },
      {
        id: "4-2",
        title: "Fix the Loop",
        description: "Debug common loop errors",
        xpReward: 45,
        questions: [
          {
            id: "4-2-1",
            type: "fix-code",
            prompt: "Fix the loop syntax:",
            code: 'for (let i = 0 i < 3 i++) {\n  console.log(i);\n}',
            correctAnswer: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',
            explanation: "For loops need semicolons (;) between the three parts: init; condition; update."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Functions",
    description: "Write reusable code blocks",
    icon: "⚡",
    color: "primary",
    totalXP: 120,
    badge: "Certificate Unlocked",
    lessons: [
      {
        id: "5-1",
        title: "function keyword",
        description: "Define your own functions",
        xpReward: 60,
        questions: [
          {
            id: "5-1-1",
            type: "mcq",
            prompt: "Which keyword defines a function?",
            options: [
              { id: "a", text: "func" },
              { id: "b", text: "function" },
              { id: "c", text: "def" },
              { id: "d", text: "method" },
            ],
            correctAnswer: "b",
            explanation: "In JavaScript, we use 'function' to create named functions."
          },
          {
            id: "5-1-2",
            type: "fill-blank",
            prompt: "Complete the function definition:",
            code: '____ greet() {\n  console.log("Hello");\n}',
            correctAnswer: "function",
            explanation: "The 'function' keyword tells JavaScript you're creating a new function."
          }
        ]
      },
      {
        id: "5-2",
        title: "Calling Functions",
        description: "Use the functions you create",
        xpReward: 60,
        questions: [
          {
            id: "5-2-1",
            type: "fix-code",
            prompt: "Fix the function and call it:",
            code: 'function greet() {\n  console.log("Hi")\n}\n\ngreet',
            correctAnswer: 'function greet() {\n  console.log("Hi");\n}\n\ngreet();',
            explanation: "You call functions with parentheses: greet(). Don't forget the semicolons!"
          },
          {
            id: "5-2-2",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'function add() {\n  console.log(2 + 3);\n}\n\nadd();',
            correctAnswer: "5",
            explanation: "Calling add() runs the code inside it, which logs 2 + 3 = 5."
          }
        ]
      }
    ]
  }
];
