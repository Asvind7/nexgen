export const CONDITIONALS_LEVEL_1 = {
    questions: [
        {
            id: 'cond_1',
            type: 'multiple_choice',
            question: "Which keyword starts a conditional statement?",
            options: [
                "check",
                "when",
                "if",
                "condition"
            ],
            correctAnswer: "if",
            explanation: "The `if` keyword is used to check a condition. If it's True, the code block runs.",
            requiredConcepts: ["if_statement"],
            xpReward: 50
        },
        {
            id: 'cond_2',
            type: 'mission_task',
            question: "Write an `if` statement that checks if `x` is greater than 5. Print 'Big' if true.",
            codeTask: "x = 10\n# Write your if statement:\n",
            regexCheck: /if\s+x\s*>\s*5:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Big['"]\s*\)/,
            expectedOutput: "Big",
            learningGoals: "User must write a basic if statement with a comparison.",
            hint: "Use `if x > 5:` and indent the print statement.",
            requiredConcepts: ["if", ">", "print"],
            xpReward: 70
        },
        {
            id: 'cond_3',
            type: 'multiple_choice',
            question: "What runs if the `if` condition is False?",
            options: [
                "The loop",
                "The else block",
                "The function",
                "Nothing ever"
            ],
            correctAnswer: "The else block",
            explanation: "The `else` block executes only when the `if` condition (and any `elif` conditions) are False.",
            requiredConcepts: ["else_block"],
            xpReward: 50
        },
        {
            id: 'cond_4',
            type: 'mission_task',
            question: "Use `else` to print 'Small' if `x` is NOT greater than 5.",
            codeTask: "x = 2\nif x > 5:\n    print('Big')\n# Add else below:\n",
            regexCheck: /else:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Small['"]\s*\)/,
            expectedOutput: "Small",
            learningGoals: "User must add an else block.",
            hint: "Write `else:` on a new line (not indented) and indent the print.",
            requiredConcepts: ["else"],
            xpReward: 70
        },
        {
            id: 'cond_5',
            type: 'debugging',
            question: "Fix the indentation error.",
            codeTask: "if True:\nprint('Indented?')",
            regexCheck: /if\s+True:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Indented\?['"]\s*\)/,
            correctAnswer: "if True:\n    print('Indented?')",
            explanation: "Python requires indentation (usually 4 spaces) for code inside an `if` block.",
            hint: "Add 4 spaces before the print statement.",
            learningGoals: "User must fix an indentation error.",
            requiredConcepts: ["if", ":"],
            xpReward: 75
        },
        {
            id: 'cond_6',
            type: 'multiple_choice',
            question: "How do you check multiple conditions in order?",
            options: [
                "if, then, else",
                "if, elif, else",
                "check, check, check",
                "try, except, finally"
            ],
            correctAnswer: "if, elif, else",
            explanation: "Use `elif` (else if) to check additional conditions after the first `if`.",
            requiredConcepts: ["elif"],
            xpReward: 50
        },
        {
            id: 'cond_7',
            type: 'mission_task',
            question: "Check if `age` is >= 18. Print 'Adult'. Must use `>=`.",
            codeTask: "age = 20\n# Write check below:\n",
            regexCheck: /if\s+age\s*>=\s*18:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Adult['"]\s*\)/,
            expectedOutput: "Adult",
            learningGoals: "User must use the greater-than-or-equal-to operator.",
            hint: "Use `if age >= 18:`.",
            requiredConcepts: ["if", ">="],
            xpReward: 80
        },
        {
            id: 'cond_8',
            type: 'multiple_choice',
            question: "Which operator checks if two values are EQUAL?",
            options: [
                "=",
                "==",
                "===",
                "!="
            ],
            correctAnswer: "==",
            explanation: "`==` compares values. `=` assigns a value.",
            requiredConcepts: ["equality_operator"],
            xpReward: 50
        },
        {
            id: 'cond_9',
            type: 'mission_task',
            question: "Use `elif` to print 'Zero' if `x` is exactly 0.",
            codeTask: "x = 0\nif x > 0:\n    print('Pos')\n# Add elif below:\n",
            regexCheck: /elif\s+x\s*==\s*0:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Zero['"]\s*\)/,
            expectedOutput: "Zero",
            learningGoals: "User must use an elif block with an equality check.",
            hint: "Use `elif x == 0:`.",
            requiredConcepts: ["elif", "=="],
            xpReward: 80
        },
        {
            id: 'cond_10',
            type: 'debugging',
            question: "The code fails. Fix the syntax.",
            codeTask: "if x = 10:\n    print('Ten')",
            regexCheck: /if\s+x\s*==\s*10:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Ten['"]\s*\)/,
            correctAnswer: "if x == 10:\n    print('Ten')",
            explanation: "You must use `==` for comparison inside an `if` statement. `=` is for assignment.",
            hint: "Change the single `=` to a double `==`.",
            learningGoals: "User must correct an assignment vs comparison error.",
            requiredConcepts: ["if", "=="],
            xpReward: 75
        }
    ]
};

export const CONDITIONALS_QUESTION_BANK = {
    "Basic_If": CONDITIONALS_LEVEL_1.questions.filter(q => q.id.includes('cond_1') || q.id.includes('cond_2') || q.id.includes('cond_5')),
    "Else_Logic": CONDITIONALS_LEVEL_1.questions.filter(q => q.id.includes('cond_3') || q.id.includes('cond_4')),
    "Elif_Multi": CONDITIONALS_LEVEL_1.questions.filter(q => q.id.includes('cond_6') || q.id.includes('cond_9')),
    "Operators": CONDITIONALS_LEVEL_1.questions.filter(q => q.id.includes('cond_7') || q.id.includes('cond_8') || q.id.includes('cond_10'))
};
