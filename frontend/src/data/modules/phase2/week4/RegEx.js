export const REGEX_LEVEL_1 = {
    title: "The Pattern Architect",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "re_m1",
            type: "mcq",
            question: "Which module must you import to use Regular Expressions in Python?",
            options: { A: "regex", B: "re", C: "pattern", D: "search" },
            correctAnswer: "B",
            explanation: "Python's standard library for regular expressions is the `re` module.",
            hint: "It's a short 2-letter name.",
            concepts: ["importing", "standard_library"],
            xpReward: 30
        },
        {
            id: "re_m2",
            type: "mcq",
            question: "What does `re.search()` do?",
            options: {
                A: "Checks if the whole string matches exactly",
                B: "Finds the FIRST occurrence of a pattern anywhere in the string",
                C: "Removes a pattern from a string",
                D: "Splits a string by a pattern"
            },
            correctAnswer: "B",
            explanation: "`.search()` looks for the first match anywhere in the string, whereas `.match()` only checks the beginning.",
            hint: "It searches the entire string until it finds a match.",
            concepts: ["searching", "methods"],
            xpReward: 30
        },
        {
            id: "re_m3",
            type: "mcq",
            question: "What does the pattern `\\d+` match?",
            options: { A: "Only the letter 'd'", B: "One or more digits (numbers)", C: "Any whitespace", D: "The end of a string" },
            correctAnswer: "B",
            explanation: "`\\d` represents any decimal digit, and `+` means one or more.",
            hint: "d is for digit.",
            concepts: ["character_classes", "quantifiers"],
            xpReward: 30
        },
        {
            id: "re_m4",
            type: "mcq",
            question: "Which RegEx character matches any character EXCEPT a newline?",
            options: { A: "*", B: ".", C: "?", D: "+" },
            correctAnswer: "B",
            explanation: "The dot `.` is a wildcard that matches almost any single character.",
            hint: "It's a single period.",
            concepts: ["wildcards", "special_characters"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "re_c1",
            type: "mission_task",
            question: "MISSION: Import the `re` module and find all digits in `text = 'Agent 007'`. Print the list of matches.",
            expectedOutput: "['007']",
            codeTask: "# Import re and use findall to extract digits from 'text'\n",
            hint: "import re\ntext = 'Agent 007'\nprint(re.findall('\\d+', text))",
            explanation: "Great! `findall()` returns all occurrences of a pattern as a list.",
            learningGoals: "User must import re and use findall to extract digits.",
            requiredConcepts: ["import re", "re.findall", "\\d+", "print"],
            concepts: ["searching", "extraction"],
            regexCheck: /re\.findall\s*\(\s*['"]\\d\+['"]\s*,\s*text\s*\)/,
            xpReward: 70
        },
        {
            id: "re_c2",
            type: "mission_task",
            question: "MISSION: Use `re.search()` to see if 'Py' exists in `code = 'Python'`. Print the matched text.",
            expectedOutput: "Py",
            codeTask: "import re\ncode = 'Python'\n# Use search() and .group() to print the match\n",
            hint: "match = re.search('Py', code)\nprint(match.group())",
            explanation: "Correct! `.group()` returns the actual string found by the search.",
            learningGoals: "User must use re.search() and .group() to display a match.",
            requiredConcepts: ["import re", "re.search", ".group()", "print"],
            concepts: ["searching", "accessing_matches"],
            regexCheck: /re\.search\s*\(\s*['"]Py['"]\s*,\s*code\s*\)/,
            xpReward: 70
        },
        {
            id: "re_c3",
            type: "mission_task",
            question: "MISSION: Check if the string `user = '123'` consists only of digits using `re.match('\\d+', user)`. Print the boolean result of checking if the match is NOT None.",
            expectedOutput: "True",
            codeTask: "import re\nuser = '123'\n# Check if re.match matches correctly and print boolean\n",
            hint: "print(re.match('\\d+', user) is not None)",
            explanation: "Nice! `is not None` is the standard way to check if a RegEx match succeeded.",
            learningGoals: "User must validate a string using re.match().",
            requiredConcepts: ["import re", "re.match", "is not None", "print"],
            concepts: ["validation", "conditional_logic"],
            regexCheck: /re\.match\s*\(\s*['"]\\d\+['"]\s*,\s*user\s*\)\s+is\s+not\s+None/,
            xpReward: 75
        },
        {
            id: "re_c4",
            type: "mission_task",
            question: "MISSION: Replace all digits in `stats = 'Score: 10'` with 'X' using `re.sub()`. Print the result.",
            expectedOutput: "Score: X",
            codeTask: "import re\nstats = 'Score: 10'\n# Use re.sub to replace digits with 'X'\n",
            hint: "print(re.sub('\\d+', 'X', stats))",
            explanation: "Powerful! `re.sub()` is perfect for cleaning or masking sensitive data.",
            learningGoals: "User must use re.sub() for string replacement.",
            requiredConcepts: ["import re", "re.sub", "print"],
            concepts: ["modification", "replacement"],
            regexCheck: /re\.sub\s*\(\s*['"]\\d\+['"]\s*,\s*['"]X['"]\s*,\s*stats\s*\)/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "re_d1",
            type: "debugging",
            question: "REPAIR MISSION: You forgot to import the module before using it. Fix the code!",
            codeTask: "# Missing import here\nmatch = re.search('A', 'ABC')\nprint(match.group())",
            expectedOutput: "A",
            hint: "Add `import re` at the very top.",
            explanation: "Fixed! You must always import `re` before using its functions.",
            errorType: "NameError",
            concepts: ["importing", "debugging"],
            xpReward: 75,
            requiredConcepts: ["import re"],
            learningGoals: "User must add the missing import for the re module."
        },
        {
            id: "re_d2",
            type: "debugging",
            question: "LOGIC REPAIR: This search for '^Start' fails because the string doesn't start with 'Start'. Fix the string!",
            codeTask: "import re\n# Fix the string below to match the ^ anchor:\nif re.search('^Start', 'The Start'):\n    print('Match')",
            expectedOutput: "Match",
            hint: "Change 'The Start' to 'Start' at the beginning.",
            explanation: "Anchors like ^ and $ require matches at specific positions in the string.",
            errorType: "LogicError",
            concepts: ["anchors", "debugging"],
            xpReward: 75,
            requiredConcepts: ["import re", "Start"],
            learningGoals: "User must correct string data to match a regex anchor."
        }
    ]
};

export const REGEX_QUESTION_BANK = {
    "Basics": REGEX_LEVEL_1.questions.filter(q => q.id.includes('re_m1') || q.id.includes('re_d1')),
    "Searching": REGEX_LEVEL_1.questions.filter(q => q.id.includes('re_m2') || q.id.includes('re_c2') || q.id.includes('re_d2')),
    "Patterns": REGEX_LEVEL_1.questions.filter(q => q.id.includes('re_m3') || q.id.includes('re_m4') || q.id.includes('re_c1')),
    "Validation": REGEX_LEVEL_1.questions.filter(q => q.id.includes('re_c3') || q.id.includes('re_c4'))
};
