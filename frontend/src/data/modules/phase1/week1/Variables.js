export const VARIABLES_LEVEL_1 = {
    questions: [
        {
            id: 'var_1',
            type: 'multiple_choice',
            question: "Which of these is a VALID variable name?",
            options: [
                "player_score",    // Valid (snake_case)
                "PlayerScore",     // Valid (PascalCase)
                "Both A and B",    // Correct
                "player-score"     // Invalid (Hyphen)
            ],
            correctAnswer: "Both A and B",
            explanation: "Python accepts both 'snake_case' (player_score) and 'PascalCase' (PlayerScore) as valid variable names. underscores are standard, but capitals are not syntax errors!",
            hint: "Look for underscores vs hyphens!",
            learningGoals: "User must identify valid variable name syntax (snake_case or PascalCase).",
        },
        {
            id: 'var_2',
            type: 'mission_task',
            question: "Create a variable named `score` and set it to 100.",
            codeTask: "# Create your variable below:\n",
            regexCheck: /score\s*=\s*100/i,
            expectedOutput: "100",
            learningGoals: "User must create a variable 'score' and assign integer 100.",
            hint: "Use the equals sign = to assign a value. Example: x = 5",
            requiredConcepts: ["="],
            xpReward: 70
        },
        {
            id: 'var_3',
            type: 'multiple_choice',
            question: "What happens if you run: `x = 5` then `x = 10`?",
            options: [
                "x becomes 15",
                "x stays 5",
                "x becomes 10",
                "Error: Duplicate variable"
            ],
            correctAnswer: "x becomes 10",
            explanation: "Variables are just labels. Assigning a new value overwrites the old one completely.",
            requiredConcepts: ["reassignment"],
            xpReward: 50
        },
        {
            id: 'var_4',
            type: 'mission_task',
            question: "Assign the text 'Python' to a variable named `language`.",
            codeTask: "# Create your variable below:\n",
            regexCheck: /language\s*=\s*['"]Python['"]/i,
            expectedOutput: "Python",
            learningGoals: "User must assign a string value to a variable.",
            hint: "Strings need quotes! Example: name = 'Neo'",
            requiredConcepts: ["="],
            xpReward: 70
        },
        {
            id: 'var_5',
            type: 'debugging',
            question: "REPAIR MISSION: 'class' is a reserved keyword and cannot be used as a variable name. Rename it to 'category'!",
            codeTask: "class = 'Warrior'\nprint(class)",
            regexCheck: /category\s*=\s*['"]Warrior['"]\s*[\s\n]*print\s*\(\s*category\s*\)/,
            expectedOutput: "Warrior",
            correctAnswer: "category = 'Warrior'\nprint(category)",
            explanation: "Reserved keywords like 'class', 'def', and 'if' have special meanings in Python and cannot represent variables.",
            hint: "Change 'class' to 'category' in both lines.",
            learningGoals: "User must understand and fix reserved keyword errors.",
            requiredConcepts: ["="],
            xpReward: 75
        },
        {
            id: 'var_6',
            type: 'multiple_choice',
            question: "Which line swaps the values of `a` and `b`?",
            options: [
                "a = b",
                "a, b = b, a",
                "swap(a, b)",
                "b = a"
            ],
            correctAnswer: "a, b = b, a",
            explanation: "Python's tuple unpacking `a, b = b, a` is the standard, pythonic way to swap values without a temporary variable.",
            requiredConcepts: ["multiple_assignment"],
            xpReward: 60
        },
        {
            id: 'var_7',
            type: 'mission_task',
            question: "Create `x` (value 5) and `y` (value 10) on a single line.",
            codeTask: "# Use comma assignment:\n",
            regexCheck: /x\s*,\s*y\s*=\s*5\s*,\s*10/i,
            expectedOutput: "5 10",
            learningGoals: "User must use multiple assignment syntax.",
            hint: "Separate variables and values with commas. Example: a, b = 1, 2",
            requiredConcepts: ["=", ","],
            xpReward: 80
        },
        {
            id: 'var_8',
            type: 'multiple_choice',
            question: "If `x = 5`, what is `x` after `x = x + 2`?",
            options: ["5", "7", "2", "Undefined"],
            correctAnswer: "7",
            explanation: "Python evaluates the right side (5 + 2 = 7) first, then assigns it back to `x`.",
            requiredConcepts: ["updating_variables"],
            xpReward: 50
        },
        {
            id: 'var_9',
            type: 'mission_task',
            question: "Use an f-string to print: 'Score: 100'. Use the provided variable.",
            codeTask: "score = 100  # <--- Do not change this line\n# Write your print statement below:\n",
            regexCheck: /print\s*\(\s*f['"]Score:\s*\{score\}['"]\s*\)/i,
            expectedOutput: "Score: 100",
            learningGoals: "User must use an f-string to interpolate a variable.",
            hint: "Put an 'f' before the quotes and use {score} inside.",
            requiredConcepts: ["print", "f"],
            xpReward: 90
        },
        {
            id: 'var_10',
            type: 'debugging',
            question: "The code below crashes. Fix the order.",
            codeTask: "print(message)\nmessage = 'Hello'",
            regexCheck: /message\s*=\s*['"]Hello['"]\s*\n*\s*print\s*\(\s*message\s*\)/,
            correctAnswer: "message = 'Hello'\nprint(message)",
            explanation: "You cannot print a variable that hasn't been created yet. Move the definition to the top.",
            hint: "Code runs top to bottom. Define first, print second.",
            learningGoals: "User must understand execution order/scope.",
            requiredConcepts: ["print", "="],
            xpReward: 75
        }
    ]
};

export const VARIABLES_QUESTION_BANK = {
    "Naming": VARIABLES_LEVEL_1.questions.filter(q => q.id.includes('var_1') || q.id.includes('var_5')),
    "Assignment": VARIABLES_LEVEL_1.questions.filter(q => q.id.includes('var_2') || q.id.includes('var_4') || q.id.includes('var_7')),
    "Reassignment": VARIABLES_LEVEL_1.questions.filter(q => q.id.includes('var_3') || q.id.includes('var_8')),
    "Logic": VARIABLES_LEVEL_1.questions.filter(q => q.id.includes('var_9') || q.id.includes('var_10'))
};
