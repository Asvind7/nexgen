export const DATA_TYPES_LEVEL_1 = {
    questions: [
        {
            id: 'dt_1',
            type: 'multiple_choice',
            question: "What is the type of the value `10`?",
            options: [
                "String",
                "Integer",
                "Float",
                "Boolean"
            ],
            correctAnswer: "Integer",
            explanation: "Whole numbers without decimals are called Integers (int).",
            requiredConcepts: ["int"],
            xpReward: 50
        },
        {
            id: 'dt_2',
            type: 'mission_task',
            question: "Create a variable `pi` equal to `3.14`. Print its type.",
            codeTask: "# Create pi and print type(pi):\n",
            regexCheck: /pi\s*=\s*3\.14\s*\n\s*print\s*\(\s*type\s*\(\s*pi\s*\)\s*\)/,
            expectedOutput: "<class 'float'>",
            learningGoals: "User must create a float variable and check its type.",
            hint: "Use `pi = 3.14` and then `print(type(pi))`.",
            requiredConcepts: ["float", "type"],
            xpReward: 70
        },
        {
            id: 'dt_3',
            type: 'multiple_choice',
            question: "Which of these is a String?",
            options: [
                "123",
                "'123'",
                "12.3",
                "True"
            ],
            correctAnswer: "'123'",
            explanation: "Strings are always surrounded by quotes (single or double).",
            requiredConcepts: ["str"],
            xpReward: 50
        },
        {
            id: 'dt_4',
            type: 'mission_task',
            question: "Convert the string `'5'` to an integer and print it + 5. (Result should be 10).",
            codeTask: "text = '5'\n# Convert and add 5:\n",
            regexCheck: /print\s*\(\s*int\s*\(\s*text\s*\)\s*\+\s*5\s*\)/,
            expectedOutput: "10",
            learningGoals: "User must cast a string to an integer.",
            hint: "Use `int(text)` to convert the string to a number.",
            requiredConcepts: ["int()", "+"],
            xpReward: 70
        },
        {
            id: 'dt_5',
            type: 'debugging',
            question: "Fix the type error. You cannot add text and numbers directly.",
            codeTask: "print('Age: ' + 10)",
            regexCheck: /print\s*\(\s*['"]Age: ['"]\s*\+\s*str\s*\(\s*10\s*\)\s*\)/,
            correctAnswer: "print('Age: ' + str(10))",
            explanation: "You must convert numbers to strings using `str()` before combining them with text.",
            hint: "Wrap the number 10 in `str(10)`.",
            learningGoals: "User must fix a TypeError by casting int to str.",
            requiredConcepts: ["str()"],
            xpReward: 75
        },
        {
            id: 'dt_6',
            type: 'multiple_choice',
            question: "What is the boolean result of `10 > 5`?",
            options: [
                "True",
                "False",
                "Maybe",
                "Error"
            ],
            correctAnswer: "True",
            explanation: "Booleans can only be `True` or `False`. 10 is indeed greater than 5.",
            requiredConcepts: ["bool"],
            xpReward: 50
        },
        {
            id: 'dt_7',
            type: 'mission_task',
            question: "Create a list `colors` with 'Red' and 'Blue'. Print the list.",
            codeTask: "# Create list:\n",
            regexCheck: /colors\s*=\s*\[\s*['"]Red['"]\s*,\s*['"]Blue['"]\s*\]\s*\n\s*print\s*\(\s*colors\s*\)/,
            expectedOutput: "['Red', 'Blue']",
            learningGoals: "User must create a list with string elements.",
            hint: "Use square brackets `['Red', 'Blue']`.",
            requiredConcepts: ["list", "[]"],
            xpReward: 70
        },
        {
            id: 'dt_8',
            type: 'multiple_choice',
            question: "Which function gives you the length of a string or list?",
            options: [
                "count()",
                "size()",
                "len()",
                "length()"
            ],
            correctAnswer: "len()",
            explanation: "`len()` is the built-in Python function to get the number of items in a sequence.",
            requiredConcepts: ["len"],
            xpReward: 50
        },
        {
            id: 'dt_9',
            type: 'mission_task',
            question: "Print the phrase 'Hello' repeated 3 times using multiplication.",
            codeTask: "# Print 'Hello' * 3:\n",
            regexCheck: /print\s*\(\s*['"]Hello['"]\s*\*\s*3\s*\)/,
            expectedOutput: "HelloHelloHello",
            learningGoals: "User must use string repetition.",
            hint: "You can multiply strings! `print('Hello' * 3)`.",
            requiredConcepts: ["*", "str"],
            xpReward: 70
        },
        {
            id: 'dt_10',
            type: 'debugging',
            question: "This list is missing a closing bracket. Fix it.",
            codeTask: "items = [1, 2, 3",
            regexCheck: /items\s*=\s*\[1,\s*2,\s*3\]/,
            correctAnswer: "items = [1, 2, 3]",
            explanation: "Lists must start and end with square brackets `[]`.",
            hint: "Add a `]` at the end.",
            learningGoals: "User must fix a syntax error in a list definition.",
            requiredConcepts: ["]", "syntax_error"],
            xpReward: 75
        }
    ]
};

export const DATA_TYPES_QUESTION_BANK = {
    "Basics": DATA_TYPES_LEVEL_1.questions.filter(q => q.id.includes('_1') || q.id.includes('_3') || q.id.includes('_6') || q.id.includes('_8')),
    "Conversion": DATA_TYPES_LEVEL_1.questions.filter(q => q.id.includes('_4') || q.id.includes('_5')),
    "Types": DATA_TYPES_LEVEL_1.questions.filter(q => q.id.includes('_2') || q.id.includes('_10')),
    "Strings": DATA_TYPES_LEVEL_1.questions.filter(q => q.id.includes('_9') || q.id.includes('_7'))
};
