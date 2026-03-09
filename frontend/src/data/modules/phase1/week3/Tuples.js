export const TUPLES_LEVEL_1 = {
    title: "The Immutable Vault",
    passingScore: 500,
    questions: [
        // --- 4 MCQs (Theory & Foundation) ---
        {
            id: "tuple_m1",
            type: "mcq",
            question: "What is the main difference between a List and a Tuple?",
            options: { A: "Tuples use square brackets []", B: "Tuples cannot be changed after creation", C: "Tuples are faster for adding items", D: "Tuples can only store numbers" },
            correctAnswer: "B",
            explanation: "Tuples are immutable, meaning their elements cannot be modified, added, or removed once defined.",
            hint: "Think about 'immutability'.",
            xpReward: 30
        },
        {
            id: "tuple_m2",
            type: "mcq",
            question: "Which of these is the correct way to define a tuple?",
            options: { A: "t = (1, 2, 3)", B: "t = [1, 2, 3]", C: "t = {1, 2, 3}", D: "t = <1, 2, 3>" },
            correctAnswer: "A",
            explanation: "Tuples are created using parentheses `()`.",
            hint: "Parentheses are for tuples.",
            xpReward: 30
        },
        {
            id: "tuple_m3",
            type: "mcq",
            question: "How do you create a tuple with only ONE item 'A'?",
            options: { A: "t = ('A')", B: "t = ('A',)", C: "t = ['A']", D: "t = {'A'}" },
            correctAnswer: "B",
            explanation: "A single-item tuple must have a trailing comma, otherwise Python treats it as a string in parentheses.",
            hint: "Don't forget the comma.",
            xpReward: 30
        },
        {
            id: "tuple_m4",
            type: "mcq",
            question: "Can you use `.append()` on a tuple?",
            options: { A: "Yes, always", B: "No, tuples don't have .append()", C: "Yes, but only if it's empty", D: "Only if you use a context manager" },
            correctAnswer: "B",
            explanation: "Since tuples are immutable, they do not have methods like `.append()` or `.remove()` that modify the collection.",
            hint: "Tuples are locked.",
            xpReward: 30
        },

        // --- 4 Coding Problems (Logic & Creation) ---
        {
            id: "tuple_c1",
            type: "mission_task",
            theme: "Immutability",
            question: "MISSION: Create a tuple named 'coordinates' containing (10, 20).",
            expectedOutput: "",
            codeTask: "# Create your tuple here\n",
            hint: "coordinates = (10, 20)",
            explanation: "Excellent! You've correctly created a tuple using parentheses, demonstrating immutability. 🚀 Now, let's explore *why* immutability is so important in Python.",
            learningGoals: "User must demonstrate immutability by creating a tuple with integers.",
            requiredConcepts: ["=", "(", ")"],
            xpReward: 70
        },
        {
            id: "tuple_c2",
            type: "mission_task",
            question: "MISSION: Access the first item of `point = (5, 9)`. Print it.",
            expectedOutput: "5",
            codeTask: "point = (5, 9)\n# Print the first item here\n",
            hint: "Tuples use the same index syntax as lists: [0].",
            explanation: "Correct! Even though tuples use (), access still uses [].",
            learningGoals: "User must access and print a tuple element by index.",
            requiredConcepts: ["[0]"],
            xpReward: 70
        },
        {
            id: "tuple_c3",
            type: "mission_task",
            question: "MISSION: Unpack the tuple `data = ('Zenith', 100)` into variables `name` and `score`. Then print `name`.",
            expectedOutput: "Zenith",
            codeTask: "data = ('Zenith', 100)\n# Unpack here\nprint(name)",
            hint: "name, score = data",
            explanation: "Nice! Unpacking is a powerful way to distribute tuple values into variables.",
            learningGoals: "User must demonstrate tuple unpacking and print the result.",
            requiredConcepts: [","],
            xpReward: 70
        },
        {
            id: "tuple_c4",
            type: "mission_task",
            question: "MISSION: Use the `.count()` method to find how many times the number 1 appears in `nums = (1, 2, 1, 3)`. Print the result.",
            expectedOutput: "2",
            codeTask: "nums = (1, 2, 1, 3)\n# Code here\n",
            hint: "print(nums.count(1))",
            explanation: "Perfect. `.count()` and `.index()` are common tuple methods.",
            learningGoals: "User must use and print the .count() method on a tuple.",
            requiredConcepts: [".count"],
            regexCheck: /\.count\s*\(\s*1\s*\)/,
            xpReward: 70
        },

        // --- 2 Debugging Tasks (Diagnosis & Repair) ---
        {
            id: "tuple_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to change a value in a tuple, which isn't allowed. Fix the code by creating a new tuple instead!",
            codeTask: "coord = (1, 2)\ncoord[0] = 5\nprint(coord)",
            expectedOutput: "(5, 2)",
            hint: "You can't change a tuple. Assign a new tuple (5, 2) to the variable coord.",
            explanation: "Fixed! You correctly identified that tuples cannot be modified in place.",
            errorType: "TypeError",
            xpReward: 75,
            learningGoals: "User must understand tuple immutability and reassign the variable instead of modifying the item."
        },
        {
            id: "tuple_d2",
            type: "debugging",
            question: "REPAIR MISSION: A comma is missing for this single-item tuple to be recognized correctly. Fix it!",
            codeTask: "singleton = (42)\nprint(type(singleton))",
            expectedOutput: "<class 'tuple'>",
            hint: "Add a comma inside the parentheses after the number.",
            explanation: "Syntax restored. Single-item tuples require that trailing comma.",
            errorType: "LogicError", // Technically not a SyntaxError but a logic/type error
            xpReward: 75,
            learningGoals: "User must add a trailing comma to define a single-item tuple.",
            regexCheck: /\(.*\s*,\s*\)/
        }
    ]
};

export const TUPLES_QUESTION_BANK = {
    "Concept_Creation": TUPLES_LEVEL_1.questions.filter(q => q.id.includes('tuple_m2') || q.id.includes('tuple_c1') || q.id.includes('tuple_m3')),
    "Concept_Immutability": TUPLES_LEVEL_1.questions.filter(q => q.id.includes('tuple_m1') || q.id.includes('tuple_m4') || q.id.includes('tuple_d1')),
    "Concept_Operations": TUPLES_LEVEL_1.questions.filter(q => q.id.includes('tuple_c2') || q.id.includes('tuple_c3') || q.id.includes('tuple_c4')),
    "Concept_Repair": TUPLES_LEVEL_1.questions.filter(q => q.type === 'debugging')
};
