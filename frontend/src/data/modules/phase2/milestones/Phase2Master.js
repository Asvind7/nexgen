export const PHASE_2_MASTER_EXAM = {
    title: "The Architect's Ascent: Phase 2 Graduation 🏛️",
    passingScore: 2000,
    questions: [
        {
            id: "p2m1",
            type: "mission_task",
            question: "### 🚀 MISSION: List Architect\nExtract specific data patterns from a collection using high-speed logic.\n\n**Objective:**\nUse a **list comprehension** to find words in the provided list that contain the letter `'a'`. Print the resulting list.",
            expectedOutput: "['apple', 'banana']",
            codeTask: "# -- NXGN Data Extraction --\nwords = ['apple', 'banana', 'cherry']\n\n# Use list comprehension below:\n",
            learningGoals: "User must use comprehension with string checking.",
            concepts: ["list_comprehension", "string_filtering"],
            requiredConcepts: ["[", "for", "if", "in", "w for w"]
        },
        {
            id: "p2m2",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the **Big O complexity** of looking up a value in a balanced Python Dictionary?",
            options: { A: "O(1)", B: "O(n)", C: "O(log n)", D: "O(n^2)" },
            correctAnswer: "A",
            explanation: "Dictionaries use hash maps for near-instant lookup.",
            concepts: ["dictionaries", "complexity"],
            hint: "It's as fast as it gets."
        },
        {
            id: "p2m3",
            type: "mission_task",
            question: "### 🚀 MISSION: RegEx Master\nParse a system log string to extract numerical identification codes.\n\n**Objective:**\nUse `re.findall()` to extract only the numbers from the provided `text` string. Print the list of matches.",
            expectedOutput: "['404', '22']",
            codeTask: "# -- NXGN Log Parser --\nimport re\ntext = 'Error: 404, User: 22'\n\n# Use findall to extract digits below:\n",
            learningGoals: "User must use re.findall to extract digits.",
            concepts: ["regex", "extraction"],
            requiredConcepts: ["import re", "findall", "\\d+"]
        },
        {
            id: "p2m4",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich method is strictly used to add an item to a **SET**?",
            options: { A: "append()", B: "add()", C: "insert()", D: "push()" },
            correctAnswer: "B",
            explanation: "Sets use .add() because they don't have a fixed order to append to.",
            concepts: ["sets", "methods"],
            hint: "Symmetry with logic 'add to set'."
        },
        {
            id: "p2m5",
            type: "mission_task",
            question: "### 🚀 MISSION: File Architect\nSafely interface with the persistent storage layer.\n\n**Objective:**\nStructure a `with open` block to read the file `'notes.txt'`. Once the block is open, simply print the string `\"Success\"`.",
            expectedOutput: "Success",
            codeTask: "# -- NXGN Storage Layer --\n# Logic for reading 'notes.txt' below:\n",
            learningGoals: "User must use the context manager 'with open'.",
            concepts: ["file_io", "context_managers"],
            requiredConcepts: ["with open", "notes.txt", "'r'", "print"]
        },
        {
            id: "p2m6",
            type: "mission_task",
            question: "### 🚀 MISSION: Collection Mutator\nUpdate a metadata object with new user parameters.\n\n**Objective:**\nAdd the key-value pair `'age': 25` to the `data` dictionary and print the updated dictionary.",
            expectedOutput: "{'name': 'Alice', 'age': 25}",
            codeTask: "# -- NXGN Metadata Service --\ndata = {'name': 'Alice'}\n\n# Add age key below:\n",
            learningGoals: "User must demonstrate dictionary item assignment.",
            concepts: ["dictionaries", "mutation"],
            requiredConcepts: ["data[", "age", "=", "25", "print"]
        },
        {
            id: "p2m7",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the primary difference between a **List** and a **Tuple**?",
            options: { A: "Lists are round, Tuples are square", B: "Lists are mutable, Tuples are immutable", C: "Tuples are faster for searching", D: "There is no difference" },
            correctAnswer: "B",
            explanation: "Once a tuple is created, it cannot be changed (immutable).",
            concepts: ["lists", "tuples", "immutability"],
            hint: "Think about 'changing' values."
        },
        {
            id: "p2m8",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich special character is used to represent **'one or more'** occurrences in RegEx?",
            options: { A: "*", B: "+", C: "?", D: "." },
            correctAnswer: "B",
            explanation: "+ matches 1 or more, * matches 0 or more, and ? matches 0 or 1.",
            concepts: ["regex", "quantifiers"],
            hint: "Plus means more."
        },
        {
            id: "p2m9",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThis low-level file write operation is missing resource cleanup.\n\n**Objective:**\nUpdate the code to write the string `'OK'` to the file and ensure the file is correctly **closed**.",
            codeTask: "# -- NXGN Buffer Write --\nf = open('test.txt', 'w')\n\n# Add logic to write 'OK' and close below:\n",
            expectedOutput: "OK",
            hint: "f.write('OK') followed by f.close()",
            explanation: "Failing to close files can lead to data loss or memory leaks.",
            learningGoals: "User must manually manage file resources.",
            requiredConcepts: [".write", ".close"],
            concepts: ["file_io", "debugging"]
        },
        {
            id: "p2m10",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe RegEx pattern is failing to capture the correct data stream.\n\n**Objective:**\nFix the `re.findall()` pattern so it correctly captures all **digits** in the string (should return `['007']`).",
            codeTask: "# -- NXGN Regex Repair --\nimport re\n\n# Fix the pattern below:\nres = re.findall('?', 'Agent 007')\nprint(res)",
            expectedOutput: "['007']",
            hint: "Use \\d+ as the pattern.",
            explanation: "\\d matches digits, and + matches one or more.",
            learningGoals: "User must identify and correct a regex pattern.",
            requiredConcepts: ["import re", "\\d+"],
            concepts: ["regex", "debugging"]
        }
    ]
};
