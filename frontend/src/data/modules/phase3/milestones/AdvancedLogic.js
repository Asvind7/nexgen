export const ADVANCED_LOGIC_EXAM = {
    title: "Advanced Logic Master Exam 🧙‍♂️",
    passingScore: 800,
    questions: [
        {
            id: "al1",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the primary function of the `map()` operation in Python?",
            options: { A: "Filters a list", B: "Applies a function to all items in an input list", C: "Reduces a list to one value", D: "Sorts a list" },
            correctAnswer: "B",
            explanation: "map() transforms each item in a collection using a provided function.",
            concepts: ["higher_order_functions", "map"],
            hint: "Think of mapping one value to another."
        },
        {
            id: "al2",
            type: "mission_task",
            question: "### 🚀 MISSION: Lambda Filter\nUse functional programming to extract specific signals from a data stream.\n\n**Objective:**\nUse `filter()` combined with a `lambda` to extract all **even numbers** from the list `[1, 2, 3, 4]`. Print the resulting list.",
            expectedOutput: "[2, 4]",
            codeTask: "# -- NXGN Functional Core --\nnums = [1, 2, 3, 4]\n\n# Use filter with lambda below:\n",
            explanation: "Lambda functions are perfect for simple operations inside higher-order functions.",
            concepts: ["lambdas", "filter"],
            requiredConcepts: ["lambda", "filter", "list", "print"]
        },
        {
            id: "al3",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the primary architectural purpose of a **Decorator** in Python?",
            options: { A: "To delete a function", B: "To modify or enhance the behavior of a function without changing its source code", C: "To make a function run faster", D: "To hide a function" },
            correctAnswer: "B",
            explanation: "Decorators wrap another function to extend its behavior dynamically.",
            concepts: ["decorators", "wrappers"],
            hint: "Think of it as a wrapper."
        },
        {
            id: "al4",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich keyword is strictly required to create a **Generator** function?",
            options: { A: "return", B: "give", C: "yield", D: "send" },
            correctAnswer: "C",
            explanation: "yield pauses the function and returns a value, allowing it to resume later.",
            concepts: ["generators", "yield"],
            hint: "Traffic sign that means 'let others go'."
        },
        {
            id: "al5",
            type: "mission_task",
            question: "### 🚀 MISSION: Reduce Sum\nPerform a deep reduction on a numerical dataset.\n\n**Objective:**\nUse `functools.reduce` and a `lambda` to calculate the total **sum** of the list `[1, 2, 3]`. Print the result.",
            expectedOutput: "6",
            codeTask: "# -- NXGN Aggregation Core --\nfrom functools import reduce\nnums = [1, 2, 3]\n\n# Use reduce with lambda below:\n",
            explanation: "Lambda parameters must match the variables used in the expression.",
            concepts: ["lambdas", "reduce"],
            requiredConcepts: ["from functools import reduce", "lambda", "reduce"]
        },
        {
            id: "al6",
            type: "mission_task",
            question: "### 🚀 MISSION: Square Generator\nBuild a memory-efficient numerical sequence generator.\n\n**Objective:**\nDefine a generator function `squares(n)` that **yields** the squares of numbers from **1 up to n**.",
            expectedOutput: "1\n4",
            codeTask: "# -- NXGN Sequence Engine --\n# Define your generator function squares(n) below:\n",
            explanation: "Generators are more memory-efficient than returning a full list.",
            concepts: ["generators", "efficiency"],
            requiredConcepts: ["def squares", "yield", "for", "in"]
        },
        {
            id: "al7",
            type: "mission_task",
            question: "### 🚀 MISSION: Decorator Deftly\nInstrument an existing function with a custom debugging wrapper.\n\n**Objective:**\nApply the `@debug` decorator to a new function `start()` that simply prints the string `\"Started\"`.",
            expectedOutput: "Debugging...\nStarted",
            codeTask: "# -- NXGN Instrument Module --\ndef debug(f):\n    def wrapper():\n        print('Debugging...')\n        return f()\n    return wrapper\n\n# Apply decorator to start() below:\n",
            explanation: "Exactly! The @ syntax is syntactic sugar for start = debug(start).",
            concepts: ["decorators", "syntax"],
            requiredConcepts: ["@debug", "def start", "print"]
        },
        {
            id: "al8",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat exactly does the expression `(x*2 for x in range(3))` return?",
            options: { A: "[0, 2, 4]", B: "(0, 2, 4)", C: "A generator object", D: "Error" },
            correctAnswer: "C",
            explanation: "Parentheses around a comprehension create a generator expression, not a tuple.",
            concepts: ["generator_expressions", "memory_efficiency"],
            hint: "Generators are lazy."
        },
        {
            id: "al9",
            type: "mission_task",
            question: "### 🚀 MISSION: Map Methods\nBatch transform a string collection using built-in string methods.\n\n**Objective:**\nUse `map()` to convert the list `['a', 'b']` to uppercase using `str.upper`. Print the resulting list.",
            expectedOutput: "['A', 'B']",
            codeTask: "# -- NXGN Batch Transform --\n# Use map with str.upper below:\n",
            explanation: "Built-in methods can be passed directly as functions to map().",
            concepts: ["higher_order_functions", "map"],
            requiredConcepts: ["list", "map", "str.upper", "print"]
        },
        {
            id: "al10",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThis decorator is 'eating' the function call! The wrapper never actually calls the original function.\n\n**Objective:**\nModify the `wrapper()` function to correctly call the passed function `f()`.",
            codeTask: "# -- NXGN Wrapper Repair --\ndef deco(f):\n    def wrapper():\n        print('Wait')\n        # Add the call to f() here:\n    return wrapper",
            expectedOutput: "Wait\nGo",
            hint: "Add f() inside wrapper().",
            explanation: "Decorators control when and how many times a function execution happens.",
            concepts: ["decorators", "logic_errors"],
            requiredConcepts: ["f()"],
            learningGoals: "User must call the original function within the decorator wrapper."
        }
    ]
};
