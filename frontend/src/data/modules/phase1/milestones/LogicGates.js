export const LOGIC_GATES_EXAM = {
    title: "Logic Gates & Control Flow Mastery 🛡️",
    passingScore: 1500,
    questions: [
        // --- BUG HUNTER TASKS (Tracebacks) ---
        {
            id: "lg_bug1",
            type: "debugging",
            teachMe: "Level 1.1: Syntax Basics",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `SyntaxError: expected ':'`.\n\n**Objective:**\nIdentify and fix the missing structural character in the `if` statement below.",
            codeTask: "# -- NXGN Core Logic --\nis_ready = True\n\nif is_ready\n    print('System Live')",
            expectedOutput: "System Live",
            hint: "Control flow statements like 'if' and 'else' always end with a colon.",
            explanation: "Colons are the gateway to new code blocks in Python.",
            learningGoals: "User must fix a missing colon syntax error.",
            requiredConcepts: [":"],
            xpReward: 150
        },
        {
            id: "lg_bug2",
            type: "debugging",
            teachMe: "Level 1.4: Operators",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `NameError: name 'score' is not defined`.\n\n**Objective:**\nResolve the capitalization mismatch. Remember that Python is **case-sensitive**.",
            codeTask: "# -- NXGN Score Tracker --\nScore = 10\n\n# Fix reference below:\nprint(score)",
            expectedOutput: "10",
            hint: "Python is case-sensitive. 'Score' and 'score' are different boxes!",
            explanation: "Variable names must match exactly, including capitalization.",
            learningGoals: "User must fix a case-sensitivity error.",
            requiredConcepts: ["score ="],
            xpReward: 150
        },
        {
            id: "lg_bug3",
            type: "debugging",
            teachMe: "Level 1.6: Loops",
            question: "### 🛠️ BUG HUNTER\nThis retrieval loop is cutting off early! It only prints **0 to 4**.\n\n**Objective:**\nAdjust the range so it prints **0, 1, 2, 3, 4, 5**.",
            codeTask: "# -- NXGN Data Retrieval --\nfor i in range(5):\n    print(i)",
            expectedOutput: "0\n1\n2\n3\n4\n5",
            hint: "The stop value in range() is exclusive. Add 1 to it!",
            explanation: "range(n) goes from 0 up to, but not including, n.",
            learningGoals: "User must fix a range boundary.",
            requiredConcepts: ["range(6)"],
            xpReward: 150
        },

        // --- MENTAL COMPILER MCQs ---
        {
            id: "lg_mcq1",
            type: "mcq",
            teachMe: "Level 1.5: Conditionals",
            question: `### 🧠 MENTAL COMPILER
What is the final output of this logic gate?

\`\`\`python
power = 10
if power > 5:
    if power < 15:
        print("Stable")
    else:
        print("High")
else:
    print("Low")
\`\`\`
`,
            options: { A: "Stable", B: "High", C: "Low", D: "SyntaxError" },
            correctAnswer: "A",
            explanation: "Power is 10, which is > 5 AND < 15. The 'Stable' block executes.",
            hint: "Trace both 'if' statements step by step.",
            xpReward: 100
        },
        {
            id: "lg_mcq2",
            type: "mcq",
            teachMe: "Level 1.3: Data Types",
            question: `### 🧠 MENTAL COMPILER
What will the console display after execution?

\`\`\`python
a = "10"
b = 2
print(a * b)
\`\`\`
`,
            options: { A: "20", B: "1010", C: "TypeError", D: "12" },
            correctAnswer: "B",
            explanation: "Multiplying a string by an integer repeats the string. '10' * 2 = '1010'.",
            hint: "Check the type of 'a'. It's in quotes!",
            xpReward: 100
        },
        {
            id: "lg_mcq3",
            type: "mcq",
            teachMe: "Level 1.4: Operators",
            question: `### 🧠 MENTAL COMPILER
Evaluate the boolean logic gate results:

\`\`\`python
x = True
y = False
z = x or y
print(not z)
\`\`\`
`,
            options: { A: "True", B: "False", C: "None", D: "Error" },
            correctAnswer: "B",
            explanation: "x or y is True. 'not True' is False.",
            hint: "Evaluate brackets (z) first, then the 'not'.",
            xpReward: 100
        },

        // --- CREATOR MISSIONS ---
        {
            id: "lg_cm1",
            type: "mission_task",
            teachMe: "Level 1.5: Conditionals",
            question: "### 🚀 MISSION: Climate Control\nImplement a logic gate to monitor a thermal sensor.\n\n**Requirements:**\n- If `temp` is **greater than 30**, print `\"Hot\"`.\n- If `temp` is **between 20 and 30** (inclusive 20), print `\"Warm\"`.\n- Otherwise, print `\"Cold\"`.",
            codeTask: "# Thermal Sensor Data\ntemp = 25\n\n# Write your logic below:\n",
            hint: "Use if, elif, and else. Example: if temp > 30: print('Hot')",
            explanation: "Elif chains are perfect for multi-stage environmental checks.",
            learningGoals: "User must implement a three-way conditional chain.",
            requiredConcepts: ["if", "elif", "else"],
            xpReward: 250,
            testCases: [
                { inputCode: "temp = 35", expectedOutput: "Hot", showInConsole: true },
                { inputCode: "temp = 25", expectedOutput: "Warm", showInConsole: true },
                { inputCode: "temp = 10", expectedOutput: "Cold", showInConsole: true }
            ]
        },
        {
            id: "lg_cm2",
            type: "mission_task",
            teachMe: "Level 1.6: Loops",
            question: "### 🚀 MISSION: Brand Expansion\nThe NXGN Marketing team needs to repeat a message.\n\n**Objective:**\nUse a `for` loop and `range()` to print the string `\"NexGen\"` exactly **3 times**.",
            codeTask: "# NXGN Branding Module\n# Write your loop below:\n",
            hint: "Use range(3) and a print statement.",
            explanation: "Loops excel at repetitive output tasks.",
            learningGoals: "User must repeat a string using a for loop.",
            requiredConcepts: ["for", "range", "print"],
            xpReward: 250,
            testCases: [
                { inputCode: "", expectedOutput: "NexGen\nNexGen\nNexGen" }
            ]
        },
        {
            id: "lg_cm3",
            type: "mission_task",
            teachMe: "Level 1.4: Operators",
            question: "### 🚀 MISSION: Computation Core\nEnsure the math engine follows the correct order of operations.\n\n**Objective:**\nCalculate `(10 + 2) * 2`. Use parameters to ensure addition happens **first**.",
            codeTask: "# NXGN Math Processor\n\n# Your calculation and print here:\n",
            hint: "Use parentheses to control order of operations.",
            explanation: "Parentheses ensure addition happens before multiplication.",
            learningGoals: "User must use operators and parenthetical precedence.",
            requiredConcepts: ["(", ")", "*", "print"],
            xpReward: 250,
            testCases: [
                { inputCode: "", expectedOutput: "24" }
            ]
        },
        {
            id: "lg_cm4",
            type: "mission_task",
            teachMe: "Level 1.5: Conditionals",
            question: "### 🚀 MISSION: Security Firewall\nBuild a dual-factor authentication gate.\n\n**Objective:**\nPrint `\"Access Granted\"` ONLY if `user` is `\"Admin\"` **AND** `code` is `1234`. Otherwise, print `\"Denied\"`.",
            codeTask: "# Security Credentials\nuser = 'Admin'\ncode = 1234\n\n# Write security check logic below:\n",
            hint: "Use `if user == 'Admin' and code == 1234:`",
            explanation: "Combining conditions with 'and' creates secure logic gates.",
            learningGoals: "User must use logical 'and' in a conditional.",
            requiredConcepts: ["if", "and", "==", "else"],
            xpReward: 250,
            testCases: [
                { inputCode: "user='Admin'; code=1234", expectedOutput: "Access Granted" },
                { inputCode: "user='Guest'; code=1234", expectedOutput: "Denied" },
                { inputCode: "user='Admin'; code=1111", expectedOutput: "Denied" }
            ]
        }
    ]
};
