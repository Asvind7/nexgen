export const BASICS_FOUNDATION_EXAM = {
    title: "The Foundation: Basics Milestone 🚀",
    passingScore: 800,
    questions: [
        // --- BUG HUNTER TASKS (Tracebacks) ---
        {
            id: "bf_bug1",
            type: "debugging",
            teachMe: "Level 1.1: Syntax Basics",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `SyntaxError: unexpected EOF while parsing`.\n\n**Objective:**\nClose the parenthesis for the `print` function so the message can be sent to the console.",
            codeTask: "# -- NXGN Boot Sequence --\nprint('System Online'",
            expectedOutput: "System Online",
            hint: "Every opening '(' must have a matching closing ')'.",
            explanation: "Unclosed parentheses are a common cause of 'EOL/EOF' errors in Python.",
            learningGoals: "User must fix a missing parenthesis.",
            requiredConcepts: [")"],
            xpReward: 100
        },
        {
            id: "bf_bug2",
            type: "debugging",
            teachMe: "Level 1.2: Variables",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `SyntaxError: invalid syntax` on the variable name.\n\n**Objective:**\nPython variables cannot start with a number. Rename `1st_user` to `user_1` and print it.",
            codeTask: "# -- NXGN Database Link --\n1st_user = 'Nexus'\nprint(1st_user)",
            expectedOutput: "Nexus",
            hint: "Change '1st_user' to 'user_1' in both places.",
            explanation: "Variable names must start with a letter or underscore.",
            learningGoals: "User must fix an illegal variable name.",
            requiredConcepts: ["user_1 ="],
            xpReward: 100
        },
        {
            id: "bf_bug3",
            type: "debugging",
            teachMe: "Level 1.1: Syntax Basics",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `SyntaxError: EOL while scanning string literal`.\n\n**Objective:**\nFix the mismatched quotes. Use double quotes for both the start and end of the string.",
            codeTask: "# -- NXGN Signal Decoder --\nprint(\"Intercepted')",
            expectedOutput: "Intercepted",
            hint: "If you start with \", you must end with \".",
            explanation: "String quotes must be consistent (both ' or both \").",
            learningGoals: "User must fix mismatched string quotes.",
            requiredConcepts: ["\""],
            xpReward: 100
        },

        // --- MENTAL COMPILER MCQs ---
        {
            id: "bf_mcq1",
            type: "mcq",
            teachMe: "Level 1.3: Data Types",
            question: `### 🧠 MENTAL COMPILER
What is the exact data type of the variable \`x\` in this snippet?

\`\`\`python
x = 10.0
\`\`\`
`,
            options: { A: "int", B: "float", C: "string", D: "number" },
            correctAnswer: "B",
            explanation: "Any number with a decimal point is a float in Python, even if it ends in .0.",
            hint: "Look for the decimal point.",
            xpReward: 100
        },
        {
            id: "bf_mcq2",
            type: "mcq",
            teachMe: "Level 1.2: Variables",
            question: `### 🧠 MENTAL COMPILER
What will be the final value of \`power\` printed to the console?

\`\`\`python
power = 10
power = 50
power = 25
print(power)
\`\`\`
`,
            options: { A: "10", B: "50", C: "25", D: "Error" },
            correctAnswer: "C",
            explanation: "Variables store the LAST value they were assigned. 25 was the final assignment.",
            hint: "Variables are like boxes; the last thing you put in is what stays there.",
            xpReward: 100
        },
        {
            id: "bf_mcq3",
            type: "mcq",
            teachMe: "Level 1.4: Operators",
            question: `### 🧠 MENTAL COMPILER
Evaluate the result of this math engine operation:

\`\`\`python
result = 10 + 2 * 5
print(result)
\`\`\`
`,
            options: { A: "60", B: "20", C: "70", D: "15" },
            correctAnswer: "B",
            explanation: "Multiplication happens before addition (PEMDAS/BODMAS). 2 * 5 = 10; 10 + 10 = 20.",
            hint: "Operations follow a specific order. Multiply first!",
            xpReward: 100
        },

        // --- CREATOR MISSIONS ---
        {
            id: "bf_cm1",
            type: "mission_task",
            teachMe: "Level 1.2: Variables",
            question: "### 🚀 MISSION: Variable Initialization\nRegister a new node on the NXGN network.\n\n**Objective:**\n1. Create a variable named `node_id` and set it to `101`.\n2. Print the value of `node_id`.",
            codeTask: "# -- NXGN Node Registry --\n# Create and print node_id below:\n",
            expectedOutput: "101",
            hint: "node_id = 101",
            explanation: "Creating variables allows us to store and reuse data throughout our program.",
            learningGoals: "User must declare and print a variable.",
            requiredConcepts: ["node_id =", "print"],
            xpReward: 200
        },
        {
            id: "bf_cm2",
            type: "mission_task",
            teachMe: "Level 1.4: Operators",
            question: "### 🚀 MISSION: Load Calculator\nCalculate the total energy requirement for two parallel system cores.\n\n**Objective:**\nGiven `core_a = 50` and `core_b = 30`, calculate their **sum** and print the result.",
            codeTask: "# -- NXGN Energy Monitor --\ncore_a = 50\ncore_b = 30\n\n# Calculate and print sum below:\n",
            expectedOutput: "80",
            hint: "print(core_a + core_b)",
            explanation: "Operators like '+' allow you to combine and analyze numeric data.",
            learningGoals: "User must perform addition with variables.",
            requiredConcepts: ["+", "print"],
            xpReward: 200
        },
        {
            id: "bf_cm3",
            type: "mission_task",
            teachMe: "Level 1.3: Data Types",
            question: "### 🚀 MISSION: Type Shifter\nConvert raw numerical data into a displayable string for the UI.\n\n**Objective:**\nConvert the integer `score = 100` into a string and print it. Prefix the number with the label `\"Score: \"`.",
            codeTask: "# -- NXGN UI Protocol --\nscore = 100\n\n# Convert and print (e.g. 'Score: 100') below:\n",
            expectedOutput: "Score: 100",
            hint: "print('Score: ' + str(score))",
            explanation: "str() is essential for mixing numbers into text displays.",
            learningGoals: "User must use str() for type conversion.",
            requiredConcepts: ["str(", "print"],
            xpReward: 200
        },
        {
            id: "bf_cm4",
            type: "mission_task",
            teachMe: "Level 1.1: Syntax Basics",
            question: "### 🚀 MISSION: Multiline Notice\nBroadcast a two-line system status message using a single command.\n\n**Objective:**\nUse **triple quotes** (`'''`) to print the words `READY` and `ACTIVE` on two separate lines.",
            codeTask: "# -- NXGN Broadcaster --\n# Write your multiline print below:\n",
            expectedOutput: "READY\nACTIVE",
            hint: "print('''READY\\nACTIVE''') or use a literal newline inside triple quotes.",
            explanation: "Triple quotes allow for effortless multiline text block printing.",
            learningGoals: "User must use triple quotes for multiline output.",
            requiredConcepts: ["'''", "print"],
            xpReward: 200,
            testCases: [
                { inputCode: "", expectedOutput: "READY\nACTIVE" }
            ]
        }
    ]
};
