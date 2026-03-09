export const STANDARD_LIBRARY_LEVEL_1 = {
    title: "The Toolbox",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "std_m1",
            type: "mcq",
            question: "How do you use the `math` module?",
            options: { A: "import math", B: "use math", C: "include math", D: "get math" },
            correctAnswer: "A",
            explanation: "The `import` keyword allows you to access Python's vast standard library.",
            hint: "If you want to bring a module 'in', which keyword would you use?",
            xpReward: 30
        },
        {
            id: "std_m2",
            type: "mcq",
            question: "Which function gives you the square root of 16?",
            options: { A: "math.sq(16)", B: "math.sqrt(16)", C: "math.root(16)", D: "math.power(16, 0.5)" },
            correctAnswer: "B",
            explanation: "`math.sqrt()` calculates the square root.",
            hint: "It's an abbreviation of 'SQuare RooT'.",
            xpReward: 30
        },
        {
            id: "std_m3",
            type: "mcq",
            question: "Which module would you use to get the current working directory?",
            options: { A: "sys", B: "os", C: "path", D: "dir" },
            correctAnswer: "B",
            explanation: "The `os` module (Operating System) provides functions for interacting with the file system.",
            hint: "Which 2-letter module stands for 'Operating System'?",
            xpReward: 30
        },
        {
            id: "std_m4",
            type: "mcq",
            question: "What does `json.loads()` do?",
            options: { A: "Loads a JSON file from disk", B: "Converts a JSON string into a Python dictionary", C: "Saves a dictionary to a file", D: "Deletes a JSON object" },
            correctAnswer: "B",
            explanation: "`json.loads()` (load string) parses a JSON-formatted string into Python data structures.",
            hint: "The 's' in 'loads' stands for 'string'.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "std_c1",
            type: "mission_task",
            question: "MISSION: Import `math` and print the value of `pi`.",
            expectedOutput: "3.141592653589793",
            codeTask: "# MISSION: Import the math module and print math.pi\n",
            hint: "Use the 'import' keyword for the module, then access 'pi' using dot notation.",
            explanation: "Pi is available as `math.pi`. Handy for geometry!",
            learningGoals: "User must import math and print math.pi constant.",
            requiredConcepts: ["import", "math", "pi"],
            regexCheck: /(import\s+math|from\s+math\s+import)/i,
            xpReward: 70
        },
        {
            id: "std_c2",
            type: "mission_task",
            question: "MISSION: Import `random` and print a random number between 1 and 10 using `randint`.",
            expectedOutput: "7",
            codeTask: "# MISSION: Import random and print a random number between 1 and 10 using randint\n",
            hint: "The function 'randint' needs two arguments: the start and end of the range.",
            explanation: "Randomness is essential for games and simulations.",
            learningGoals: "User must use random.randint to generate a number.",
            requiredConcepts: ["import", "random", "randint"],
            regexCheck: /random\.randint\s*\(\s*1\s*,\s*10\s*\)/,
            xpReward: 70
        },
        {
            id: "std_c3",
            type: "mission_task",
            question: "MISSION: Import `datetime` and print today's date using `date.today()`.",
            expectedOutput: "2025-01-01",
            codeTask: "# MISSION: Import the 'date' class from 'datetime' and print today's date using date.today()\n",
            hint: "Use 'from datetime import date'. Then call the today() method on the date class.",
            explanation: "Time checks are crucial for logging and scheduling.",
            learningGoals: "User must use datetime module to get the current date.",
            requiredConcepts: ["import", "datetime", "date", "today"],
            regexCheck: /date\.today\s*\(\s*\)/,
            xpReward: 70
        },
        {
            id: "std_c4",
            type: "mission_task",
            question: "MISSION: Import `os` and print the name of the current operating system using `os.name`.",
            expectedOutput: "nt",
            codeTask: "import os\n# MISSION: Print os.name to see your operating system's internal name\n",
            hint: "The 'name' attribute of the 'os' module tells you the platform type (e.g., 'nt' or 'posix').",
            explanation: "Knowing the OS helps writing cross-platform code.",
            learningGoals: "User must access os module attributes.",
            requiredConcepts: ["import", "os"],
            regexCheck: /os\.name/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "std_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to use `sqrt` without the module prefix. Fix it!",
            codeTask: "import math\n# Fix this call:\nprint(sqrt(16))",
            expectedOutput: "4.0",
            hint: "Remember that you imported the whole 'math' module. How do you tell Python that 'sqrt' belongs to it?",
            explanation: "Fixed! When you import the whole module, you must prefix functions with the module name.",
            errorType: "NameError",
            xpReward: 75,
            learningGoals: "User must use the correct module prefix for function calls."
        },
        {
            id: "std_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: The `from...import` syntax is reversed. Fix it to import `pi` from `math`.",
            codeTask: "# Fix the import syntax:\nimport pi from math\nprint(pi)",
            expectedOutput: "3.141592653589793",
            hint: "The syntax starts with 'from [module]'... then comes the 'import' keyword.",
            explanation: "The syntax starts with 'from [module]' then 'import [name]'.",
            errorType: "SyntaxError",
            xpReward: 75,
            learningGoals: "User must use the correct from-import syntax."
        }
    ]
};

export const STANDARD_LIBRARY_QUESTION_BANK = {
    "Concept_Math": STANDARD_LIBRARY_LEVEL_1.questions.filter(q => q.id.includes('std_m1') || q.id.includes('std_m2') || q.id.includes('std_c1') || q.id.includes('std_d1') || q.id.includes('std_d2')),
    "Concept_Random": STANDARD_LIBRARY_LEVEL_1.questions.filter(q => q.id.includes('std_c2')),
    "Concept_Date": STANDARD_LIBRARY_LEVEL_1.questions.filter(q => q.id.includes('std_c3')),
    "Concept_OS": STANDARD_LIBRARY_LEVEL_1.questions.filter(q => q.id.includes('std_m3') || q.id.includes('std_c4')),
    "Concept_JSON": STANDARD_LIBRARY_LEVEL_1.questions.filter(q => q.id.includes('std_m4'))
};
