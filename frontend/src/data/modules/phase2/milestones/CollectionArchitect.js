export const COLLECTION_ARCHITECT_EXAM = {
    title: "Master of Collections 💎",
    passingScore: 600,
    questions: [
        {
            id: "ca1",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich collection type is **IMMUTABLE** (values cannot be changed after creation)?",
            options: { A: "List", B: "Tuple", C: "Dictionary", D: "Set" },
            correctAnswer: "B",
            explanation: "Tuples are immutable; once created, they cannot be modified.",
            hint: "Parentheses () usually mean locked."
        },
        {
            id: "ca2",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nHow do you access the value associated with key `'id'` in dictionary `d`?",
            options: { A: "d.id", B: "d['id']", C: "d(id)", D: "d{id}" },
            correctAnswer: "B",
            explanation: "Dictionaries use square brackets and the key name to retrieve values.",
            hint: "It looks like list indexing but with a key."
        },
        {
            id: "ca3",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the result of `len({1, 1, 2, 2, 3})`?",
            options: { A: "5", B: "2", C: "3", D: "Error" },
            correctAnswer: "C",
            explanation: "Sets only store unique items. The duplicates are removed.",
            hint: "Duplicates don't count."
        },
        {
            id: "ca4",
            type: "mission_task",
            question: "### 🚀 MISSION: Inventory Expansion\nAn NXGN technician needs to add a tool to their toolkit.\n\n**Objective:**\nGiven the list `tools`, append the string `'Logic'` and print the updated list.",
            expectedOutput: "['Code', 'Logic']",
            codeTask: "# -- NXGN Toolkit Management --\ntools = ['Code']\n\n# Add 'Logic' and print below:\n",
            hint: "Use .append()",
            explanation: "Lists are dynamic and easy to expand.",
            learningGoals: "User must append an item to a list.",
            requiredConcepts: [".append"],
            regexCheck: /\.append\s*\(\s*['"]Logic['"]\s*\)/
        },
        {
            id: "ca5",
            type: "mission_task",
            question: "### 🚀 MISSION: Comprehension Filter\nPerform a high-speed data filter on a signal stream.\n\n**Objective:**\nCreate a new list of **even numbers** from the list `nums` using a one-line **list comprehension**. Print the result.",
            expectedOutput: "[2, 4]",
            codeTask: "# -- NXGN Signal Filter --\nnums = [1, 2, 3, 4]\n\n# Write comprehension below:\n",
            hint: "[x for x in nums if ...]",
            explanation: "Comprehensions are the mark of a true Pythonista.",
            learningGoals: "User must use a list comprehension with a conditional filter.",
            requiredConcepts: ["[", "for", "in", "if"],
            regexCheck: /\[.*for\s+.*\s+in\s+.*if/
        },
        {
            id: "ca6",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThis code tries to update a dictionary value but uses the wrong assignment syntax.\n\n**Objective:**\nFix the second line so the `'key'` is correctly updated to `999`.",
            codeTask: "# -- NXGN Vault Access --\nvault = {'key': 123}\n\nvault['key'] : 999\nprint(vault)",
            expectedOutput: "{'key': 999}",
            hint: "Use assignment '=' not definition ':'",
            explanation: "Key-value pairs in dictionaries are accessed with brackets and updated with assignment.",
            learningGoals: "User must fix an assignment error in a dictionary.",
            requiredConcepts: ["="]
        },
        {
            id: "ca7",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the value of `ls[-1]` if `ls = [10, 20, 30]`?",
            options: { A: "10", B: "20", C: "30", D: "Error" },
            correctAnswer: "C",
            explanation: "Negative indexing counts from the end of the list. -1 is always the last item.",
            hint: "Backwards counting starts at -1."
        },
        {
            id: "ca8",
            type: "mission_task",
            question: "### 🚀 MISSION: Nested Architect\nManipulate data within a multi-dimensional matrix.\n\n**Objective:**\nGiven the nested list `data`, change the number `3` to `99` and print the entire `data` structure.",
            expectedOutput: "[[1, 2], [99, 4]]",
            codeTask: "# -- NXGN Matrix Control --\ndata = [[1, 2], [3, 4]]\n\n# Modify and print below:\n",
            hint: "Use data[row][column]",
            explanation: "Nested structures allow for multi-dimensional data organization.",
            learningGoals: "User must modify an element within a nested list.",
            requiredConcepts: ["[1][0]", "="]
        },
        {
            id: "ca9",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThis comprehension is cutting off the last element of the list.\n\n**Objective:**\nFix the `range()` boundary inside the comprehension to print all **3** numbers.",
            codeTask: "# -- NXGN Data Retrieval --\nnums = [1, 2, 3]\n\n# Fix the range below:\nprint([nums[i] for i in range(2)])",
            expectedOutput: "[1, 2, 3]",
            hint: "range(2) only gives 0 and 1. We need 0, 1, and 2.",
            explanation: "The stop value in range is exclusive.",
            learningGoals: "User must fix a range to iterate correctly over a list.",
            requiredConcepts: ["range", "exclusive"]
        },
        {
            id: "ca10",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich method is used to add an element to a **SET** in Python?",
            options: { A: "append()", B: "insert()", C: "add()", D: "push()" },
            correctAnswer: "C",
            explanation: "Sets use `.add()`. Lists use `.append()`. Consistency is key!",
            hint: "Just 'add' it."
        }
    ]
};
