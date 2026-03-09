export const DECORATORS_LEVEL_1 = {
    title: "The Wrappers",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "dec_m1",
            type: "mcq",
            question: "What is a Decorator?",
            options: { A: "A function that takes another function and extends its behavior", B: "Comments that look nice", C: "A UI element", D: "A built-in variable" },
            correctAnswer: "A",
            explanation: "Decorators wrap functions to add functionality (like logging or timing) without changing the function's source code.",
            hint: "Think of it as a 'wrapper' that adds features to an existing function.",
            xpReward: 30
        },
        {
            id: "dec_m2",
            type: "mcq",
            question: "Which symbol applies a decorator?",
            options: { A: "#", B: "@", C: "&", D: "$" },
            correctAnswer: "B",
            explanation: "The `@` symbol is syntactic sugar for applying a decorator function.",
            hint: "Look for the symbol used in email addresses or social media tags!",
            xpReward: 30
        },
        {
            id: "dec_m3",
            type: "mcq",
            question: "What must a decorator function RETURN?",
            options: { A: "None", B: "A new function (the wrapper)", C: "A string", D: "An integer" },
            correctAnswer: "B",
            explanation: "A decorator returns a reference to the wrapper function which replaces the original function.",
            hint: "What would the 'wrapper' need to be for the code to still run?",
            xpReward: 30
        },
        {
            id: "dec_m4",
            type: "mcq",
            question: "Can you stack multiple decorators (e.g., @log then @time) on one function?",
            options: { A: "Yes, they run from top to bottom", B: "No, only one allowed", C: "Only if they have the same name", D: "Only in Python 2" },
            correctAnswer: "A",
            explanation: "Decorators can be stacked. They are applied 'inside out' (bottom to top), meaning the top one wraps the result of the one below it.",
            hint: "Think about order: if you put on a sweater then a jacket, which one 'wraps' the other?",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "dec_c1",
            type: "mission_task",
            question: "MISSION: Apply the `@hero` decorator to the `fly` function.",
            expectedOutput: "Super Fly",
            codeTask: "def hero(func):\n    def wrapper():\n        print('Super', end=' ')\n        func()\n    return wrapper\n\n# Apply @hero to the function below\ndef fly():\n    print('Fly')\n\nfly()",
            hint: "Place the decorator symbol and the name 'hero' on the line immediately above 'def fly()'.",
            explanation: "The decorator intercepted the call and added 'Super' before 'Fly'.",
            learningGoals: "User must apply a decorator using @ syntax.",
            requiredConcepts: ["@hero", "fly()"],
            regexCheck: /@hero\s*\n\s*def\s+fly/,
            xpReward: 70
        },
        {
            id: "dec_c2",
            type: "mission_task",
            question: "MISSION: Create a basic decorator `bold` that prints '<b>' before calling the function.",
            expectedOutput: "<b>\nHello",
            codeTask: "def bold(func):\n    def wrapper():\n        # MISSION: Print <b> then call func\n        \n        pass\n    return wrapper\n\n@bold\ndef hi(): print('Hello')\nhi()",
            hint: "Inside 'wrapper', first use print('<b>'), then call the original function using its parameter name.",
            explanation: "Correct! The wrapper function is where the 'extra' behavior lives.",
            learningGoals: "User must implement a basic decorator pattern.",
            requiredConcepts: ["def", "wrapper", "print('<b>')", "func()", "return wrapper"],
            regexCheck: /def\s+wrapper\s*\(\s*\):\s*(?:\n\s*|\s+)print\s*\(\s*['"]<b>['"]\s*\)\s*(?:\n\s*|\s+)func\s*\(\s*\)\s*(?:\n\s*|\s+)return\s+wrapper/,
            xpReward: 70
        },
        {
            id: "dec_c3",
            type: "mission_task",
            question: "MISSION: Create a decorator `shout` that prints the function's result in ALL CAPS. (Simulation: Print 'WOW').",
            expectedOutput: "WOW",
            codeTask: "def shout(func):\n    def wrapper():\n        # MISSION: Get result from func(), make it upper case, and print it\n        pass\n    return wrapper\n\n@shout\ndef message(): return 'wow'\n\nmessage()",
            hint: "Call func() inside the wrapper, store it, use .upper() on it, then print.",
            explanation: "Decorators can manipulate the return values of functions too!",
            learningGoals: "User must understand result manipulation in decorators.",
            requiredConcepts: [".upper()", "print", "func()"],
            regexCheck: /print\s*\(.*\.upper\s*\(\s*\)\s*\)/,
            xpReward: 70
        },
        {
            id: "dec_c4",
            type: "mission_task",
            question: "MISSION: Pass arguments to a decorated function. Use `*args, **kwargs` in the wrapper.",
            expectedOutput: "3",
            codeTask: "def log(func):\n    def wrapper(*args, **kwargs):\n        # MISSION: Return the result of func(*args, **kwargs)\n        pass\n    return wrapper\n\n@log\ndef add(a, b): return a + b\n\nprint(add(1, 2))",
            hint: "The wrapper acts as a middleman. It should take *args and **kwargs and pass them right through to func().",
            explanation: "Using *args and **kwargs makes your decorators universal, working for any function regardless of its parameters.",
            learningGoals: "User must use generic arguments in a decorator wrapper.",
            requiredConcepts: ["*args", "**kwargs", "return func(*args, **kwargs)"],
            regexCheck: /return\s+func\s*\(\s*\*args\s*,\s*\*\*kwargs\s*\)/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "dec_d1",
            type: "debugging",
            question: "REPAIR MISSION: The decorator is not returning the wrapper. Fix the return statement!",
            codeTask: "def debug(func):\n    def wrapper():\n        print('Called')\n        func()\n    # Fix this line:\n    return None\n\n@debug\ndef test(): pass\ntest()",
            expectedOutput: "Called",
            hint: "What should the 'debug' function return to make the decorator work? Hint: It's the function you defined inside it.",
            explanation: "Fixed! If a decorator doesn't return the wrapper, the decorated function becomes None.",
            errorType: "TypeError",
            xpReward: 75,
            learningGoals: "User must correctly return the wrapper function.",
            requiredConcepts: ["return wrapper"]
        },
        {
            id: "dec_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: The `@` symbol must be on the line immediately ABOVE the function definition. Move it!",
            codeTask: "def msg(): print('Hi')\n@hero\n\ndef hero(f): return f",
            expectedOutput: "Hi",
            hint: "Move the '@hero' line to the line right BEFORE the 'def msg()' line.",
            explanation: "Decorators apply to the function defined directly below them.",
            errorType: "SyntaxError",
            xpReward: 75,
            learningGoals: "User must fix decorator placement syntax.",
            requiredConcepts: ["@hero"]
        }
    ]
};

export const DECORATORS_QUESTION_BANK = {
    "Concept_Basics": DECORATORS_LEVEL_1.questions.filter(q => q.id.includes('dec_m1') || q.id.includes('dec_m2') || q.id.includes('dec_m3') || q.id.includes('dec_m4') || q.id.includes('dec_d2')),
    "Concept_Syntax": DECORATORS_LEVEL_1.questions.filter(q => q.id.includes('dec_c1') || q.id.includes('dec_c2') || q.id.includes('dec_c3') || q.id.includes('dec_c4') || q.id.includes('dec_d1'))
};
