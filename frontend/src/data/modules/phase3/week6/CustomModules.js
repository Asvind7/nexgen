export const CUSTOM_MODULES_LEVEL_1 = {
    title: "Module Maker",
    passingScore: 300,
    questions: [
        // --- MCQs ---
        {
            id: "mod_m1",
            type: "mcq",
            question: "How do you import a specific function `greet` from a module `tools.py`?",
            options: { A: "import tools.greet", B: "from tools import greet", C: "get greet from tools", D: "import greet from tools" },
            correctAnswer: "B",
            explanation: "The `from module import name` syntax allows you to import specific items into the local namespace.",
            hint: "Think 'From where' then 'Import what'.",
            concepts: ["syntax", "imports"],
            xpReward: 30
        },
        {
            id: "mod_m2",
            type: "mcq",
            question: "What is the purpose of the `__init__.py` file in a directory?",
            options: { A: "It's a configuration file for Git", B: "It tells Python to treat the directory as a package", C: "It speeds up code execution", D: "It's a backup of the source code" },
            correctAnswer: "B",
            explanation: "`__init__.py` marks a directory as a Python package, allowing you to import modules from it.",
            hint: "Package marker.",
            concepts: ["packages", "structure"],
            xpReward: 30
        },
        {
            id: "mod_m3",
            type: "mcq",
            question: "What does `import tools as t` do?",
            options: { A: "Imports tools and renames the file", B: "Creates an alias 't' for the module tools", C: "Only imports the letter 't' from tools", D: "Imports tools and sets t to True" },
            correctAnswer: "B",
            explanation: "The `as` keyword creates an alias, which is useful for long module names (e.g., `import pandas as pd`).",
            hint: "If you want to call it 't' instead of its full name, how would you sign the alias?",
            concepts: ["aliases", "syntax"],
            xpReward: 30
        },
        {
            id: "mod_m4",
            type: "mcq",
            question: "Where does Python look for modules when you call `import`?",
            options: { A: "Only in the current directory", B: "In the directories listed in sys.path", C: "Anywhere on the hard drive", D: "In the user's Downloads folder" },
            correctAnswer: "B",
            explanation: "`sys.path` is a list of strings that specifies the search path for modules.",
            hint: "Search path list.",
            concepts: ["environment", "search_path"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "mod_c1",
            type: "mission_task",
            question: "MISSION: Imagine you have a file `utils.py`. Import it and call `utils.helper()`. (Simulation).",
            expectedOutput: "Helper",
            codeTask: "# MISSION: Import utils and call helper(). (Simulation)\n",
            hint: "First import the module, then use dot notation to call the function inside it.",
            explanation: "You organize code by splitting it into generic module files.",
            learningGoals: "User must demonstrate import syntax.",
            requiredConcepts: ["import utils", "utils.helper("],
            concepts: ["imports", "modules"],
            regexCheck: /import\s+utils/,
            xpReward: 100
        },
        {
            id: "mod_c2",
            type: "mission_task",
            question: "MISSION: Import the `math` module as `m`. Print `m.pi`.",
            expectedOutput: "3.141592653589793",
            codeTask: "# MISSION: Import math as an alias 'm' and print m.pi\n",
            hint: "Use 'import [module] as [alias]'. Then use the alias for the print statement.",
            explanation: "Aliases make your code cleaner and faster to type.",
            learningGoals: "User must use a module alias.",
            requiredConcepts: ["import", "math", "as", "m", "pi"],
            concepts: ["aliases", "imports"],
            regexCheck: /import\s+math\s+as\s+m/i,
            xpReward: 70
        },
        {
            id: "mod_c3",
            type: "mission_task",
            question: "MISSION: Use `import *` to bring everything from `math`. Print `pi`.",
            expectedOutput: "3.141592653589793",
            codeTask: "# MISSION: Import EVERYTHING from math using wildcard (*) and print pi\n",
            hint: "The wildcard syntax uses an asterisk. Be careful not to overuse this in real projects!",
            explanation: "Careful! `import *` is easy but can cause name clashes.",
            learningGoals: "User must use wildcard imports.",
            requiredConcepts: ["from", "import", "*", "pi"],
            concepts: ["wildcard_imports", "imports"],
            regexCheck: /from\s+math\s+import\s+\*/i,
            xpReward: 70
        },
        {
            id: "mod_c4",
            type: "mission_task",
            question: "MISSION: Print the string representation of `sys.path` (first 2 characters).",
            expectedOutput: "['",
            codeTask: "import sys\n# MISSION: Print the start of the search path list using print(str(sys.path)[:2])\n",
            hint: "Print the string conversion of sys.path, then use slicing [:2] to see just the first part.",
            explanation: "sys.path shows you exactly where Python is looking for your modules.",
            learningGoals: "User must access sys.path metadata.",
            requiredConcepts: ["import sys", "sys.path", "print"],
            concepts: ["sys_module", "search_path"],
            regexCheck: /sys\.path/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "mod_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code tries to import from a module that doesn't exist. Fix the typo (should be `math`)!",
            codeTask: "from mathe import pi\nprint(pi)",
            expectedOutput: "3.141592653589793",
            hint: "The module name is 'math', not 'mathe'. Spelling matters in coding!",
            explanation: "Fixed! Module names must be spelled exactly right.",
            errorType: "ModuleNotFoundError",
            concepts: ["imports", "debugging"],
            xpReward: 75,
            learningGoals: "User must fix a misspelled module name.",
            requiredConcepts: ["from math import pi"]
        },
        {
            id: "mod_d2",
            type: "debugging",
            question: "LOGIC REPAIR: The alias `alias` is used instead of the actual assigned name `md`. Fix it!",
            codeTask: "import math as md\n# Use the alias md below:\nprint(math.pi)",
            expectedOutput: "3.141592653589793",
            hint: "Once you've given a module an alias like 'md', you must use that alias instead of the original name.",
            explanation: "When you use 'as', the original name is no longer available in that scope.",
            errorType: "NameError",
            concepts: ["aliases", "debugging"],
            xpReward: 75,
            learningGoals: "User must use the aliased name.",
            requiredConcepts: ["md.pi"]
        }
    ]
};

export const CUSTOM_MODULES_QUESTION_BANK = {
    "Concept_Imports": CUSTOM_MODULES_LEVEL_1.questions.filter(q => q.id.includes('mod_m1') || q.id.includes('mod_m3') || q.id.includes('mod_c1') || q.id.includes('mod_c2') || q.id.includes('mod_d1') || q.id.includes('mod_d2')),
    "Concept_Packages": CUSTOM_MODULES_LEVEL_1.questions.filter(q => q.id.includes('mod_m2') || q.id.includes('mod_m4') || q.id.includes('mod_c3') || q.id.includes('mod_c4'))
};
