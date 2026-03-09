export const GENERATORS_LEVEL_1 = {
    title: "Lazy Loops",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "gen_m1",
            type: "mcq",
            question: "Which keyword turns a function into a Generator?",
            options: { A: "return", B: "yield", C: "stop", D: "next" },
            correctAnswer: "B",
            explanation: "`yield` pauses the function and saves its state, allowing it to produce a series of values over time instead of all at once.",
            hint: "It yields a value.",
            xpReward: 30
        },
        {
            id: "gen_m2",
            type: "mcq",
            question: "What is the benefit of Generators?",
            options: { A: "They use less memory (Lazy Evaluation)", B: "They are faster for small lists", C: "They can go backwards", D: "They allow multi-threading" },
            correctAnswer: "A",
            explanation: "Generators compute values on the fly, so they don't store the entire sequence in memory. Great for massive datasets!",
            hint: "Lazy is efficient.",
            xpReward: 30
        },
        {
            id: "gen_m3",
            type: "mcq",
            question: "How do you manually get the NEXT value from a generator?",
            options: { A: "gen.get()", B: "next(gen)", C: "gen.next()", D: "yield gen" },
            correctAnswer: "B",
            explanation: "The `next()` built-in function requests the next yielded value from an iterator or generator.",
            hint: "It moves to the next.",
            xpReward: 30
        },
        {
            id: "gen_m4",
            type: "mcq",
            question: "What exception is raised when a generator has no more values to yield?",
            options: { A: "EndError", B: "StopIteration", C: "YieldFinished", D: "FinalIteration" },
            correctAnswer: "B",
            explanation: "Python raises `StopIteration` when an iterator is exhausted.",
            hint: "It stops the iteration.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "gen_c1",
            type: "mission_task",
            question: "MISSION: Create a generator `count_up` that yields 1, then 2, then 3.",
            expectedOutput: "1\n2\n3",
            codeTask: "# Define count_up with yield\ndef count_up():\n    # yield 1, 2, 3\n    pass\n\nfor n in count_up():\n    print(n)",
            hint: "yield 1\nyield 2\nyield 3",
            explanation: "Each `yield` paused the function until the loop requested the next number.",
            learningGoals: "User must create a generator using 'yield'.",
            requiredConcepts: ["yield"],
            regexCheck: /yield\s+1/,
            xpReward: 70
        },
        {
            id: "gen_c2",
            type: "mission_task",
            question: "MISSION: Use `next()` once on the generator `nums = (x for x in range(5))`. Print the result.",
            expectedOutput: "0",
            codeTask: "nums = (x for x in range(5))\n# Use next() here\n",
            hint: "print(next(nums))",
            explanation: "Correct. Generator expressions (in parentheses) create generators without a full def block.",
            learningGoals: "User must use the next() function.",
            requiredConcepts: ["next"],
            regexCheck: /next\s*\(\s*nums\s*\)/,
            xpReward: 70
        },
        {
            id: "gen_c3",
            type: "mission_task",
            question: "MISSION: Create an infinite generator `infinite_zero()` that yields 0 forever. (Simulated usage: yield once).",
            expectedOutput: "0",
            codeTask: "def infinite_zero():\n    while True:\n        # yield 0 here\n        pass\n\nz = infinite_zero()\nprint(next(z))",
            hint: "yield 0",
            explanation: "Infinite sequences are only possible because of lazy evaluation. It doesn't crash because it only computes what you ask for.",
            learningGoals: "User must implement an infinite generator pattern.",
            requiredConcepts: ["while True", "yield"],
            regexCheck: /while\s+True/,
            xpReward: 70
        },
        {
            id: "gen_c4",
            type: "mission_task",
            question: "MISSION: Convert the list `[1, 2, 3]` to a generator using a generator expression. Print it.",
            expectedOutput: "<generator object",
            codeTask: "data = [1, 2, 3]\ngen = (x for x in data)\nprint(str(gen)[:17])",
            hint: "(x for x in data)",
            explanation: "Generator expressions are like list comprehensions but use parentheses and produce items lazily.",
            learningGoals: "User must create a generator expression.",
            requiredConcepts: ["("],
            regexCheck: /\(.*\s+for\s+.*\s+in\s+.*\)/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "gen_d1",
            type: "debugging",
            question: "REPAIR MISSION: This generator is using `return` instead of `yield`. Fix it!",
            codeTask: "def give_numbers():\n    for i in range(3):\n        # Fix this line:\n        return i\n\nprint(list(give_numbers()))",
            expectedOutput: "[0, 1, 2]",
            hint: "Change return to yield.",
            explanation: "Fixed! Return ends the function immediately, while yield pauses it and allows it to continue later.",
            errorType: "LogicError",
            xpReward: 75,
            learningGoals: "User must replace return with yield in a generator loop."
        },
        {
            id: "gen_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: You are trying to use `.next()` on a generator. In Python 3, use the `next()` function instead!",
            codeTask: "g = (x for x in [10])\n# Fix this line:\nprint(g.next())",
            expectedOutput: "10",
            hint: "Use next(g)",
            explanation: "In Python 3, the .next() method was renamed to __next__() and is usually accessed via the next() built-in.",
            errorType: "AttributeError",
            xpReward: 75,
            learningGoals: "User must use the next() built-in function."
        }
    ]
};

export const GENERATORS_QUESTION_BANK = {
    "Concept_Yield": GENERATORS_LEVEL_1.questions.filter(q => q.id.includes('gen_m1') || q.id.includes('gen_c1') || q.id.includes('gen_d1')),
    "Concept_Memory": GENERATORS_LEVEL_1.questions.filter(q => q.id.includes('gen_m2') || q.id.includes('gen_c3') || q.id.includes('gen_c4')),
    "Concept_Iteration": GENERATORS_LEVEL_1.questions.filter(q => q.id.includes('gen_m3') || q.id.includes('gen_m4') || q.id.includes('gen_c2') || q.id.includes('gen_d2'))
};
