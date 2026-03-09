export const PIP_LEVEL_1 = {
    title: "The Package Manager",
    passingScore: 300,
    questions: [
        // --- MCQs ---
        {
            id: "pip_m1",
            type: "mcq",
            question: "What does 'pip' stand for?",
            options: { A: "Preferred Installer Program", B: "Python Inside Packages", C: "Point in Place", D: "Program Install Python" },
            correctAnswer: "A",
            explanation: "pip is the package installer for Python. It allows you to install and manage additional libraries not included in the standard library.",
            hint: "It installs things.",
            xpReward: 30
        },
        {
            id: "pip_m2",
            type: "mcq",
            question: "Which command installs the `requests` library?",
            options: { A: "install requests", B: "pip install requests", C: "python requests add", D: "get requests" },
            correctAnswer: "B",
            explanation: "`pip install <package_name>` is the standard command to download and install a library from PyPI.",
            hint: "pip is the command.",
            xpReward: 30
        },
        {
            id: "pip_m3",
            type: "mcq",
            question: "What is PyPI?",
            options: { A: "Python's Private Interface", B: "The Python Package Index (a repository of software)", C: "An error message", D: "A type of Python pie" },
            correctAnswer: "B",
            explanation: "PyPI (the Cheese Shop) is the official third-party software repository for Python.",
            hint: "Repository for packages.",
            xpReward: 30
        },
        {
            id: "pip_m4",
            type: "mcq",
            question: "How do you view all currently installed packages?",
            options: { A: "pip list", B: "pip show all", C: "python --packages", D: "search modules" },
            correctAnswer: "A",
            explanation: "`pip list` displays a table of all installed packages and their versions.",
            hint: "List them out.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "pip_c1",
            type: "mission_task",
            question: "MISSION: Simulate installing 'requests' using pip command (print the command).",
            expectedOutput: "pip install requests",
            codeTask: "# Print the command to install requests",
            hint: "print('pip install requests')",
            explanation: "PIP (Pip Installs Packages) connects you to the Python Package Index (PyPI).",
            learningGoals: "User must print the pip install command.",
            requiredConcepts: ["print", "pip", "install"],
            regexCheck: /pip\s+install\s+requests/,
            xpReward: 100
        },
        {
            id: "pip_c2",
            type: "mission_task",
            question: "MISSION: Type the command to uninstall `requests`.",
            expectedOutput: "pip uninstall requests",
            codeTask: "# Type the command here:\n",
            hint: "pip uninstall requests",
            explanation: "Correct. Removing packages keeps your environment clean.",
            learningGoals: "User must know the pip uninstall command.",
            requiredConcepts: ["uninstall"],
            regexCheck: /pip\s+uninstall/,
            xpReward: 70
        },
        {
            id: "pip_c3",
            type: "mission_task",
            question: "MISSION: How do you upgrade an existing package `pandas`? Use the `--upgrade` flag.",
            expectedOutput: "pip install --upgrade pandas",
            codeTask: "# Type the command here:\n",
            hint: "pip install --upgrade pandas",
            explanation: "Upgrading ensures you have the latest features and security fixes.",
            learningGoals: "User must use the --upgrade flag.",
            requiredConcepts: ["--upgrade"],
            regexCheck: /--upgrade/,
            xpReward: 70
        },
        {
            id: "pip_c4",
            type: "mission_task",
            question: "MISSION: Create a requirements file command using `pip freeze` and redirection to `reqs.txt`.",
            expectedOutput: "pip freeze > reqs.txt",
            codeTask: "# Type the command here:\n",
            hint: "pip freeze > reqs.txt",
            explanation: "pip freeze followed by > creates a snapshot of your environment, essential for sharing projects.",
            learningGoals: "User must use pip freeze for dependency management.",
            requiredConcepts: ["freeze", ">"],
            regexCheck: /pip\s+freeze\s*>/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "pip_d1",
            type: "debugging",
            question: "REPAIR MISSION: This pip command is missing a required word between 'pip' and 'pandas'. Fix it!",
            codeTask: "# We want to install pandas:\npip pandas",
            expectedOutput: "pip install pandas",
            hint: "Insert 'install' between pip and pandas.",
            explanation: "Fixed! You must tell pip WHAT to do (install, uninstall, list, etc.).",
            errorType: "LogicError",
            xpReward: 75,
            learningGoals: "User must complete a basic pip command."
        },
        {
            id: "pip_d2",
            type: "debugging",
            question: "LOGIC REPAIR: You are trying to run a pip command INSIDE a Python file. Pip is a terminal tool, not a Python function! Fix the code to print the correct install command instead.",
            codeTask: "# Fix this (it shouldn't be raw code):\n# pip install requests\nprint('pip install requests')",
            expectedOutput: "pip install requests",
            hint: "Just make it print the string.",
            explanation: "Common mistake! Remember that pip is run in your command prompt/terminal, not in your code editor.",
            errorType: "SyntaxError",
            xpReward: 75,
            learningGoals: "User must distinguish between Python code and terminal commands."
        }
    ]
};

export const PIP_QUESTION_BANK = {
    "Concept_Installation": PIP_LEVEL_1.questions.filter(q => q.id.includes('pip_m2') || q.id.includes('pip_c1') || q.id.includes('pip_c2') || q.id.includes('pip_c3') || q.id.includes('pip_d1')),
    "Concept_Basics": PIP_LEVEL_1.questions.filter(q => q.id.includes('pip_m1') || q.id.includes('pip_m3') || q.id.includes('pip_m4') || q.id.includes('pip_c4') || q.id.includes('pip_d2'))
};
