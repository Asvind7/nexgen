export const FILE_IO_LEVEL_1 = {
    title: "The File Librarian",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "io_m1",
            type: "mcq",
            question: "What is the recommended way to open a file to ensure it is automatically closed?",
            options: { A: "open('file.txt')", B: "with open('file.txt') as f:", C: "f = open('file.txt')", D: "file.open()" },
            correctAnswer: "B",
            explanation: "The `with` statement (context manager) ensures the file is closed correctly even if an error occurs.",
            hint: "It uses the 'with' keyword.",
            concepts: ["context_managers", "file_handling"],
            xpReward: 30
        },
        {
            id: "io_m2",
            type: "mcq",
            question: "Which mode should you use to OVERWRITE an existing file with new data?",
            options: { A: "'r'", B: "'a'", C: "'w'", D: "'x'" },
            correctAnswer: "C",
            explanation: "'w' stands for write mode, which overwrites the file. ('a' is for append, 'r' is for read).",
            hint: "w is for Write.",
            concepts: ["file_modes", "writing"],
            xpReward: 30
        },
        {
            id: "io_m3",
            type: "mcq",
            question: "What does `f.readlines()` return?",
            options: { A: "The whole file as one string", B: "A list of strings (one for each line)", C: "Only the first line", D: "The number of lines" },
            correctAnswer: "B",
            explanation: "`.readlines()` reads all lines and puts them into a list.",
            hint: "It returns multiple lines in a collection.",
            concepts: ["file_methods", "reading"],
            xpReward: 30
        },
        {
            id: "io_m4",
            type: "mcq",
            question: "Which file mode allows BOTH reading and writing?",
            options: { A: "'r'", B: "'w+'", C: "'a'", D: "'x'" },
            correctAnswer: "B",
            explanation: "Adding a `+` to modes like `r+` or `w+` enables bidirectional stream access.",
            hint: "It has a plus sign.",
            concepts: ["file_modes", "read_write"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "io_c1",
            type: "mission_task",
            question: "MISSION: Write logic that tries to open `notes.txt` for reading and prints 'Success'. (Simulation).",
            expectedOutput: "Success",
            codeTask: "# Simulation: structure the 'with open' block below\n",
            hint: "with open('notes.txt', 'r') as f:\n    print('Success')",
            explanation: "Great! This is the standard pattern for safe file reading.",
            learningGoals: "User must demonstrate the 'with open' structure.",
            requiredConcepts: ["with open", "as f:", "print('Success')"],
            concepts: ["context_managers", "reading"],
            regexCheck: /with\s+open\s*\(\s*['"]notes\.txt['"]\s*,\s*['"]r['"]\s*\)\s+as\s+f:/,
            xpReward: 70
        },
        {
            id: "io_c2",
            type: "mission_task",
            question: "MISSION: Create a simulated file write. Open `log.txt` in append mode ('a') and print 'Logged'.",
            expectedOutput: "Logged",
            codeTask: "# Simulation: use 'a' mode below\n",
            hint: "with open('log.txt', 'a') as f:\n    print('Logged')",
            explanation: "Exactly. Append mode 'a' adds to the end of the file instead of wiping it.",
            learningGoals: "User must use the correct mode for appending to a file.",
            requiredConcepts: ["open(", "log.txt", "'a'", "print('Logged')"],
            concepts: ["file_modes", "appending"],
            regexCheck: /open\s*\(\s*['"]log\.txt['"]\s*,\s*['"]a['"]\s*\)/,
            xpReward: 70
        },
        {
            id: "io_c3",
            type: "mission_task",
            question: "MISSION: Read only the FIRST 10 characters of a file. Use `f.read(10)` and print the result. (Simulated output: 'Hello Pyth')",
            expectedOutput: "Hello Pyth",
            codeTask: "print('Hello Pyth')\n# Show logic using .read(10) below\n",
            hint: "Provide the print('Hello Pyth') to pass the output check.",
            explanation: "Correct! You can limit the number of characters read from a file.",
            learningGoals: "User must demonstrate knowledge of partial file reading.",
            requiredConcepts: [".read(10)"],
            concepts: ["file_methods", "partial_read"],
            regexCheck: /\.read\s*\(\s*10\s*\)/,
            xpReward: 70
        },
        {
            id: "io_c4",
            type: "mission_task",
            question: "MISSION: Use `f.close()` manually after opening a file without 'with'. Print 'Closed'.",
            expectedOutput: "Closed",
            codeTask: "f = open('data.txt', 'r')\n# Close the file here\n",
            hint: "f.close()\nprint('Closed')",
            explanation: "Good practice! Closing files manually is required if you don't use the 'with' context manager.",
            learningGoals: "User must manually close a file.",
            requiredConcepts: [".close()", "print('Closed')"],
            concepts: ["file_handling", "resource_management"],
            regexCheck: /\.close\s*\(\s*\)/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "io_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to write to a file opened in 'r' (read) mode. Fix the mode to 'w'!",
            codeTask: "with open('file.txt', 'r') as f:\n    f.write('Hi')",
            expectedOutput: "Hi",
            hint: "Change 'r' to 'w' in the open() function.",
            explanation: "Fixed! You cannot write to a file opened in read mode.",
            errorType: "io.UnsupportedOperation",
            concepts: ["file_modes", "debugging"],
            xpReward: 75,
            requiredConcepts: ["'w'"],
            learningGoals: "User must correct the file mode from read to write."
        },
        {
            id: "io_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: The 'as' keyword is misplaced. Fix the 'with' block syntax!",
            codeTask: "with f as open('file.txt', 'r'): # Wrong order\n    print(f.read())",
            expectedOutput: "Content",
            hint: "It should be `with open(...) as f:`",
            explanation: "The variable name comes AFTER the as keyword in context managers.",
            errorType: "SyntaxError",
            concepts: ["context_managers", "debugging"],
            xpReward: 75,
            requiredConcepts: ["open(", "as f:"],
            learningGoals: "User must fix the syntax of a with-statement."
        }
    ]
};

export const FILE_IO_QUESTION_BANK = {
    "Opening": FILE_IO_LEVEL_1.questions.filter(q => q.id.includes('io_m1') || q.id.includes('io_c1') || q.id.includes('io_d2')),
    "Modes": FILE_IO_LEVEL_1.questions.filter(q => q.id.includes('io_m2') || q.id.includes('io_m4') || q.id.includes('io_c2') || q.id.includes('io_d1')),
    "Reading": FILE_IO_LEVEL_1.questions.filter(q => q.id.includes('io_m3') || q.id.includes('io_c3') || q.id.includes('io_c4'))
};
