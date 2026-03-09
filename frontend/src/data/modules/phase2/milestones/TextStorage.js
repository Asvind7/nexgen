export const TEXT_STORAGE_EXAM = {
    title: "The Archivist's Final Challenge 📜",
    passingScore: 600,
    questions: [
        // MCQ 1: F-Strings
        {
            id: "ts1",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich line of code correctly prints 'Name: Bob' using a modern **f-string**?",
            options: { A: "f'Name: {name}'", B: "'Name: ' + name", C: "format('Name: Bob')", D: "print('fName: Bob')" },
            correctAnswer: "A",
            explanation: "f-strings use f-prefixes and curly braces for variables.",
            concepts: ["string_formatting", "f_strings"],
            hint: "Look for f and {}."
        },
        // MCQ 2: RegEx
        {
            id: "ts2",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich RegEx pattern is used to match **one or more digits**?",
            options: { A: "\\w+", B: "\\s+", C: "\\d+", D: "[a-z]" },
            correctAnswer: "C",
            explanation: "\\d matches any digit (0-9).",
            concepts: ["regex", "character_classes"],
            hint: "d as in digit."
        },
        // MCQ 3: File Modes
        {
            id: "ts3",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich mode should you use with `open()` to **add** text to the end of a file without deleting existing content?",
            options: { A: "'r'", B: "'w'", C: "'a'", D: "'x'" },
            correctAnswer: "C",
            explanation: "'a' stands for 'append'. It adds to the end.",
            concepts: ["file_io", "modes"],
            hint: "A for Append."
        },
        // Bug Hunter 1: RegEx Typo
        {
            id: "ts4",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe RegEx engine is failing to find matches. The library isn't imported correctly.\n\n**Objective:**\nFix the import statement so `re` is available for use.",
            codeTask: "# -- NXGN RegEx Core --\nimport regex\n\n# Fix import above:\ntext = 'Match 100'\nprint(re.findall('\\d+', text))",
            expectedOutput: "['100']",
            hint: "The Python module for RegEx is just two letters: 're'.",
            explanation: "You must import 're' to use findall and other regex functions.",
            concepts: ["regex", "imports"],
            requiredConcepts: ["import re"]
        },
        // Bug Hunter 2: File Write Typo
        {
            id: "ts5",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe data isn't being saved to the file. The method name has a typo.\n\n**Objective:**\nFix the method call used to send text to the file stream.",
            codeTask: "# -- NXGN Signal Logger --\nwith open('log.txt', 'w') as f:\n    f.write_text('NXGN_OK')",
            expectedOutput: "",
            hint: "The standard file method is just 'write()'.",
            explanation: "File objects use .write(string) to save data.",
            concepts: ["file_io", "methods"],
            requiredConcepts: [".write("]
        },
        // Creator Mission 1: F-String Generator
        {
            id: "ts6",
            type: "mission_task",
            question: "### 🚀 MISSION: Signal Formatter\nGenerate a clean telemetry string for the NXGN Dashboard.\n\n**Objective:**\nGiven variables `sig = 'ALPHA'` and `val = 99`, print the string `\"Sig: ALPHA | Val: 99\"` using an **f-string**.",
            codeTask: "# -- NXGN Telemetry --\nsig = 'ALPHA'\nval = 99\n\n# Write f-string print below:\n",
            expectedOutput: "Sig: ALPHA | Val: 99",
            hint: "print(f'Sig: {sig} | Val: {val}')",
            explanation: "F-strings are the most efficient way to build complex display strings.",
            concepts: ["string_formatting", "f_strings"],
            requiredConcepts: ["f'", "{sig}", "{val}"]
        },
        // Creator Mission 2: Digit Extractor
        {
            id: "ts7",
            type: "mission_task",
            question: "### 🚀 MISSION: Code Breaker\nScour a corrupted data packet for hidden numerical keys.\n\n**Objective:**\nUse `re.findall()` and the pattern `r'\\d+'` to extract all numbers from `packet`. Print the resulting list.",
            codeTask: "# -- NXGN Packet Inspector --\nimport re\npacket = 'ID:777; TYPE:A; VOLT:12'\n\n# Extract and print numbers below:\n",
            expectedOutput: "['777', '12']",
            hint: "re.findall(r'\\d+', packet)",
            explanation: "RegEx allows you to find patterns regardless of surrounding text.",
            concepts: ["regex", "extraction"],
            requiredConcepts: ["import re", "findall", "\\d+"]
        },
        // Creator Mission 3: File Writer
        {
            id: "ts8",
            type: "mission_task",
            question: "### 🚀 MISSION: Persistent Storage\nCommit critical system status to the local disk.\n\n**Objective:**\nUse a `with open` block to open `'status.nx'` in **write** mode (`'w'`). Inside the block, print the string `\"Saved\"` to the console.",
            codeTask: "# -- NXGN Disk Writer --\n# Write the file logic below (just print 'Saved' inside the block):\n",
            expectedOutput: "Saved",
            hint: "with open('status.nx', 'w') as f: print('Saved')",
            explanation: "Context managers (with) ensure files are closed even if errors occur.",
            concepts: ["file_io", "context_managers"],
            requiredConcepts: ["with open", "status.nx", "'w'", "print"]
        },
        // MCQ 4: String Methods
        {
            id: "ts9",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich string method would you use to remove leading and trailing whitespace from `'  NXGN  '`?",
            options: { A: "clean()", B: "strip()", C: "trim()", D: "remove()" },
            correctAnswer: "B",
            explanation: ".strip() removes whitespace from both ends of a string.",
            concepts: ["string_methods"],
            hint: "Strip away the extra spaces."
        },
        // MCQ 5: RegEx Non-Digits
        {
            id: "ts10",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich shorthand character class matches any **NON-digit** character (anything but 0-9)?",
            options: { A: "\\d", B: "\\D", C: "\\w", D: "\\W" },
            correctAnswer: "B",
            explanation: "Capitalized shorthand classes are the inverse. \\D is everything that is NOT a digit.",
            concepts: ["regex", "character_classes"],
            hint: "Uppercase is the opposite."
        }
    ]
};
