export const LOOPS_LEVEL_1 = {
    questions: [
        {
            id: 'loop_1',
            type: 'multiple_choice',
            question: "Which loop is best when you know exactly how many times to repeat?",
            options: [
                "while loop",
                "for loop",
                "if loop",
                "repeat loop"
            ],
            correctAnswer: "for loop",
            explanation: "A `for` loop is ideal for iterating a specific number of times (like `range(5)`) or over a collection.",
            requiredConcepts: ["loops"],
            xpReward: 50
        },
        {
            id: 'loop_2',
            type: 'mission_task',
            question: "Write a for loop that prints numbers 0 to 4.",
            codeTask: "# Use range(5) below:\n",
            regexCheck: /for\s+[a-z_]+\s+in\s+range\s*\(\s*5\s*\):\s*(?:\n\s*|\s+)print\s*\(\s*[a-z_]+\s*\)/,
            expectedOutput: "0\n1\n2\n3\n4",
            learningGoals: "User must use a for loop with range(5).",
            hint: "Use `for i in range(5):` and print `i` inside.",
            requiredConcepts: ["for", "range"],
            xpReward: 70
        },
        {
            id: 'loop_3',
            type: 'multiple_choice',
            question: "What happens if a `while` loop condition never becomes False?",
            options: [
                "It stops automatically",
                "It runs forever (Infinite Loop)",
                "It crashes Python immediately",
                "It skips the code"
            ],
            correctAnswer: "It runs forever (Infinite Loop)",
            explanation: "If the condition always stays True, the loop never exits. This is called an Infinite Loop.",
            requiredConcepts: ["infinite_loop"],
            xpReward: 50
        },
        {
            id: 'loop_4',
            type: 'mission_task',
            question: "Use a `while` loop to print 'Run' 3 times.",
            codeTask: "# Setup: count = 0\n# Write your while loop:\n",
            regexCheck: /while\s+[a-z_]+\s*[<]=?\s*3:\s*(?:\n\s*|\s+)print\s*\(\s*['"]Run['"]\s*\)\s*(?:\n\s*|\s+)[a-z_]+\s*\+=\s*1/,
            expectedOutput: "Run\nRun\nRun",
            learningGoals: "User must create a while loop with a counter.",
            hint: "Check `count < 3`. Don't forget to increase `count` inside the loop!",
            requiredConcepts: ["while", "+="],
            xpReward: 70
        },
        {
            id: 'loop_5',
            type: 'debugging',
            question: "This while loop runs forever! Add a line to stop it.",
            codeTask: "x = 0\nwhile x < 5:\n    print(x)",
            regexCheck: /x\s*\+=\s*1|x\s*=\s*x\s*\+\s*1/,
            correctAnswer: "x = 0\nwhile x < 5:\n    print(x)\n    x += 1",
            explanation: "You must increment `x` inside the loop so that `x < 5` eventually becomes False.",
            hint: "Add `x += 1` inside the loop.",
            learningGoals: "User must fix an infinite loop by updating the control variable.",
            requiredConcepts: ["increment"],
            xpReward: 75
        },
        {
            id: 'loop_6',
            type: 'multiple_choice',
            question: "Which keyword executes the current iteration immediately and goes to the next one?",
            options: [
                "break",
                "stop",
                "continue",
                "pass"
            ],
            correctAnswer: "continue",
            explanation: "`continue` skips the rest of the current loop block and jumps back to the top for the next check.",
            requiredConcepts: ["continue"],
            xpReward: 50
        },
        {
            id: 'loop_7',
            type: 'mission_task',
            question: "Loop through the list `['A', 'B']` and print each item.",
            codeTask: "items = ['A', 'B']\n# Loop through items:\n",
            regexCheck: /for\s+[a-z_]+\s+in\s+items:\s*(?:\n\s*|\s+)print\s*\(\s*[a-z_]+\s*\)/,
            expectedOutput: "A\nB",
            learningGoals: "User must iterate over a list using a for loop.",
            hint: "Use `for item in items:`.",
            requiredConcepts: ["for", "in", "items"],
            xpReward: 80
        },
        {
            id: 'loop_8',
            type: 'multiple_choice',
            question: "How do you stop a loop completely, right now?",
            options: [
                "exit",
                "break",
                "stop",
                "return"
            ],
            correctAnswer: "break",
            explanation: "`break` exits the loop immediately, skipping any remaining code inside it.",
            requiredConcepts: ["break"],
            xpReward: 50
        },
        {
            id: 'loop_9',
            type: 'mission_task',
            question: "Use `break` to stop the loop when `i` is 2.",
            codeTask: "for i in range(5):\n    # Add if i == 2: break\n    print(i)",
            regexCheck: /if\s+i\s*==\s*2:\s*break/,
            expectedOutput: "0\n1",
            learningGoals: "User must use break inside a loop.",
            hint: "Check if `i` equals 2, then `break`.",
            requiredConcepts: ["break", "if"],
            xpReward: 80
        },
        {
            id: 'loop_10',
            type: 'debugging',
            question: "The code below fails. Fix the loop syntax.",
            codeTask: "for i in range(3)\n    print(i)",
            regexCheck: /range\s*\(\s*3\s*\):/,
            correctAnswer: "for i in range(3):\n    print(i)",
            explanation: "Loops must end with a colon `:`.",
            hint: "Add a colon : after `range(3)`.",
            learningGoals: "User must fix a syntax error (missing colon) in a for loop.",
            requiredConcepts: [":"],
            xpReward: 75
        }
    ]
};

export const LOOPS_QUESTION_BANK = {
    "For_Loops": LOOPS_LEVEL_1.questions.filter(q => q.id.includes('loop_1') || q.id.includes('loop_2') || q.id.includes('loop_7') || q.id.includes('loop_10')),
    "While_Loops": LOOPS_LEVEL_1.questions.filter(q => q.id.includes('loop_3') || q.id.includes('loop_4') || q.id.includes('loop_5')),
    "Control_Keywords": LOOPS_LEVEL_1.questions.filter(q => q.id.includes('loop_6') || q.id.includes('loop_8') || q.id.includes('loop_9'))
};
