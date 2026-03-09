export const PACKAGE_ARCHITECT_EXAM = {
    title: "Package Architect Exam 📦",
    passingScore: 900,
    questions: [
        {
            id: "pa1",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe command line interface threw an error. The package installer command has a typo.\n\n**Objective:**\nFix the typo in the shell command to correctly install the `requests` library.",
            codeTask: "# -- NXGN Shell Environment --\n# MISSION: Fix the typo in the pip command below:\nprint('pyp install requests')",
            expectedOutput: "pip install requests",
            hint: "The command name rhymes with 'hip'. Change 'pyp' to the correct 3-letter command.",
            explanation: "Pip is the package installer for Python.",
            learningGoals: "User must fix a common CLI typo.",
            requiredConcepts: ["pip install"]
        },
        {
            id: "pa2",
            type: "mission_task",
            question: "### 🚀 MISSION: Module Mission\nAccess the internal math libraries of the NXGN core.\n\n**Objective:**\n1. Import the `math` module.\n2. Print the value of `math.sqrt(16)` to the console.",
            expectedOutput: "4.0",
            codeTask: "# -- NXGN Math Link --\n# Import math and print sqrt(16) below:\n",
            learningGoals: "User must import a standard library module.",
            requiredConcepts: ["import math", "math.sqrt", "print"],
            hint: "Use 'import math' at the top, then call print(math.sqrt(16))."
        },
        {
            id: "pa3",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe project directory is not being recognized as a package. The initialization file name is incorrect.\n\n**Objective:**\nFix the variable `filename` so it correctly identifies the special Python package marker.",
            codeTask: "# -- NXGN Package Marker --\n# MISSION: Fix the filename below:\nfilename = 'init.py'\nprint(f'__{filename}__')",
            expectedOutput: "__init__.py",
            hint: "The initialization file requires DOUBLE underscores on BOTH sides of 'init'.",
            explanation: "__init__.py is the special name for package initialization.",
            learningGoals: "User must fix a package file naming error.",
            requiredConcepts: ["__init__.py", "print"]
        },
        {
            id: "pa4",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich standard file name is used to list all project dependencies for a deployment environment?",
            options: { A: "packages.js", B: "dependencies.log", C: "requirements.txt", D: "config.ini" },
            correctAnswer: "C",
            explanation: "requirements.txt is the standard file format for listing project dependencies for pip.",
            hint: "It lists what the project 'requires'."
        },
        {
            id: "pa5",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich specific CLI command lists every package currently installed in your environment?",
            options: { A: "pip list", B: "pip search", C: "pip show", D: "pip check" },
            correctAnswer: "A",
            explanation: "`pip list` shows every package currently installed via pip.",
            hint: "It's a list."
        },
        {
            id: "pa6",
            type: "mission_task",
            question: "### 🚀 MISSION: Import Master\nPerform a surgical import to minimize memory overhead.\n\n**Objective:**\nImport **ONLY** the `pi` constant from the `math` module and print its exact value.",
            expectedOutput: "3.141592653589793",
            codeTask: "# -- NXGN Targeted Import --\n# Import ONLY pi and print below:\n",
            learningGoals: "User must use the 'from ... import ...' syntax.",
            requiredConcepts: ["from math import pi", "print(pi)"],
            hint: "Use the 'from [module] import [name]' syntax to be specific."
        },
        {
            id: "pa7",
            type: "mission_task",
            question: "### 🚀 MISSION: Alias Architect\nConfigure a module nickname to speed up your development workflow.\n\n**Objective:**\nImport the `datetime` module as `dt` and print the `type` of the `dt.datetime` class.",
            expectedOutput: "<class 'type'>",
            codeTask: "# -- NXGN Alias Protocol --\n# Import datetime as dt and print type(dt.datetime) below:\n",
            learningGoals: "User must demonstrate module aliasing with 'as'.",
            requiredConcepts: ["import datetime as dt", "print", "type(dt.datetime)"],
            hint: "Use 'import datetime as dt' to give the module a shorter nickname."
        },
        {
            id: "pa8",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich command generates a list of installed packages in the exact `package==version` format?",
            options: { A: "pip list", B: "pip freeze", C: "pip export", D: "pip save" },
            correctAnswer: "B",
            explanation: "`pip freeze` outputs packages and versions in the `package==version` format.",
            hint: "It'freeze's the current state."
        },
        {
            id: "pa9",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the result of executing the command `pip install -U requests`?",
            options: { A: "Uninstalls requests", B: "Upgrades requests to the latest version", C: "Uses requests in a program", D: "Unzips the package" },
            correctAnswer: "B",
            explanation: "The -U or --upgrade flag tells pip to install the newest available version.",
            hint: "U stands for Upgrade."
        },
        {
            id: "pa10",
            type: "mission_task",
            question: "### 🚀 MISSION: Path Seeker\nInspect the internal search order Python uses to locate your modules.\n\n**Objective:**\nUse the `sys` module to print the `sys.path` list, showing where Python looks for imports.",
            expectedOutput: "['', ...]",
            codeTask: "# -- NXGN Path Discovery --\nimport sys\n\n# Print path below:\n",
            learningGoals: "User must understand how Python finds modules using sys.path.",
            requiredConcepts: ["import sys", "print(sys.path)"],
            hint: "The 'path' attribute of the 'sys' module contains the list of search directories."
        }
    ]
};
