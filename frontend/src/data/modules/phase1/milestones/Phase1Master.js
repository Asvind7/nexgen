export const PHASE_1_MASTER_EXAM = {
    title: "Python Logic Master 🐍",
    passingScore: 1500,
    questions: [
        // --- BUG HUNTER TASKS (Tracebacks) ---
        {
            id: "pm_bug1",
            type: "debugging",
            teachMe: "Level 1.4: Indentation",
            question: "### 🛠️ BUG HUNTER\nThe system threw an `IndentationError: expected an indented block`.\n\n**Objective:**\nFix the indentation to ensure the `print` statement is correctly nested within the loop.",
            codeTask: "# -- NXGN Iteration Module --\nfor i in range(3):\nprint(i)",
            expectedOutput: "0\n1\n2",
            hint: "Python uses spaces or tabs to define blocks of code.",
            explanation: "In Python, anything inside a loop, function, or if-statement must be indented.",
            learningGoals: "User must fix an IndentationError.",
            requiredConcepts: ["    print"],
            xpReward: 150
        },
        {
            id: "pm_bug2",
            type: "debugging",
            teachMe: "Level 1.3: Data Types",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `TypeError: can only concatenate str (not \"int\") to str`.\n\n**Objective:**\nFix the string concatenation logic so the integer `age` can be displayed.",
            codeTask: "# -- NXGN Identity Check --\nage = 25\n\n# Fix the line below:\nprint(\"I am \" + age + \" years old.\")",
            expectedOutput: "I am 25 years old.",
            hint: "You cannot add a number directly to a string. How do you convert an integer to a string?",
            explanation: "Python is strongly typed. You must explicitly convert numbers to strings using `str(age)` or use f-strings before concatenation.",
            learningGoals: "User must fix a TypeError during string concatenation.",
            requiredConcepts: ["str(", "age"],
            xpReward: 150
        },
        {
            id: "pm_bug3",
            type: "debugging",
            teachMe: "Level 1.1: Syntax Basics",
            question: "### 🛠️ BUG HUNTER\nThe system threw a `SyntaxError: invalid syntax` near the `if` statement.\n\n**Objective:**\nRecover the missing architectural character needed to open the code block.",
            codeTask: "# -- NXGN Security Protocol --\nx = 5\n\nif x == 5\n    print(\"High Five!\")",
            expectedOutput: "High Five!",
            hint: "Python needs a specific character at the end of statements like `if`, `for`, and `def`.",
            explanation: "The colon `:` is strictly required to open a new code block in Python.",
            learningGoals: "User must fix a missing colon SyntaxError.",
            requiredConcepts: [":"],
            xpReward: 150
        },

        // --- MENTAL COMPILER MCQs ---
        {
            id: "pm_mcq1",
            type: "mcq",
            teachMe: "Level 1.5: Conditionals",
            question: `### 🧠 MENTAL COMPILER
Analyze the type conversion logic and determine the output:

\`\`\`python
x = 5
y = "5"
if x == int(y):
    print("Match")
else:
    print("No Match")
\`\`\`
`,
            options: { A: "Match", B: "No Match", C: "TypeError", D: "SyntaxError" },
            correctAnswer: "A",
            explanation: "The `int(y)` converts the string '5' to the integer 5, making `x == 5` True.",
            hint: "Check what `int(y)` does to the string '5'.",
            xpReward: 100
        },
        {
            id: "pm_mcq2",
            type: "mcq",
            teachMe: "Level 1.6: Loops",
            question: `### 🧠 MENTAL COMPILER
Trace the variable state and determine the **final** console output:

\`\`\`python
count = 0
while count < 3:
    count += 1
print(count)
\`\`\`
`,
            options: { A: "0 1 2", B: "1 2 3", C: "2", D: "3" },
            correctAnswer: "D",
            explanation: "The `print(count)` is OUTSIDE the loop. It only prints once, after the loop finishes when count is 3.",
            hint: "Look closely at the indentation of the `print` statement.",
            xpReward: 100
        },
        {
            id: "pm_mcq3",
            type: "mcq",
            teachMe: "Level 1.7: Boolean Logic",
            question: `### 🧠 MENTAL COMPILER
Evaluate the nested boolean conditions:

\`\`\`python
a = True
b = False
if a and b:
    print("1")
elif a or b:
    print("2")
else:
    print("3")
\`\`\`
`,
            options: { A: "1", B: "2", C: "3", D: "True" },
            correctAnswer: "B",
            explanation: "`a and b` is False because `b` is False. The `elif a or b` is True because `a` is True.",
            hint: "Remember: 'and' needs both sides to be True. 'or' only needs one.",
            xpReward: 100
        },

        // --- CREATOR MISSIONS ---
        {
            id: "pm_cm1",
            type: "mission_task",
            teachMe: "Level 1.5: Conditionals",
            question: "### 🚀 MISSION: Age Verification\nDefine a reusable safety gate for user access.\n\n**Objective:**\nWrite a function `check_age(age)` that returns `\"Adult\"` if age is **18 or older**, and `\"Minor\"` otherwise.",
            codeTask: "# -- NXGN Auth Service --\ndef check_age(age):\n    # Your logic here\n    pass",
            hint: "Use an `if/else` block and `return` the exact strings 'Adult' or 'Minor'.",
            explanation: "Simple conditionals are the foundation of decision-making programs like age verification.",
            learningGoals: "User must create a function with if/else conditionals.",
            requiredConcepts: ["def check_age(age)", "if", "else", "return"],
            xpReward: 200,
            testCases: [
                { inputCode: `print(check_age(20))`, expectedOutput: "Adult" },
                { inputCode: `print(check_age(15))`, expectedOutput: "Minor" },
                { inputCode: `print(check_age(18))`, expectedOutput: "Adult" }
            ]
        },
        {
            id: "pm_cm2",
            type: "mission_task",
            teachMe: "Level 1.6: Loops",
            question: "### 🚀 MISSION: Even Filter\nProcess a stream of numbers to count specific signals.\n\n**Objective:**\nWrite a function `count_evens(limit)` that returns the total count of **even numbers** from 1 up to the `limit` (inclusive).",
            codeTask: "# -- NXGN Analytics Core --\ndef count_evens(limit):\n    count = 0\n    # Use a loop here\n    return count",
            hint: "Use `range(1, limit + 1)` and the modulo operator `% 2 == 0` to check for evens.",
            explanation: "Combining loops and conditionals allows you to filter data.",
            learningGoals: "User must combine loops and conditionals to filter data.",
            requiredConcepts: ["for", "range", "if", "% 2 == 0"],
            xpReward: 200,
            testCases: [
                { inputCode: `print(count_evens(5))`, expectedOutput: "2" },
                { inputCode: `print(count_evens(10))`, expectedOutput: "5" }
            ]
        },
        {
            id: "pm_cm3",
            type: "mission_task",
            teachMe: "Level 1.5: Conditionals",
            question: "### 🚀 MISSION: Dynamic Discounting\nApply tiered pricing logic to a checkout system.\n\n**Objective:**\nWrite a function `get_discount(price)` that returns:\n- **20** if price > 100\n- **10** if price > 50\n- **0** otherwise.",
            codeTask: "# -- NXGN Billing Engine --\ndef get_discount(price):\n    # Return the correct discount integer\n    pass",
            hint: "Use `if`, `elif`, and `else`.",
            explanation: "Elif chains allow you to handle multiple distinct boundaries easily.",
            learningGoals: "User must implement an if/elif/else chain.",
            requiredConcepts: ["if", "elif", "else", "return"],
            xpReward: 200,
            testCases: [
                { inputCode: `print(get_discount(150))`, expectedOutput: "20" },
                { inputCode: `print(get_discount(75))`, expectedOutput: "10" },
                { inputCode: `print(get_discount(20))`, expectedOutput: "0" }
            ]
        },
        {
            id: "pm_cm4",
            type: "mission_task",
            teachMe: "Level 1.6: Loops",
            question: "### 🚀 MISSION: Visual Grid\nGenerate custom UI elements using character multiplication.\n\n**Objective:**\nWrite a function `print_stars(n)` that **PRINTS** a single line with `n` asterisks (e.g., `***` if n=3).",
            codeTask: "# -- NXGN UI Component --\ndef print_stars(n):\n    # Print n stars on ONE line\n    pass",
            hint: "Python makes this easy! You can multiply a string, or use a loop with `end=''`.",
            explanation: "String multiplication (`'*' * n`) is a very Pythonic trick.",
            learningGoals: "User must generate a repetitive string pattern based on an input.",
            requiredConcepts: ["def print_stars(", "print"],
            xpReward: 200,
            testCases: [
                { inputCode: `print_stars(4)`, expectedOutput: "****" },
                { inputCode: `print_stars(1)`, expectedOutput: "*" },
                { inputCode: `print_stars(0)`, expectedOutput: "" }
            ]
        }
    ]
};
