export const STRING_MANIPULATION_LEVEL_1 = {
    title: "The String Weaver",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "str_m1",
            type: "mcq",
            question: "Which method converts a string to all UPPERCASE letters?",
            options: { A: ".up()", B: ".upper()", C: ".toUpper()", D: ".capitalize()" },
            correctAnswer: "B",
            explanation: "The `.upper()` method returns a copy of the string in uppercase.",
            hint: "It ends with 'er'.",
            concepts: ["string_methods", "case_conversion"],
            xpReward: 30
        },
        {
            id: "str_m2",
            type: "mcq",
            question: "What does the `.split()` method return by default?",
            options: { A: "A new string", B: "A list of strings", C: "A tuple", D: "An error" },
            correctAnswer: "B",
            explanation: "`.split()` breaks a string into a list, using whitespace as the default separator.",
            hint: "It creates a collection of words.",
            concepts: ["string_parsing", "lists"],
            xpReward: 30
        },
        {
            id: "str_m3",
            type: "mcq",
            question: "How do you remove whitespace from BOTH ends of a string?",
            options: { A: ".trim()", B: ".strip()", C: ".clean()", D: ".cut()" },
            correctAnswer: "B",
            explanation: "Python uses `.strip()` to remove leading and trailing whitespace.",
            hint: "Think 'strip away the extra space'.",
            concepts: ["string_cleaning", "whitespace"],
            xpReward: 30
        },
        {
            id: "str_m4",
            type: "mcq",
            question: "Which is the correct syntax for an f-string?",
            options: { A: "f'Hello {name}'", B: "'Hello {name}'", C: "str(f'Hello')", D: "print('f' + name)" },
            correctAnswer: "A",
            explanation: "F-strings (formatted strings) start with the letter 'f' and use curly braces for variables.",
            hint: "Put 'f' before the opening quote.",
            concepts: ["string_formatting", "f_strings"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "str_c1",
            type: "mission_task",
            question: "MISSION: Use an f-string to print: 'Score is 100'. Use the variable `pts`.",
            expectedOutput: "Score is 100",
            codeTask: "pts = 100\n# Use f-string here\n",
            hint: "print(f'Score is {pts}')",
            explanation: "Great! f-strings make string formatting very readable.",
            learningGoals: "User must use an f-string with a variable.",
            requiredConcepts: ["f'", "{", "}"],
            concepts: ["f_strings", "variable_interpolation"],
            regexCheck: /f['"].*\{.+\}.*['"]/,
            xpReward: 70
        },
        {
            id: "str_c2",
            type: "mission_task",
            question: "MISSION: Split the string `data = 'Apple,Banana,Cherry'` using the comma as a separator. Print the result.",
            expectedOutput: "['Apple', 'Banana', 'Cherry']",
            codeTask: "data = 'Apple,Banana,Cherry'\n# Split here\n",
            hint: "print(data.split(','))",
            explanation: "Exactly. You can split by any character, not just spaces.",
            learningGoals: "User must use .split() with a specific separator.",
            requiredConcepts: [".split", "','"],
            concepts: ["string_parsing", "delimiters"],
            regexCheck: /\.split\s*\(\s*['"],['"]\s*\)/,
            xpReward: 70
        },
        {
            id: "str_c3",
            type: "mission_task",
            question: "MISSION: Join the list `words = ['Python', 'is', 'Fun']` into a single string with spaces. Print it.",
            expectedOutput: "Python is Fun",
            codeTask: "words = ['Python', 'is', 'Fun']\n# Join here\n",
            hint: "print(' '.join(words))",
            explanation: "Perfect! .join() is the opposite of .split().",
            learningGoals: "User must use the .join() method.",
            requiredConcepts: [".join"],
            concepts: ["string_methods", "lists_to_strings"],
            regexCheck: /\.join\s*\(/,
            xpReward: 70
        },
        {
            id: "str_c4",
            type: "mission_task",
            question: "MISSION: Check if the string `code = 'Py123'` ends with '123' using `.endswith()`. Print the result.",
            expectedOutput: "True",
            codeTask: "code = 'Py123'\n# Check endswith here\n",
            hint: "print(code.endswith('123'))",
            explanation: "Exactly. .endswith() (and .startswith()) are very useful for validation.",
            learningGoals: "User must use the .endswith() method.",
            requiredConcepts: [".endswith"],
            concepts: ["string_validation", "boolean_methods"],
            regexCheck: /\.endswith\s*\(/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "str_d1",
            type: "debugging",
            question: "REPAIR MISSION: This f-string is missing the 'f' prefix. Fix it!",
            codeTask: "name = 'Neo'\nmsg = 'Welcome {name}'\nprint(msg)",
            expectedOutput: "Welcome Neo",
            hint: "Add f before the quotes on line 2: msg = f'Welcome {name}'",
            explanation: "Fixed! Without the 'f', curly braces are just treated as regular text.",
            errorType: "LogicError",
            concepts: ["f_strings", "syntax_errors"],
            xpReward: 75,
            learningGoals: "User must add the missing f-prefix to a formatted string."
        },
        {
            id: "str_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: This code tries to call .upper but forgot the parentheses (). Fix it!",
            codeTask: "text = 'hello'\n# Fix the method call:\nprint(text.upper)",
            expectedOutput: "HELLO",
            hint: "Add () at the end of .upper",
            explanation: "In Python, you must call methods with parentheses to execute them.",
            errorType: "TypeError",
            concepts: ["method_calls", "syntax_errors"],
            xpReward: 75,
            learningGoals: "User must add parentheses to a method call."
        }
    ]
};

export const STRING_MANIPULATION_QUESTION_BANK = {
    "Formatting": STRING_MANIPULATION_LEVEL_1.questions.filter(q => q.id.includes('str_m4') || q.id.includes('str_c1') || q.id.includes('str_d1')),
    "Methods": STRING_MANIPULATION_LEVEL_1.questions.filter(q => q.id.includes('str_m1') || q.id.includes('str_m3') || q.id.includes('str_c3') || q.id.includes('str_c4') || q.id.includes('str_d2')),
    "Parsing": STRING_MANIPULATION_LEVEL_1.questions.filter(q => q.id.includes('str_m2') || q.id.includes('str_c2'))
};
