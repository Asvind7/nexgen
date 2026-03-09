export const LISTS_LEVEL_1 = {
    title: "The List Labyrinth",
    passingScore: 500,
    questions: [
        // --- 4 MCQs (Theory & Foundation) ---
        {
            id: "list_m1",
            type: "mcq",
            question: "Which of these is the correct way to create an empty list in Python?",
            options: { A: "list = {}", B: "list = []", C: "list = ()", D: "list = <>" },
            correctAnswer: "B",
            explanation: "Lists are defined using square brackets `[]`.",
            hint: "Look for square brackets.",
            xpReward: 30
        },
        {
            id: "list_m2",
            type: "mcq",
            question: "What is the index of the FIRST item in a Python list?",
            options: { A: "1", B: "0", C: "-1", D: "First" },
            correctAnswer: "B",
            explanation: "Python lists are zero-indexed, meaning the first element is at index 0.",
            hint: "Programming counts start at zero.",
            xpReward: 30
        },
        {
            id: "list_m3",
            type: "mcq",
            question: "How do you add an item to the END of a list?",
            options: { A: ".add()", B: ".append()", C: ".push()", D: ".insert_last()" },
            correctAnswer: "B",
            explanation: "The `.append()` method adds a single element to the end of a list.",
            hint: "It starts with 'a'.",
            xpReward: 30
        },
        {
            id: "list_m4",
            type: "mcq",
            question: "What does `len(my_list)` return?",
            options: { A: "The last item in the list", B: "The number of items in the list", C: "The first item in the list", D: "The size of each item" },
            correctAnswer: "B",
            explanation: "The `len()` function returns the total count of elements in a container like a list.",
            hint: "It's short for 'length'.",
            xpReward: 30
        },

        // --- 4 Coding Problems (Logic & Creation) ---
        {
            id: "list_c1",
            type: "mission_task",
            theme: "Foundation",
            question: "MISSION: Create a list named 'inventory' containing 'Sword', 'Shield', and 'Potion'.",
            expectedOutput: "",
            codeTask: "# Create your list here\n",
            hint: "inventory = ['Sword', 'Shield', 'Potion']",
            explanation: "Great! You've successfully initialized a list with multiple items.",
            learningGoals: "User must create a list with specific strings.",
            requiredConcepts: ["=", "[", "]", "Sword"],
            xpReward: 70
        },
        {
            id: "list_c2",
            type: "mission_task",
            question: "MISSION: You have `colors = ['red', 'blue', 'green']`. Print ONLY the second color ('blue').",
            expectedOutput: "blue",
            codeTask: "colors = ['red', 'blue', 'green']\n# Print the second item here\n",
            hint: "Remember zero-indexing: first is [0], second is [1].",
            explanation: "Correct! Index [1] corresponds to the second item.",
            learningGoals: "User must access and print the second element of a list using its index.",
            requiredConcepts: ["[1]"],
            xpReward: 70
        },
        {
            id: "list_c3",
            type: "mission_task",
            question: "MISSION: Add 'Dragon' to the `monsters` list using .append(). Then print the list.",
            expectedOutput: "['Goblin', 'Dragon']",
            codeTask: "monsters = ['Goblin']\n# Append 'Dragon' here\nprint(monsters)",
            hint: "monsters.append('Dragon')",
            explanation: "Nice! The list has grown to include the Dragon.",
            learningGoals: "User must use the .append() method to add an item and print the list.",
            requiredConcepts: [".append"],
            regexCheck: /\.append\s*\(\s*['"]Dragon['"]\s*\)/,
            xpReward: 70
        },
        {
            id: "list_c4",
            type: "mission_task",
            question: "MISSION: Create a list `nums = [1, 2, 3, 4]`. Print the length of this list using len().",
            expectedOutput: "4",
            codeTask: "# Code here\n",
            hint: "print(len(nums))",
            explanation: "Perfect. `len()` is essential for tracking how much data you have.",
            learningGoals: "User must use and print the len() function to find the size of a list.",
            requiredConcepts: ["len"],
            regexCheck: /len\s*\(\s*nums\s*\)/,
            xpReward: 70
        },

        // --- 2 Debugging Tasks (Diagnosis & Repair) ---
        {
            id: "list_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to access the last item in a 3-item list but it's crashing. Fix the index!",
            codeTask: "items = ['Gold', 'Silver', 'Bronze']\nprint(items[3])",
            expectedOutput: "Bronze",
            hint: "In a list of 3 items, the indices are 0, 1, and 2.",
            explanation: "Fixed! Index 3 was out of range because the list only goes up to index 2.",
            errorType: "IndexError",
            xpReward: 75,
            learningGoals: "User must correct an out-of-bounds index error by changing index 3 to 2 (or -1)."
        },
        {
            id: "list_d2",
            type: "debugging",
            question: "REPAIR MISSION: The pilot forgot to close the list. Fix the syntax error!",
            codeTask: "planets = ['Earth', 'Mars', 'Jupiter'",
            expectedOutput: "['Earth', 'Mars', 'Jupiter']",
            hint: "Every [ needs a matching ].",
            explanation: "Syntax restored. Lists must always be enclosed in square brackets.",
            errorType: "SyntaxError",
            xpReward: 75,
            learningGoals: "User must add the missing closing bracket ] to the list definition.",
            regexCheck: /\[.*\]/
        }
    ]
};

export const LISTS_QUESTION_BANK = {
    "Concept_Creation": LISTS_LEVEL_1.questions.filter(q => q.id.includes('list_m1') || q.id.includes('list_c1')),
    "Concept_Indexing": LISTS_LEVEL_1.questions.filter(q => q.id.includes('list_m2') || q.id.includes('list_c2') || q.id.includes('list_d1')),
    "Concept_Methods": LISTS_LEVEL_1.questions.filter(q => q.id.includes('list_m3') || q.id.includes('list_c3')),
    "Concept_Length": LISTS_LEVEL_1.questions.filter(q => q.id.includes('list_m4') || q.id.includes('list_c4')),
    "Concept_Repair": LISTS_LEVEL_1.questions.filter(q => q.type === 'debugging')
};
