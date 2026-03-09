export const COMPREHENSIONS_LEVEL_1 = {
    title: "The Logic Shortcut",
    passingScore: 500,
    questions: [
        // --- 4 MCQs (Theory & Foundation) ---
        {
            id: "comp_m1",
            type: "mcq",
            question: "What is a List Comprehension in Python?",
            options: { A: "A way to read a list backwards", B: "A concise way to create lists using a single line of code", C: "A method to compress a list file size", D: "A function that only works on integers" },
            correctAnswer: "B",
            explanation: "List comprehensions provide a shorter syntax for creating a new list based on the values of an existing collection.",
            hint: "Think about 'one-line loops'.",
            xpReward: 30
        },
        {
            id: "comp_m2",
            type: "mcq",
            question: "In `[x for x in range(5)]`, what does the first `x` represent?",
            options: { A: "The name of the list", B: "The value that gets added to the new list", C: "The condition for filtering", D: "The total length of the list" },
            correctAnswer: "B",
            explanation: "The first expression in a comprehension is the value that is stored in the resulting collection for each iteration.",
            hint: "It's what the loop 'produces'.",
            xpReward: 30
        },
        {
            id: "comp_m3",
            type: "mcq",
            question: "Where does the `if` condition go in a standard list comprehension?",
            options: { A: "At the very beginning", B: "Immediately after the 'in'", C: "At the end of the expression", D: "It is not allowed in comprehensions" },
            correctAnswer: "C",
            explanation: "Filtering conditions in a comprehension are placed after the loop: `[expr for item in collection if condition]`.",
            hint: "It's the last part of the shortcut.",
            xpReward: 30
        },
        {
            id: "comp_m4",
            type: "mcq",
            question: "Which braces are used for a Dictionary Comprehension?",
            options: { A: "[]", B: "{}", C: "()", D: "<>" },
            correctAnswer: "B",
            explanation: "Like regular dictionaries, dictionary comprehensions use curly braces `{}` and a `key: value` shortcut.",
            hint: "Braces for dictionaries.",
            xpReward: 30
        },

        // --- 4 Coding Problems (Logic & Creation) ---
        {
            id: "comp_c1",
            type: "mission_task",
            question: "MISSION: Create a list of numbers from 0 to 4 using a list comprehension: `[x for x in range(5)]`. Print the result.",
            expectedOutput: "[0, 1, 2, 3, 4]",
            codeTask: "# Code your comprehension here\n",
            hint: "result = [x for x in range(5)]",
            explanation: "Excellent! You've successfully used a shortcut to generate a list.",
            learningGoals: "User must create a basic list comprehension.",
            requiredConcepts: ["[", "for", "in", "]"],
            regexCheck: /\[.*for\s+.*\s+in\s+range/,
            xpReward: 70
        },
        {
            id: "comp_c2",
            type: "mission_task",
            question: "MISSION: Create a list of squares for numbers 1 to 3: `[1, 4, 9]`. Use list comprehension.",
            expectedOutput: "[1, 4, 9]",
            codeTask: "# Code here\n",
            hint: "[x*x for x in [1, 2, 3]]",
            explanation: "Correct! You can perform calculations directly inside the comprehension.",
            learningGoals: "User must create and print a basic list comprehension to perform an operation on items.",
            requiredConcepts: ["*"],
            xpReward: 70
        },
        {
            id: "comp_c3",
            type: "mission_task",
            question: "MISSION: Use a comprehension to get only the odd numbers from `[1, 2, 3, 4]`. Hint: use `if x % 2 != 0`. Print the result.",
            expectedOutput: "[1, 3]",
            codeTask: "nums = [1, 2, 3, 4]\n# Use comprehension with if here\n",
            hint: "[x for x in nums if x % 2 != 0]",
            explanation: "Nice! Filtering with 'if' makes comprehensions extremely powerful for data processing.",
            learningGoals: "User must use and print a conditional filter inside a list comprehension.",
            requiredConcepts: ["if"],
            regexCheck: /\[.*for\s+.*\s+in\s+.*if/,
            xpReward: 70
        },
        {
            id: "comp_c4",
            type: "mission_task",
            question: "MISSION: Create a dictionary comprehension that maps 1 to 10 and 2 to 20: `{1: 10, 2: 20}`. Use `range(1, 3)`.",
            expectedOutput: "{1: 10, 2: 20}",
            codeTask: "# Code dictionary comprehension here\n",
            hint: "{x: x*10 for x in range(1, 3)}",
            explanation: "Perfect. Dictionary comprehensions follow the same logic as list comprehensions but with key:value pairs.",
            learningGoals: "User must create and print a basic dictionary comprehension.",
            requiredConcepts: ["{", ":", "for"],
            regexCheck: /\{.*:.*for\s+.*\s+in/,
            xpReward: 70
        },

        // --- 2 Debugging Tasks (Diagnosis & Repair) ---
        {
            id: "comp_d1",
            type: "debugging",
            question: "REPAIR MISSION: This comprehension is missing the 'in' keyword. Fix the syntax error!",
            codeTask: "squares = [x*x for x range(3)]",
            expectedOutput: "[0, 1, 4]",
            hint: "Add 'in' between 'x' and 'range'.",
            explanation: "Fixed! Every comprehension loop requires the 'in' keyword to specify the source.",
            errorType: "SyntaxError",
            xpReward: 75,
            learningGoals: "User must add the missing 'in' keyword to the comprehension loop.",
            regexCheck: /for\s+.*\s+in/
        },
        {
            id: "comp_d2",
            type: "debugging",
            question: "REPAIR MISSION: This dictionary comprehension is missing the value part. It should map x to x*2. Fix it!",
            codeTask: "double = {x for x in range(2)}",
            expectedOutput: "{0: 0, 1: 2}",
            hint: "A dictionary comprehension needs {key : value}. Change {x to {x: x*2.",
            explanation: "Target repaired! Without the colon and second value, Python thought you were making a Set comprehension.",
            errorType: "LogicError",
            xpReward: 75,
            learningGoals: "User must correct the dictionary comprehension syntax by adding the colon and value expression."
        }
    ]
};

export const COMPREHENSIONS_QUESTION_BANK = {
    "Concept_ListComp": COMPREHENSIONS_LEVEL_1.questions.filter(q => q.id.includes('comp_m1') || q.id.includes('comp_m2') || q.id.includes('comp_c1')),
    "Concept_Filtering": COMPREHENSIONS_LEVEL_1.questions.filter(q => q.id.includes('comp_m3') || q.id.includes('comp_c3')),
    "Concept_Operations": COMPREHENSIONS_LEVEL_1.questions.filter(q => q.id.includes('comp_c2')),
    "Concept_DictComp": COMPREHENSIONS_LEVEL_1.questions.filter(q => q.id.includes('comp_m4') || q.id.includes('comp_c4') || q.id.includes('comp_d2')),
    "Concept_Repair": COMPREHENSIONS_LEVEL_1.questions.filter(q => q.type === 'debugging')
};
