export const QUESTIONS = [
    // --- TIER 1: BASIC (Syntax & Concepts) ---
    {
        id: 1,
        difficulty: "Basic",
        text: "Which of these is the correct way to create a variable in Python?",
        options: ["int x = 5;", "x = 5", "var x = 5", "let x = 5"],
        answer: 1
    },
    {
        id: 2,
        difficulty: "Basic",
        text: "What is the output of print(10 // 3)?",
        options: ["3.33", "3", "3.0", "1"],
        answer: 1 // Integer division
    },
    {
        id: 3,
        difficulty: "Basic",
        text: "How do you check the length of a list named 'items'?",
        options: ["items.size()", "count(items)", "len(items)", "items.length"],
        answer: 2
    },

    // --- TIER 2: INTERMEDIATE (Logic & Data Structures) ---
    {
        id: 4,
        difficulty: "Intermediate",
        text: "Which data structure creates a key-value pair?",
        options: ["List []", "Tuple ()", "Dictionary {}", "Set {}"],
        answer: 2
    },
    {
        id: 5,
        difficulty: "Intermediate",
        text: "What happens if you try to change a value inside a Tuple?",
        options: ["It updates successfully", "It throws a TypeError", "It creates a new tuple", "It deletes the value"],
        answer: 1 // Immutable
    },
    {
        id: 6,
        difficulty: "Intermediate",
        text: "How do you handle an error without crashing the program?",
        options: ["if/else", "try/except", "check/error", "catch/throw"],
        answer: 1
    },

    // --- TIER 3: ADVANCED (Architecture & Efficiency) ---
    {
        id: 7,
        difficulty: "Advanced",
        text: "What does the @property decorator do?",
        options: ["Makes a method private", "Allows a method to be accessed like an attribute", "Speeds up the function", "Inherits from a parent class"],
        answer: 1
    },
    {
        id: 8,
        difficulty: "Advanced",
        text: "Which of these creates a Generator?",
        options: ["(x for x in range(10))", "[x for x in range(10)]", "{x for x in range(10)}", "tuple(range(10))"],
        answer: 0
    },
    {
        id: 9,
        difficulty: "Advanced",
        text: "What is the time complexity of searching a Hash Map (Dictionary)?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        answer: 2
    },
    {
        id: 10,
        difficulty: "Advanced",
        text: "What does the 'global' keyword do inside a function?",
        options: ["Creates a new global variable", "Allows modification of a variable outside the function scope", "Imports a global library", "Makes the function accessible everywhere"],
        answer: 1
    }
];
