import { Level } from './courseData';

export const pythonTheory: Record<number, {
  title: string;
  points: string[];
  examples: { code: string; description?: string }[];
}> = {
  1: {
    title: "Intro & Print",
    points: [
      "Python is a beginner-friendly programming language",
      "The print() function displays text on the screen",
      "Text in Python must be wrapped in quotes (' or \")",
      "Comments start with # and are ignored by Python"
    ],
    examples: [
      { 
        code: 'print("Hello, World!")', 
        description: "This prints: Hello, World!" 
      },
      { 
        code: '# This is a comment\nprint("Hi")  # inline comment', 
        description: "Comments help explain your code" 
      }
    ]
  },
  2: {
    title: "Variables & Types",
    points: [
      "Variables store data in memory",
      "Python does not require type declaration",
      "Values can be numbers, text (strings), or booleans",
      "Variable names cannot start with numbers or contain spaces"
    ],
    examples: [
      { 
        code: 'age = 18\nname = "Alex"\nprint(age)', 
        description: "Storing and using variables" 
      },
      { 
        code: 'x = "5"  # string\ny = 5    # number', 
        description: '"5" and 5 are different types!' 
      }
    ]
  },
  3: {
    title: "Conditions",
    points: [
      "if statements make decisions in your code",
      "Conditions return True or False",
      "Indentation matters in Python (use 4 spaces)",
      "Use else to handle the other case"
    ],
    examples: [
      { 
        code: 'if age >= 18:\n    print("Adult")', 
        description: "Checks if age is 18 or more" 
      },
      { 
        code: 'if x > 5:\n    print("Big")\nelse:\n    print("Small")', 
        description: "if/else handles both cases" 
      }
    ]
  },
  4: {
    title: "Loops",
    points: [
      "Loops repeat code multiple times",
      "for loops iterate over a sequence",
      "range(n) creates numbers from 0 to n-1",
      "Indentation defines what's inside the loop"
    ],
    examples: [
      { 
        code: 'for i in range(3):\n    print(i)', 
        description: "Prints: 0, 1, 2" 
      },
      { 
        code: 'for name in ["Ana", "Ben"]:\n    print(name)', 
        description: "Loops through a list" 
      }
    ]
  },
  5: {
    title: "Functions",
    points: [
      "Functions are reusable blocks of code",
      "Use def to define a function",
      "Call a function using its name with parentheses",
      "Functions can take parameters and return values"
    ],
    examples: [
      { 
        code: 'def greet():\n    print("Hello!")\n\ngreet()', 
        description: "Define and call a function" 
      },
      { 
        code: 'def add(a, b):\n    return a + b\n\nprint(add(2, 3))', 
        description: "Function with parameters" 
      }
    ]
  }
};

export const pythonCourseData: Level[] = [
  {
    id: 1,
    title: "Intro & Print",
    description: "Understand Python basics and print()",
    icon: "🐍",
    color: "primary",
    totalXP: 50,
    badge: "Python Starter",
    lessons: [
      {
        id: "1-1",
        title: "What is Python?",
        description: "Learn about Python programming",
        xpReward: 25,
        questions: [
          {
            id: "1-1-1",
            type: "mcq",
            prompt: "Python is used for:",
            options: [
              { id: "a", text: "Cooking" },
              { id: "b", text: "Programming" },
              { id: "c", text: "Painting" },
              { id: "d", text: "Singing" },
            ],
            correctAnswer: "b",
            explanation: "Python is a popular programming language used for web development, data science, AI, and more!"
          },
          {
            id: "1-1-2",
            type: "mcq",
            prompt: "Which symbol starts a comment in Python?",
            options: [
              { id: "a", text: "//" },
              { id: "b", text: "#" },
              { id: "c", text: "<!--" },
              { id: "d", text: "**" },
            ],
            correctAnswer: "b",
            explanation: "In Python, comments start with the # symbol. Everything after # on that line is ignored."
          }
        ]
      },
      {
        id: "1-2",
        title: "print()",
        description: "Display output with print",
        xpReward: 25,
        questions: [
          {
            id: "1-2-1",
            type: "fill-blank",
            prompt: "Fill in the blank to print 'Hello World':",
            code: '____("Hello World")',
            correctAnswer: "print",
            explanation: "The print() function displays text and values to the screen."
          },
          {
            id: "1-2-2",
            type: "fix-code",
            prompt: "Fix the code to print 'Hi':",
            code: 'pritn("Hi")',
            correctAnswer: 'print("Hi")',
            explanation: "The function is spelled 'print', not 'pritn'. Watch out for typos!"
          },
          {
            id: "1-2-3",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'print("Python")',
            correctAnswer: "Python",
            explanation: "The print() function outputs the text inside the quotes exactly as written."
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
            prompt: "Which variable name is valid?",
            options: [
              { id: "a", text: "1name" },
              { id: "b", text: "my-name" },
              { id: "c", text: "my_name" },
              { id: "d", text: "my name" },
            ],
            correctAnswer: "c",
            explanation: "Variable names can't start with numbers, contain hyphens, or have spaces. Use underscores!"
          },
          {
            id: "2-1-2",
            type: "fill-blank",
            prompt: "Complete the code to set age to 10:",
            code: "age = ____",
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
            code: 'x = "5"\ny = 2\nprint(x + x)',
            correctAnswer: "55",
            explanation: "When you add strings together, they concatenate. '5' + '5' = '55', not 10!"
          },
          {
            id: "2-2-2",
            type: "fix-code",
            prompt: "Fix this code so it prints 21:",
            code: 'age = "20"\nprint(age + 1)',
            correctAnswer: 'age = 20\nprint(age + 1)',
            explanation: "Remove the quotes around 20 to make it a number. You can't add a string and a number!"
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
            code: 'x = 10\nif x > 5:\n    print("Yes")',
            correctAnswer: "Yes",
            explanation: "Since x (10) is greater than 5, the condition is True, so 'Yes' is printed."
          },
          {
            id: "3-1-2",
            type: "fill-blank",
            prompt: "Fill in the comparison operator:",
            code: 'if age ____ 18:\n    print("Adult")',
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
            code: 'if x > 5\n    print("Hi")',
            correctAnswer: 'if x > 5:\n    print("Hi")',
            explanation: "Python if statements need a colon (:) after the condition!"
          },
          {
            id: "3-2-2",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'x = 3\nif x > 5:\n    print("A")\nelse:\n    print("B")',
            correctAnswer: "B",
            explanation: "Since x (3) is NOT greater than 5, the else block runs and prints 'B'."
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
            prompt: "Complete the code to loop 3 times:",
            code: 'for i in ____(3):\n    print(i)',
            correctAnswer: "range",
            explanation: "range(3) creates a sequence of numbers: 0, 1, 2. The loop runs once for each number."
          },
          {
            id: "4-1-2",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'for i in range(2):\n    print("Hi")',
            correctAnswer: "Hi\nHi",
            explanation: "range(2) gives us 0 and 1, so the loop runs twice, printing 'Hi' each time."
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
            code: 'for i range(3):\nprint(i)',
            correctAnswer: 'for i in range(3):\n    print(i)',
            explanation: "For loops need 'in' keyword and proper indentation inside the loop."
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
        title: "def keyword",
        description: "Define your own functions",
        xpReward: 60,
        questions: [
          {
            id: "5-1-1",
            type: "mcq",
            prompt: "Which keyword defines a function?",
            options: [
              { id: "a", text: "function" },
              { id: "b", text: "def" },
              { id: "c", text: "method" },
              { id: "d", text: "create" },
            ],
            correctAnswer: "b",
            explanation: "In Python, we use 'def' (short for define) to create functions."
          },
          {
            id: "5-1-2",
            type: "fill-blank",
            prompt: "Complete the function definition:",
            code: '____ greet():\n    print("Hello")',
            correctAnswer: "def",
            explanation: "The 'def' keyword tells Python you're creating a new function."
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
            code: 'def greet():\nprint("Hi")\n\ngreet',
            correctAnswer: 'def greet():\n    print("Hi")\n\ngreet()',
            explanation: "Functions need indentation inside, and you call them with parentheses: greet()"
          },
          {
            id: "5-2-2",
            type: "output-prediction",
            prompt: "What will this code output?",
            code: 'def add():\n    print(2 + 3)\n\nadd()',
            correctAnswer: "5",
            explanation: "Calling add() runs the code inside it, which prints 2 + 3 = 5."
          }
        ]
      }
    ]
  }
];
