export const OPERATORS_LEVEL_1 = {
    questions: [
        {
            id: 'op_1',
            type: 'multiple_choice',
            question: "Which operator matches 'multiplication'?",
            options: [
                "x",
                "*",
                "#",
                "^"
            ],
            correctAnswer: "*",
            explanation: "Python uses the asterisk `*` for multiplication.",
            requiredConcepts: ["multiplication"],
            xpReward: 50
        },
        {
            id: 'op_2',
            type: 'mission_task',
            question: "Calculate `10` times `5` and print the result.",
            codeTask: "# Print the calculation:\n",
            regexCheck: /print\s*\(\s*10\s*\*\s*5\s*\)/,
            expectedOutput: "50",
            learningGoals: "User must perform multiplication inside a print statement.",
            hint: "Use `print(10 * 5)`.",
            requiredConcepts: ["*", "print"],
            xpReward: 70
        },
        {
            id: 'op_3',
            type: 'multiple_choice',
            question: "What is the result of `10 / 3` in Python?",
            options: [
                "3",
                "3.33333...",
                "3.0",
                "Error"
            ],
            correctAnswer: "3.33333...",
            explanation: "The single slash `/` always performs 'true division' and returns a float (decimal).",
            requiredConcepts: ["division"],
            xpReward: 50
        },
        {
            id: 'op_4',
            type: 'mission_task',
            question: "Use 'Floor Division' to get the integer result of `10` divided by `3`. (Should be 3).",
            codeTask: "# Use // operator:\n",
            regexCheck: /print\s*\(\s*10\s*\/\/\s*3\s*\)/,
            expectedOutput: "3",
            learningGoals: "User must use the floor division operator.",
            hint: "Floor division uses two slashes: `//`.",
            requiredConcepts: ["//"],
            xpReward: 70
        },
        {
            id: 'op_5',
            type: 'debugging',
            question: "This code tries to square a number but fails.",
            codeTask: "print(5 ^ 2)",
            regexCheck: /print\s*\(\s*5\s*(\*\*|pow).*2\s*\)/i,
            expectedOutput: "25",
            correctAnswer: "print(5 ** 2)",
            explanation: "In Python, `^` is bitwise XOR. For exponents (powers), use `**` or `math.pow()`.",
            hint: "Change `^` to `**` for power.",
            learningGoals: "User must fix the exponent operator.",
            requiredConcepts: ["**"],
            xpReward: 75
        },
        {
            id: 'op_6',
            type: 'multiple_choice',
            question: "What does the modulo operator `%` do?",
            options: [
                "Calculates percentage",
                "Returns the remainder of division",
                "Divides two numbers",
                "Rounds up"
            ],
            correctAnswer: "Returns the remainder of division",
            explanation: "`%` gives you the remainder. Example: `5 % 2` is `1` (because 2 goes into 5 twice with 1 left over).",
            requiredConcepts: ["modulo"],
            xpReward: 50
        },
        {
            id: 'op_7',
            type: 'mission_task',
            question: "Check if `10` is even using modulo. Print the result (0 means even).",
            codeTask: "# Print 10 % 2:\n",
            regexCheck: /print\s*\(\s*10\s*%\s*2\s*\)/,
            expectedOutput: "0",
            learningGoals: "User must use the modulo operator to check for evenness.",
            hint: "Use `print(10 % 2)`.",
            requiredConcepts: ["%", "10", "2"],
            xpReward: 80
        },
        {
            id: 'op_8',
            type: 'multiple_choice',
            question: "Which operator means 'Not Equal'?",
            options: [
                "<>",
                "!=",
                "not =",
                "~="
            ],
            correctAnswer: "!=",
            explanation: "`!=` checks if two values are different.",
            requiredConcepts: ["inequality"],
            xpReward: 50
        },
        {
            id: 'op_9',
            type: 'mission_task',
            question: "Print `True` if `5` is less than `10`.",
            codeTask: "# Use < operator:\n",
            regexCheck: /print\s*\(\s*5\s*<\s*10\s*\)/,
            expectedOutput: "True",
            learningGoals: "User must use the less-than operator.",
            hint: "Use `print(5 < 10)`.",
            requiredConcepts: ["<", "True"],
            xpReward: 80
        },
        {
            id: 'op_10',
            type: 'debugging',
            question: "This logic check is broken.",
            codeTask: "if 5 = 5:\n    print('Equal')",
            regexCheck: /if\s+5\s*==\s*5:\s*\n\s+print\s*\(\s*['"]Equal['"]\s*\)/,
            expectedOutput: "Equal",
            correctAnswer: "if 5 == 5:\n    print('Equal')",
            explanation: "Use `==` to compare values. `=` is for assignment.",
            hint: "Change `=` to `==`.",
            learningGoals: "User must correct an assignment vs comparison error.",
            requiredConcepts: ["==", "syntax_error"],
            xpReward: 75
        }
    ]
};

export const OPERATORS_QUESTION_BANK = {
    "Arithmetic": OPERATORS_LEVEL_1.questions.filter(q => q.id.includes('op_1') || q.id.includes('op_2') || q.id.includes('op_3') || q.id.includes('op_4')),
    "Modulus_Exponents": OPERATORS_LEVEL_1.questions.filter(q => q.id.includes('op_5') || q.id.includes('op_6') || q.id.includes('op_7')),
    "Logical": OPERATORS_LEVEL_1.questions.filter(q => q.id.includes('op_8') || q.id.includes('op_9') || q.id.includes('op_10'))
};
