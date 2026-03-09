export const SYNTAX_LEVEL_1 = {
    title: "First Contact",
    passingScore: 300,
    questions: [
        {
            id: "syn_m1",
            type: "mcq",
            question: "What does `print()` do in Python?",
            options: { A: "Saves a file", B: "Deletes text", C: "Displays output to the screen", D: "Creates a new variable" },
            correctAnswer: "C",
            explanation: "`print()` is a built-in function that outputs text or values to the console.",
            concepts: ["output", "functions"],
            hint: "It shows something on the screen.",
            xpReward: 40
        },
        {
            id: "syn_m2",
            type: "mcq",
            question: "Which of the following is a valid Python comment?",
            options: { A: "// This is a comment", B: "<!-- comment -->", C: "** This is a comment", D: "# This is a comment" },
            correctAnswer: "D",
            explanation: "Python uses `#` to start a comment. Everything after `#` on that line is ignored by the interpreter.",
            concepts: ["comments", "syntax"],
            hint: "Python uses a symbol that looks like a hashtag.",
            xpReward: 40
        },
        {
            id: "syn_m3",
            type: "mcq",
            question: "What is the correct way to print 'Hello, World!' in Python?",
            options: { A: "echo 'Hello, World!'", B: "print('Hello, World!')", C: "console.log('Hello, World!')", D: "System.out.println('Hello, World!')" },
            correctAnswer: "B",
            explanation: "Python uses the `print()` function with the text inside parentheses and quotes.",
            concepts: ["print", "strings"],
            hint: "Python's output function is called print.",
            xpReward: 40
        },
        {
            id: "syn_m4",
            type: "mcq",
            question: "Which of these is NOT a valid string in Python?",
            options: { A: "'Hello'", B: "\"Hello\"", C: "Hello", D: "'''Hello'''" },
            correctAnswer: "C",
            explanation: "Strings must be enclosed in quotes. Without quotes, `Hello` is treated as a variable name.",
            concepts: ["strings", "quotes"],
            hint: "Look for the one missing quotes.",
            xpReward: 40
        },
        {
            id: "syn_m5",
            type: "mcq",
            question: "Does indentation matter in Python?",
            options: { A: "No, it's just for readability", B: "Only for comments", C: "Yes, it defines blocks of code", D: "Only in the standard library" },
            correctAnswer: "C",
            explanation: "Python uses whitespace (indentation) to define the structure and scope of code blocks like loops and functions.",
            concepts: ["indentation", "structure"],
            hint: "Think about how Python knows where an 'if' block ends.",
            xpReward: 40
        },
        {
            id: "syn_c1",
            type: "mission_task",
            question: "MISSION: Write your first line of Python! Print 'Hello, World!' to the console.",
            expectedOutput: "Hello, World!",
            codeTask: "# Goal: Print 'Hello, World!'\n",
            hint: "Type: print('Hello, World!')",
            explanation: "🚀 First mission complete! You've written your first line of Python.",
            learningGoals: "User must write a working print statement.",
            requiredConcepts: ["print"],
            concepts: ["output", "strings"],
            xpReward: 80
        },
        {
            id: "syn_c2",
            type: "mission_task",
            question: "MISSION: Add a comment above your print statement explaining what it does. Then print your name.",
            expectedOutput: "",
            codeTask: "# Write a comment here\n# Then print your name below\n",
            hint: "# This prints my name\nprint('Asvind')",
            explanation: "Code comments are notes for developers. Python ignores them at runtime.",
            learningGoals: "User must write at least one comment and a print statement.",
            requiredConcepts: ["#", "print"],
            concepts: ["comments", "output"],
            xpReward: 80
        },
        {
            id: "syn_c3",
            type: "mission_task",
            question: "MISSION: Create two separate print statements. Print 'Hello' on the first line and 'Python' on the second.",
            expectedOutput: "Hello\nPython",
            codeTask: "# Use two print statements\n",
            hint: "print('Hello')\nprint('Python')",
            explanation: "Each print() function call automatically adds a new line by default.",
            learningGoals: "User must use multiple print statements.",
            requiredConcepts: ["print", "print"],
            concepts: ["output", "newlines"],
            xpReward: 80
        },
        {
            id: "syn_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code has a typo in the print function. Fix it!",
            codeTask: "prnt('Hello')",
            expectedOutput: "Hello",
            hint: "Check the spelling of the function name.",
            explanation: "Fixed! Python is case-sensitive and spelling counts.",
            errorType: "NameError",
            concepts: ["debugging", "syntax"],
            xpReward: 90,
            learningGoals: "User must correct a misspelled function name."
        },
        {
            id: "syn_d2",
            type: "debugging",
            question: "REPAIR MISSION: This string is missing its closing quote. Fix it!",
            codeTask: "print('Hello)",
            expectedOutput: "Hello",
            hint: "Strings must start and end with the same type of quote.",
            explanation: "Fixed! Quotes must always be balanced.",
            errorType: "SyntaxError",
            concepts: ["debugging", "strings"],
            xpReward: 90,
            learningGoals: "User must balance the quotes in a string."
        }
    ]
};

export const SYNTAX_QUESTION_BANK = {
    "Output": SYNTAX_LEVEL_1.questions.filter(q => q.id.includes("syn_m1") || q.id.includes("syn_c1") || q.id.includes("syn_c3")),
    "Comments": SYNTAX_LEVEL_1.questions.filter(q => q.id.includes("syn_m2") || q.id.includes("syn_c2")),
    "Syntax": SYNTAX_LEVEL_1.questions.filter(q => q.id.includes("syn_m3") || q.id.includes("syn_m4") || q.id.includes("syn_m5") || q.id.includes("syn_d1") || q.id.includes("syn_d2"))
};
