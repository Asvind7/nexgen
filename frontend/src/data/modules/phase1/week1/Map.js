// Map, Filter & Reduce — Functional Programming in Python

export const MAP_LEVEL_1 = {
    title: "Functional Trio: map / filter / reduce",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "map_m1",
            type: "mcq",
            question: "What does `map(func, iterable)` do?",
            options: { A: "Filters items", B: "Applies func to each item and returns an iterator", C: "Reduces a list to one value", D: "Deletes the iterable after use" },
            correctAnswer: "B",
            explanation: "`map()` transforms every element with a function. Wrap with `list()` to see the result.",
            concepts: ["map", "functional_programming"],
            hint: "Think: 'run this function on EVERY item'.",
            xpReward: 30
        },
        {
            id: "map_m2",
            type: "mcq",
            question: "What does `filter(func, iterable)` do?",
            options: { A: "Applies func to every item", B: "Keeps only items where func returns True", C: "Sorts items alphabetically", D: "Creates a map of the iterable" },
            correctAnswer: "B",
            explanation: "`filter()` keeps only items where the function returns a truthy value. It's a sieve.",
            concepts: ["filter", "functional_programming"],
            hint: "Think: 'only keep items that PASS the test'.",
            xpReward: 30
        },
        {
            id: "map_m3",
            type: "mcq",
            question: "Where does `reduce()` live in Python 3?",
            options: { A: "Built-in, no import needed", B: "from functools import reduce", C: "import itertools", D: "import math" },
            correctAnswer: "B",
            explanation: "Unlike `map` and `filter`, `reduce` was moved to `functools` in Python 3.",
            concepts: ["reduce", "functools"],
            hint: "It's in the 'functools' toolbox.",
            xpReward: 30
        },
        {
            id: "map_m4",
            type: "mcq",
            question: "What does `reduce(lambda a, b: a + b, [1, 2, 3, 4])` return?",
            options: { A: "[1, 3, 6, 10]", B: "10", C: "4", D: "Runtime Error" },
            correctAnswer: "B",
            explanation: "`reduce` accumulates: (1+2)=3 → (3+3)=6 → (6+4)=10. It boils a list down to a single value.",
            concepts: ["reduce", "accumulation"],
            hint: "reduce 'rolls up' the list from left to right.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "map_c1",
            type: "mission_task",
            question: "MISSION: Use `map()` to convert `['1', '2', '3']` to a list of integers. Print the result.",
            expectedOutput: "[1, 2, 3]",
            codeTask: "nums = ['1', '2', '3']\n# Use map() to convert to integers and print\n",
            hint: "list(map(int, nums)) — pass the built-in `int` directly.",
            explanation: "Mapping built-in type conversions is a very common, clean Pythonic pattern.",
            learningGoals: "User must use map() with int to convert a list of strings.",
            requiredConcepts: ["map(", "int", "print"],
            concepts: ["map", "type_conversion"],
            regexCheck: /map\s*\(\s*int\s*,/,
            xpReward: 70
        },
        {
            id: "map_c2",
            type: "mission_task",
            question: "MISSION: Use `map()` and a `lambda` to square each number in `[1, 2, 3, 4, 5]`. Print the resulting list.",
            expectedOutput: "[1, 4, 9, 16, 25]",
            codeTask: "numbers = [1, 2, 3, 4, 5]\n# Use map() with a lambda to square each number and print\n",
            hint: "list(map(lambda x: x**2, numbers))",
            explanation: "Lambdas are perfect as quick, one-liner functions to pass into map().",
            learningGoals: "User must combine map() with a lambda function.",
            requiredConcepts: ["map(", "lambda", "print"],
            concepts: ["map", "lambda"],
            regexCheck: /map\s*\(\s*lambda/,
            xpReward: 70
        },
        {
            id: "map_c3",
            type: "mission_task",
            question: "MISSION: Use `filter()` with a `lambda` to keep only even numbers from `[1, 2, 3, 4, 5, 6]`. Print the result.",
            expectedOutput: "[2, 4, 6]",
            codeTask: "nums = [1, 2, 3, 4, 5, 6]\n# Use filter() with a lambda to keep only even numbers\n",
            hint: "list(filter(lambda x: x % 2 == 0, nums))",
            explanation: "`filter()` keeps items where the function returns True. `x % 2 == 0` means 'is even'.",
            learningGoals: "User must use lambda with filter() to select even elements.",
            requiredConcepts: ["filter(", "lambda", "% 2"],
            concepts: ["filter", "lambda"],
            regexCheck: /filter\s*\(\s*lambda/,
            xpReward: 70
        },
        {
            id: "map_c4",
            type: "mission_task",
            question: "MISSION: Use `reduce()` from `functools` to find the product of all numbers in `[1, 2, 3, 4, 5]`. Print the result.",
            expectedOutput: "120",
            codeTask: "from functools import reduce\nnums = [1, 2, 3, 4, 5]\n# Use reduce() with a lambda to multiply all elements together\n",
            hint: "reduce(lambda a, b: a * b, nums)",
            explanation: "reduce() applies the function cumulatively: (1*2)=2, (2*3)=6, (6*4)=24, (24*5)=120.",
            learningGoals: "User must use reduce() to accumulate a product from a list.",
            requiredConcepts: ["from functools import reduce", "reduce(", "lambda", "a * b"],
            concepts: ["reduce", "functools", "accumulation"],
            regexCheck: /reduce\s*\(\s*lambda/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "map_d1",
            type: "debugging",
            question: "REPAIR MISSION: The `map()` call forgot to wrap with `list()`. Fix it so the output is a list.",
            codeTask: "nums = [1, 2, 3]\nresult = map(lambda x: x * 10, nums)\nprint(result)",
            expectedOutput: "[10, 20, 30]",
            hint: "Wrap the map() call with list(): list(map(...))",
            explanation: "map() returns a lazy iterator. You need list() to materialize it into a printable list.",
            errorType: "WrongOutput",
            concepts: ["map", "iterator", "debugging"],
            xpReward: 75,
            requiredConcepts: ["list(map("],
            learningGoals: "User must convert the map object to a list using list()."
        },
        {
            id: "map_d2",
            type: "debugging",
            question: "REPAIR MISSION: `reduce()` is used without importing it from `functools`. Fix the import!",
            codeTask: "# Fix: reduce is not built-in in Python 3\nnums = [1, 2, 3, 4]\nresult = reduce(lambda a, b: a + b, nums)\nprint(result)",
            expectedOutput: "10",
            hint: "Add: from functools import reduce",
            explanation: "In Python 3, reduce() was moved from built-ins to the `functools` module.",
            errorType: "NameError",
            concepts: ["reduce", "functools", "debugging"],
            xpReward: 75,
            requiredConcepts: ["from functools import reduce"],
            learningGoals: "User must import reduce from functools to fix a NameError."
        }
    ]
};

export const MAP_QUESTION_BANK = {
    "Map": MAP_LEVEL_1.questions.filter(q => q.id.includes('map_m1') || q.id.includes('map_c1') || q.id.includes('map_c2')),
    "Filter": MAP_LEVEL_1.questions.filter(q => q.id.includes('map_m2') || q.id.includes('map_c3')),
    "Reduce": MAP_LEVEL_1.questions.filter(q => q.id.includes('map_m3') || q.id.includes('map_m4') || q.id.includes('map_c4')),
    "Debugging": MAP_LEVEL_1.questions.filter(q => q.id.includes('map_d1') || q.id.includes('map_d2'))
};
