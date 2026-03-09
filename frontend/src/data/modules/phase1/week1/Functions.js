export const FUNCTIONS_LEVEL_1 = {
    questions: [
        {
            id: 'func_1',
            type: 'multiple_choice',
            question: "Which keyword is used to start a function definition?",
            options: [
                "func",
                "def",
                "function",
                "define"
            ],
            correctAnswer: "def",
            explanation: "In Python, we use the `def` keyword (short for define) to start creating a function.",
            requiredConcepts: ["function_definition"],
            xpReward: 50
        },
        {
            id: 'func_2',
            type: 'mission_task',
            question: "Define a function named `greet` that prints 'Hello'. Call it once.",
            codeTask: "# Define your function and call it:\n",
            regexCheck: /def\s+greet\s*\(\s*\):\s*(?:\n\s*|\s+)print\s*\(\s*['"]Hello['"]\s*\)\s*(?:\n\s*|\s*)greet\s*\(\s*\)/,
            expectedOutput: "Hello",
            learningGoals: "User must define a function 'greet' and call it.",
            hint: "Use `def greet():` and remember to indent the print statement!",
            requiredConcepts: ["def", "greet", "()"],
            xpReward: 70
        },
        {
            id: 'func_3',
            type: 'multiple_choice',
            question: "What is the correct way to call a function named `run`?",
            options: [
                "run",
                "call run",
                "run()",
                "execute run"
            ],
            correctAnswer: "run()",
            explanation: "You must use parentheses `()` to call (execute) a function.",
            requiredConcepts: ["function_call"],
            xpReward: 50
        },
        {
            id: 'func_4',
            type: 'mission_task',
            question: "Create a function `double(x)` that returns `x * 2`.",
            codeTask: "# Define double(x) below:\n",
            regexCheck: /def\s+double\s*\(\s*x\s*\):\s*(?:\n\s*|\s+)return\s+x\s*\*\s*2/,
            expectedOutput: "10 (if called with 5)",
            learningGoals: "User must define a function with a parameter and a return statement.",
            hint: "Use `return` inside the function, not `print`.",
            requiredConcepts: ["def", "return", "x"],
            xpReward: 80
        },
        {
            id: 'func_5',
            type: 'debugging',
            question: "This function is broken. Fix the syntax error.",
            codeTask: "def say_hi()\n    print('Hi')",
            regexCheck: /def\s+say_hi\s*\(\s*\):\s*(?:\n\s*|\s+)print\s*\(\s*['"]Hi['"]\s*\)/,
            correctAnswer: "def say_hi():\n    print('Hi')",
            explanation: "Function definitions must end with a colon `:`. Also check indentation!",
            hint: "You are missing a colon : at the end of the def line.",
            learningGoals: "User must fix a syntax error (missing colon) in function definition.",
            requiredConcepts: [":"],
            xpReward: 75
        },
        {
            id: 'func_6',
            type: 'multiple_choice',
            question: "What does the `return` keyword do?",
            options: [
                "Prints text to the screen",
                "Sends a value back to the caller",
                "Stops the program completely",
                "Loops the function"
            ],
            correctAnswer: "Sends a value back to the caller",
            explanation: "`return` exits the function and passes a value back to where the function was called.",
            requiredConcepts: ["return"],
            xpReward: 50
        },
        {
            id: 'func_7',
            type: 'mission_task',
            question: "Write a function `add(a, b)` that prints their sum. Call it with 3 and 4.",
            codeTask: "# Define add(a, b) and call it:\n",
            regexCheck: /def\s+add\s*\(\s*a\s*,\s*b\s*\):\s*(?:\n\s*|\s+)print\s*\(\s*a\s*\+\s*b\s*\)\s*(?:\n\s*|\s*)add\s*\(\s*3\s*,\s*4\s*\)/,
            expectedOutput: "7",
            learningGoals: "User must define a function with two parameters and print the sum.",
            hint: "Define `def add(a, b):` and then `print(a + b)` inside.",
            requiredConcepts: ["def", "add", "+"],
            xpReward: 80
        },
        {
            id: 'func_8',
            type: 'multiple_choice',
            question: "Variables created INSIDE a function are...",
            options: [
                "Global (visible everywhere)",
                "Local (visible only inside)",
                "Universal",
                "Permanent"
            ],
            correctAnswer: "Local (visible only inside)",
            explanation: "Variables defined inside a function are 'local' to that function and cannot be used outside of it.",
            requiredConcepts: ["scope"],
            xpReward: 50
        },
        {
            id: 'func_9',
            type: 'mission_task',
            question: "Create a function `shout(text)` that returns the text in uppercase.",
            codeTask: "# Use .upper() inside your function:\n",
            regexCheck: /def\s+shout\s*\(\s*text\s*\):\s*(?:\n\s*|\s+)return\s+text\.upper\s*\(\s*\)/,
            expectedOutput: "HELLO (if called with 'hello')",
            learningGoals: "User must use a string method inside a function and return the result.",
            hint: "Use `text.upper()` to make it uppercase.",
            requiredConcepts: ["def", ".upper()", "return"],
            xpReward: 80
        },
        {
            id: 'func_10',
            type: 'debugging',
            question: "Why does this code fail?",
            codeTask: "def test():\n    x = 10\nprint(x)",
            regexCheck: /(?:def\s+test\s*\(\s*\):\s*\n\s+x\s*=\s*10\s*\n\s+print\s*\(\s*x\s*\))|(?:x\s*=\s*10\s*\n\s*print\s*\(\s*x\s*\))/,
            status: "broken",
            // Note: This needs a 'repair' state, usually debugging expects valid code to pass.
            // But this is 'why does it fail' which implies conceptual understanding or fixing scope.
            // Let's change it to a fix mission. 
            correctAnswer: "x = 10\nprint(x)",
            // Or make it print inside?
            explanation: "Variable `x` is local to `test()`. You cannot print it outside. To fix, either move print inside or return x.",
            hint: "Move the print statement indented inside the function, or move x outside.",
            learningGoals: "User must understand variable scope limits.",
            requiredConcepts: ["print"],
            xpReward: 75
        }
    ]
};

export const FUNCTIONS_QUESTION_BANK = {
    "Definitions": FUNCTIONS_LEVEL_1.questions.filter(q => q.id.includes('func_1') || q.id.includes('func_2') || q.id.includes('func_5')),
    "Returns": FUNCTIONS_LEVEL_1.questions.filter(q => q.id.includes('func_4') || q.id.includes('func_6') || q.id.includes('func_9')),
    "Calls_Params": FUNCTIONS_LEVEL_1.questions.filter(q => q.id.includes('func_3') || q.id.includes('func_7')),
    "Scope": FUNCTIONS_LEVEL_1.questions.filter(q => q.id.includes('func_8') || q.id.includes('func_10'))
};
