export const DICTIONARIES_LEVEL_1 = {
    title: "The Key-Value Vault",
    passingScore: 500,
    questions: [
        // --- 4 MCQs (Theory & Foundation) ---
        {
            id: "dict_m1",
            type: "mcq",
            question: "Which of these symbols is used to define a Dictionary in Python?",
            options: { A: "[]", B: "()", C: "{}", D: "<>" },
            correctAnswer: "C",
            explanation: "Dictionaries are defined using curly braces `{}`.",
            hint: "Curly braces for dictionaries.",
            xpReward: 30
        },
        {
            id: "dict_m2",
            type: "mcq",
            question: "In a dictionary mapping `{'name': 'NexGen'}`, what is 'name' called?",
            options: { A: "A Key", B: "A Value", C: "An Index", D: "A Label" },
            correctAnswer: "A",
            explanation: "In a dictionary, data is stored in Key-Value pairs. The first part is the Key.",
            hint: "Pairs consist of a Key and a...",
            xpReward: 30
        },
        {
            id: "dict_m3",
            type: "mcq",
            question: "Which method is the safest way to get a value without crashing if the key is missing?",
            options: { A: ".fetch()", B: ".get()", C: ".find()", D: ".lookup()" },
            correctAnswer: "B",
            explanation: "The `.get()` method returns `None` (or a default value) instead of raising an error if the key doesn't exist.",
            hint: "It's a short 3-letter word.",
            xpReward: 30
        },
        {
            id: "dict_m4",
            type: "mcq",
            question: "How do you get a list of all KEYS in a dictionary `d`?",
            options: { A: "d.all_keys()", B: "d.keys()", C: "d.list_keys()", D: "d.get_keys()" },
            correctAnswer: "B",
            explanation: "The `.keys()` method returns a view object of all keys in the dictionary.",
            hint: "The method name is just 'keys'.",
            xpReward: 30
        },

        // --- 4 Coding Problems (Logic & Creation) ---
        {
            id: "dict_c1",
            type: "mission_task",
            question: "MISSION: Create a dictionary named 'hero' with 'name' as 'Nova' and 'level' as 1.",
            expectedOutput: "",
            codeTask: "# Create your dictionary here\n",
            hint: "hero = {'name': 'Nova', 'level': 1}",
            explanation: "Excellent! You've successfully created a dictionary.",
            learningGoals: "User must create a dictionary with multiple key-value pairs.",
            requiredConcepts: ["{", "}", ":"],
            xpReward: 70
        },
        {
            id: "dict_c2",
            type: "mission_task",
            question: "MISSION: Access the 'level' from `hero = {'name': 'Nova', 'level': 5}`. Print it.",
            expectedOutput: "5",
            codeTask: "hero = {'name': 'Nova', 'level': 5}\n# Access and print level here\n",
            hint: "print(hero['level'])",
            explanation: "Correct! Use the key inside square brackets to get its value.",
            learningGoals: "User must access and print a dictionary value using a key.",
            requiredConcepts: ["['level']"],
            xpReward: 70
        },
        {
            id: "dict_c3",
            type: "mission_task",
            question: "MISSION: Update the 'score' in `player = {'score': 10}` to 50. Then print the dictionary.",
            expectedOutput: "{'score': 50}",
            codeTask: "player = {'score': 10}\n# Update score here\nprint(player)",
            hint: "player['score'] = 50",
            explanation: "Nice! Dictionaries are mutable, so you can change values easily.",
            learningGoals: "User must modify a value in a dictionary.",
            requiredConcepts: ["="],
            xpReward: 70
        },
        {
            id: "dict_c4",
            type: "mission_task",
            question: "MISSION: Use `.get()` to look for 'shield' in `gear = {'sword': 1}`. If not found, it should return 'Empty'. Print the result.",
            expectedOutput: "Empty",
            codeTask: "gear = {'sword': 1}\n# Use .get here\n",
            hint: "print(gear.get('shield', 'Empty'))",
            explanation: "Perfect. `.get()` prevents your code from crashing when keys are missing.",
            learningGoals: "User must use and print the .get() method with a default value.",
            requiredConcepts: [".get"],
            regexCheck: /\.get\s*\(\s*['"]shield['"]/,
            xpReward: 70
        },

        // --- 2 Debugging Tasks (Diagnosis & Repair) ---
        {
            id: "dict_d1",
            type: "debugging",
            question: "REPAIR MISSION: This dictionary is missing a colon between a key and a value. Fix the syntax error!",
            codeTask: "user = {'id' 101, 'name': 'Admin'}",
            expectedOutput: "{'id': 101, 'name': 'Admin'}",
            hint: "Add a : after 'id'.",
            explanation: "Fixed! Key-value pairs must always be separated by a colon.",
            errorType: "SyntaxError",
            xpReward: 75,
            learningGoals: "User must add the missing colon in the dictionary definition.",
            regexCheck: /['"]id['"]\s*:\s*101/
        },
        {
            id: "dict_d2",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to access a key that doesn't exist, causing a KeyError. Fix it by using a key that DOES exist ('status')!",
            codeTask: "bot = {'status': 'active'}\nprint(bot['state'])",
            expectedOutput: "active",
            hint: "Change 'state' to 'status'.",
            explanation: "Target repaired! You must always ensure the key you are calling exists in the dictionary.",
            errorType: "KeyError",
            xpReward: 75,
            learningGoals: "User must correct a KeyError by changing the requested key to one that exists in the dictionary."
        }
    ]
};

export const DICTIONARIES_QUESTION_BANK = {
    "Concept_Creation": DICTIONARIES_LEVEL_1.questions.filter(q => q.id.includes('dict_m1') || q.id.includes('dict_c1') || q.id.includes('dict_d1')),
    "Concept_Access": DICTIONARIES_LEVEL_1.questions.filter(q => q.id.includes('dict_m2') || q.id.includes('dict_c2') || q.id.includes('dict_d2')),
    "Concept_Mutation": DICTIONARIES_LEVEL_1.questions.filter(q => q.id.includes('dict_c3')),
    "Concept_Methods": DICTIONARIES_LEVEL_1.questions.filter(q => q.id.includes('dict_m3') || q.id.includes('dict_m4') || q.id.includes('dict_c4')),
    "Concept_Repair": DICTIONARIES_LEVEL_1.questions.filter(q => q.type === 'debugging')
};
