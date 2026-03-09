export const LAMBDA_LEVEL_1 = {
    title: "The Anonymous One",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "lam_m1",
            type: "mcq",
            question: "What is a `lambda` function in Python?",
            options: { A: "A function defined with `def` that returns nothing", B: "An anonymous function defined in a single line", C: "A loop that runs once", D: "A function that can only be used with numbers" },
            correctAnswer: "B",
            explanation: "`lambda` creates a small, unnamed function on a single line without a `def` block.",
            concepts: ["lambda", "anonymous_function"],
            hint: "It has no name — that's the point.",
            xpReward: 30
        },
        {
            id: "lam_m2",
            type: "mcq",
            question: "What does `double = lambda x: x * 2` do?",
            options: { A: "Creates a variable named x", B: "Creates a function that multiplies its argument by 2", C: "Prints x twice", D: "Deletes the variable x" },
            correctAnswer: "B",
            explanation: "`lambda x: x * 2` creates a function with one parameter `x` that returns `x * 2`.",
            concepts: ["lambda", "parameters"],
            hint: "The part after the `:` is the return value.",
            xpReward: 30
        },
        {
            id: "lam_m3",
            type: "mcq",
            question: "Can a `lambda` function take multiple parameters?",
            options: { A: "No, only one", B: "Yes, separated by commas", C: "Only with a special keyword", D: "Only if they are strings" },
            correctAnswer: "B",
            explanation: "`lambda x, y: x + y` takes two parameters. Lambdas can take any number of arguments.",
            concepts: ["lambda", "multiple_params"],
            hint: "Same as def functions — just separate them with commas.",
            xpReward: 30
        },
        {
            id: "lam_m4",
            type: "mcq",
            question: "When is it best to use a `lambda` instead of a `def` function?",
            options: { A: "For multi-line complex logic", B: "For short, one-time-use functions passed as arguments", C: "For defining class methods", D: "When you want the code to run faster" },
            correctAnswer: "B",
            explanation: "Lambda shines when you need a quick function as an argument to `map()`, `filter()`, or `sorted()`. For anything complex, use `def`.",
            concepts: ["lambda", "use_cases"],
            hint: "Lambda is best when the function is small and only used once.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "lam_c1",
            type: "mission_task",
            question: "MISSION: Create a `lambda` that adds 10 to any number. Store it in `add10`. Call `add10(5)` and print the result.",
            expectedOutput: "15",
            codeTask: "# Create a lambda function 'add10' that adds 10 to its argument\n",
            hint: "add10 = lambda x: x + 10",
            explanation: "Lambda is just a shortcut for creating simple, named or unnamed functions.",
            learningGoals: "User must define a lambda function and call it.",
            requiredConcepts: ["lambda", "add10", "print"],
            concepts: ["lambda", "basic_usage"],
            regexCheck: /lambda\s+\w+\s*:/,
            xpReward: 70
        },
        {
            id: "lam_c2",
            type: "mission_task",
            question: "MISSION: Create a `lambda` that takes two numbers and returns their product. Assign it to `multiply`. Print `multiply(4, 5)`.",
            expectedOutput: "20",
            codeTask: "# Create multiply lambda with two parameters\n",
            hint: "multiply = lambda x, y: x * y",
            explanation: "Lambdas with multiple parameters work just like regular multi-argument functions.",
            learningGoals: "User must create a multi-parameter lambda.",
            requiredConcepts: ["lambda", "multiply", "print"],
            concepts: ["lambda", "multiple_params"],
            regexCheck: /lambda\s+\w+\s*,\s*\w+\s*:/,
            xpReward: 70
        },
        {
            id: "lam_c3",
            type: "mission_task",
            question: "MISSION: Use a `lambda` with `sorted()` to sort the list `[('Bob', 25), ('Alice', 20), ('Charlie', 30)]` by age (the second element). Print the result.",
            expectedOutput: "[('Alice', 20), ('Bob', 25), ('Charlie', 30)]",
            codeTask: "people = [('Bob', 25), ('Alice', 20), ('Charlie', 30)]\n# Use sorted() with a lambda key to sort by age\n",
            hint: "sorted(people, key=lambda p: p[1])",
            explanation: "The `key` parameter in `sorted()` expects a function — lambdas are perfect for this.",
            learningGoals: "User must use a lambda as the key argument to sorted().",
            requiredConcepts: ["lambda", "sorted(", "key="],
            concepts: ["lambda", "sorting"],
            regexCheck: /sorted\s*\(.*key\s*=\s*lambda/,
            xpReward: 70
        },
        {
            id: "lam_c4",
            type: "mission_task",
            question: "MISSION: Use `filter()` with a `lambda` to keep only even numbers from `[1, 2, 3, 4, 5, 6]`. Print the result.",
            expectedOutput: "[2, 4, 6]",
            codeTask: "nums = [1, 2, 3, 4, 5, 6]\n# Use filter() with a lambda to keep only even numbers\n",
            hint: "list(filter(lambda x: x % 2 == 0, nums))",
            explanation: "`filter()` keeps items where the function returns True. Lambdas are great for this inline check.",
            learningGoals: "User must use lambda with filter() to select elements.",
            requiredConcepts: ["filter(", "lambda", "% 2"],
            concepts: ["lambda", "filter"],
            regexCheck: /filter\s*\(\s*lambda/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "lam_d1",
            type: "debugging",
            question: "REPAIR MISSION: The lambda below uses `return` which is invalid in a lambda body. Fix it to work correctly.",
            codeTask: "# This lambda incorrectly uses 'return'\ngreet = lambda name: return 'Hello ' + name\nprint(greet('Asvind'))",
            expectedOutput: "Hello Asvind",
            hint: "Remove 'return' — the expression after the colon IS the return value automatically.",
            explanation: "Lambda bodies are single expressions. You cannot use `return` — the expression IS the return value.",
            errorType: "SyntaxError",
            concepts: ["lambda", "syntax", "debugging"],
            xpReward: 75,
            requiredConcepts: ["lambda", "'Hello '"],
            learningGoals: "User must understand that lambda bodies are implicit return expressions."
        },
        {
            id: "lam_d2",
            type: "debugging",
            question: "REPAIR MISSION: The code tries to define a multi-line lambda, which is not allowed. Rewrite it as a proper `def` function instead.",
            codeTask: "# Fix: lambdas can't have multiple lines. Rewrite as def greet(name):\ngreet = lambda name:\n    msg = 'Hello ' + name\n    print(msg)\ngreet('Asvind')",
            expectedOutput: "Hello Asvind",
            hint: "Use def greet(name): ... with a proper function body.",
            explanation: "A lambda must be a single expression. Multi-line logic requires a regular `def` function.",
            errorType: "SyntaxError",
            concepts: ["lambda", "def", "debugging"],
            xpReward: 75,
            requiredConcepts: ["def greet(name)", "print"],
            learningGoals: "User must recognize when to use def instead of lambda."
        }
    ]
};

export const LAMBDA_QUESTION_BANK = {
    "Concept": LAMBDA_LEVEL_1.questions.filter(q => q.id.includes('lam_m1') || q.id.includes('lam_c1')),
    "Params": LAMBDA_LEVEL_1.questions.filter(q => q.id.includes('lam_m2') || q.id.includes('lam_m3') || q.id.includes('lam_c2')),
    "Functional": LAMBDA_LEVEL_1.questions.filter(q => q.id.includes('lam_m4') || q.id.includes('lam_c3') || q.id.includes('lam_c4')),
    "Debugging": LAMBDA_LEVEL_1.questions.filter(q => q.id.includes('lam_d1') || q.id.includes('lam_d2'))
};
