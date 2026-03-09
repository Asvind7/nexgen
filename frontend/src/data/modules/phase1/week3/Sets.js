export const SETS_LEVEL_1 = {
    title: "The Uniqueness Zone",
    passingScore: 500,
    questions: [
        // --- 4 MCQs (Theory & Foundation) ---
        {
            id: "set_m1",
            type: "mcq",
            question: "What is the primary characteristic of a Set in Python?",
            options: { A: "It preserves the order of items", B: "It only stores unique items (no duplicates)", C: "It uses square brackets []", D: "It is immutable like a tuple" },
            correctAnswer: "B",
            explanation: "Sets are unordered collections of unique elements. If you try to add a duplicate, it will be ignored.",
            hint: "Think about 'duplicates'.",
            xpReward: 30
        },
        {
            id: "set_m2",
            type: "mcq",
            question: "Which symbol is used for the Intersection of two sets?",
            options: { A: "|", B: "&", C: "^", D: "+" },
            correctAnswer: "B",
            explanation: "The `&` operator finds elements that are common to both sets (Intersection).",
            hint: "It's the 'and' symbol.",
            xpReward: 30
        },
        {
            id: "set_m3",
            type: "mcq",
            question: "How do you add an item 'A' to a set `s`?",
            options: { A: "s.append('A')", B: "s.add('A')", C: "s.push('A')", D: "s.insert('A')" },
            correctAnswer: "B",
            explanation: "Sets use the `.add()` method to include a new element.",
            hint: "A shorter word than 'append'.",
            xpReward: 30
        },
        {
            id: "set_m4",
            type: "mcq",
            question: "What happens if you execute `s = {1, 1, 2}`?",
            options: { A: "The set contains {1, 1, 2}", B: "The set contains {1, 2}", C: "It raises a SyntaxError", D: "The set becomes empty" },
            correctAnswer: "B",
            explanation: "Python automatically removes duplicates when a set is created or modified.",
            hint: "Sets only care about unique values.",
            xpReward: 30
        },

        // --- 4 Coding Problems (Logic & Creation) ---
        {
            id: "set_c1",
            type: "mission_task",
            theme: "Uniqueness",
            question: "MISSION: Create a set named 'ids' containing the numbers 10, 20, and 30.",
            expectedOutput: "",
            codeTask: "# Create your set here\n",
            hint: "ids = {10, 20, 30}",
            explanation: "Excellent! You've successfully created a set using curly braces.",
            learningGoals: "User must create a set with multiple integers.",
            requiredConcepts: ["{", "}", "=", "10"],
            xpReward: 70
        },
        {
            id: "set_c2",
            type: "mission_task",
            question: "MISSION: Add 'Beta' to the set `tags = {'Alpha'}` using .add(). Then print it.",
            expectedOutput: "{'Alpha', 'Beta'}",
            codeTask: "tags = {'Alpha'}\n# Add 'Beta' here\nprint(tags)",
            hint: "tags.add('Beta')",
            explanation: "Correct! The set now contains both unique tags.",
            learningGoals: "User must use the .add() method on a set and print it.",
            requiredConcepts: [".add"],
            regexCheck: /\.add\s*\(\s*['"]Beta['"]\s*\)/,
            xpReward: 70
        },
        {
            id: "set_c3",
            type: "mission_task",
            question: "MISSION: Find the intersection (common items) between `a = {1, 2}` and `b = {2, 3}`. Print the result.",
            expectedOutput: "{2}",
            codeTask: "a = {1, 2}\nb = {2, 3}\n# Print intersection here\n",
            hint: "print(a & b)",
            explanation: "Nice! Intersection filters for items present in both collections.",
            learningGoals: "User must use and print the & operator for set intersection.",
            requiredConcepts: ["&"],
            regexCheck: /print\s*\(\s*a\s*&\s*b\s*\)/,
            xpReward: 70
        },
        {
            id: "set_c4",
            type: "mission_task",
            question: "MISSION: Check if 'Admin' is in the set `users = {'Guest', 'Staff'}`. Print the boolean result.",
            expectedOutput: "False",
            codeTask: "users = {'Guest', 'Staff'}\n# Check membership here\n",
            hint: "print('Admin' in users)",
            explanation: "Perfect. The 'in' keyword is very efficient for checking membership in a set.",
            learningGoals: "User must use and print the 'in' keyword to check for membership in a set.",
            requiredConcepts: ["in"],
            regexCheck: /print\s*\(\s*['"]Admin['"]\s+in\s+users\s*\)/,
            xpReward: 70
        },

        // --- 2 Debugging Tasks (Diagnosis & Repair) ---
        {
            id: "set_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to index a set, but sets are unordered and don't support indexing. Fix the code by converting the set to a list before indexing!",
            codeTask: "s = {10, 20, 30}\nprint(s[0])",
            expectedOutput: "10",
            hint: "Use list(s) to convert it first: print(list(s)[0])",
            explanation: "Fixed! You realized that sets aren't indexed, so conversion to a list is required for position-based access.",
            errorType: "TypeError",
            xpReward: 75,
            learningGoals: "User must convert a set to a list to access an element by index (simulating fixing a TypeError)."
        },
        {
            id: "set_d2",
            type: "debugging",
            question: "REPAIR MISSION: To create an EMPTY set, you must use set(), not {}. {} creates an empty dictionary! Fix the code.",
            codeTask: "empty_val = {}\nprint(type(empty_val))",
            expectedOutput: "<class 'set'>",
            hint: "Change {} to set().",
            explanation: "Syntax restored. empty_set = set() is the only way to make a set with no items initially.",
            errorType: "LogicError",
            xpReward: 75,
            learningGoals: "User must use set() to initialize an empty set, not {}."
        }
    ]
};

export const SETS_QUESTION_BANK = {
    "Concept_Creation": SETS_LEVEL_1.questions.filter(q => q.id.includes('set_m4') || q.id.includes('set_c1') || q.id.includes('set_d2')),
    "Concept_Modification": SETS_LEVEL_1.questions.filter(q => q.id.includes('set_m3') || q.id.includes('set_c2')),
    "Concept_Operations": SETS_LEVEL_1.questions.filter(q => q.id.includes('set_m2') || q.id.includes('set_c3') || q.id.includes('set_c4')),
    "Concept_Properties": SETS_LEVEL_1.questions.filter(q => q.id.includes('set_m1') || q.id.includes('set_d1')),
    "Concept_Repair": SETS_LEVEL_1.questions.filter(q => q.type === 'debugging')
};
