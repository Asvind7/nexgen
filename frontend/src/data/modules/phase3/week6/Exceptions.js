export const EXCEPTIONS_LEVEL_1 = {
    title: "Safety Net",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "exc_m1",
            type: "mcq",
            question: "What block catches errors?",
            options: { A: "try...catch", B: "try...except", C: "attempt...rescue", D: "catch...finally" },
            correctAnswer: "B",
            explanation: "Python uses `try` to wrap risky code and `except` to handle errors if they occur.",
            hint: "Try to do it, except if it fails.",
            concepts: ["intro", "syntax"],
            xpReward: 30
        },
        {
            id: "exc_m2",
            type: "mcq",
            question: "When does the `finally` block run?",
            options: { A: "Only if an error occurs", B: "Only if NO error occurs", C: "Always, no matter what", D: "Only in Python 3" },
            correctAnswer: "C",
            explanation: "`finally` is for cleanup code that must run regardless of success or failure.",
            hint: "It's the final word.",
            concepts: ["finally", "resource_management"],
            xpReward: 30
        },
        {
            id: "exc_m3",
            type: "mcq",
            question: "Which keyword is used to manually trigger an exception?",
            options: { A: "throw", B: "raise", C: "trigger", D: "signal" },
            correctAnswer: "B",
            explanation: "In Python, you use the `raise` keyword to signal that an error has occurred.",
            hint: "Raise the flag.",
            concepts: ["raise", "custom_errors"],
            xpReward: 30
        },
        {
            id: "exc_m4",
            type: "mcq",
            question: "What is an `AssertionError`?",
            options: { A: "A network error", B: "An error raised when an `assert` statement fails", C: "A syntax error", D: "A type mismatch error" },
            correctAnswer: "B",
            explanation: "`assert` is used for internal debugging. If the condition is False, an AssertionError is raised.",
            hint: "It comes from the assert keyword.",
            concepts: ["assertions", "debugging"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "exc_c1",
            type: "mission_task",
            question: "MISSION: Wrap `1 / 0` in a try-except block to catch `ZeroDivisionError` and print 'Caught'.",
            expectedOutput: "Caught",
            codeTask: "# Write the try-except logic below\n",
            hint: "try:\n    1/0\nexcept ZeroDivisionError:\n    print('Caught')",
            explanation: "You safely handled a crash! This makes your programs robust.",
            learningGoals: "User must catch a specific exception.",
            requiredConcepts: ["try:", "except ZeroDivisionError:", "print"],
            concepts: ["try_except", "division"],
            regexCheck: /except\s+ZeroDivisionError\s*:/,
            xpReward: 70
        },
        {
            id: "exc_c2",
            type: "mission_task",
            question: "MISSION: Define a custom exception `MyError` inheriting from `Exception`. Raise it with 'Error Raised'.",
            expectedOutput: "Error Raised",
            codeTask: "# Define the class and raise it below\n",
            hint: "class MyError(Exception): pass\nraise MyError('Error Raised')",
            explanation: "Custom exceptions help specific error handling in larger apps.",
            learningGoals: "User must define and raise a custom exception.",
            requiredConcepts: ["class MyError(Exception):", "raise MyError("],
            concepts: ["custom_exceptions", "oop"],
            regexCheck: /raise\s+MyError/,
            xpReward: 70
        },
        {
            id: "exc_c3",
            type: "mission_task",
            question: "MISSION: Use `try-except-else`. Print 'Success' ONLY if no error occurs in `x = 10`.",
            expectedOutput: "Success",
            codeTask: "try:\n    x = 10\nexcept:\n    print('Fail')\n# Add the else block below\n",
            hint: "else:\n    print('Success')",
            explanation: "The `else` block runs only if the `try` block was successful.",
            learningGoals: "User must use the else block in exception handling.",
            requiredConcepts: ["else:", "print('Success')"],
            concepts: ["flow_control", "edge_cases"],
            regexCheck: /else\s*:/,
            xpReward: 70
        },
        {
            id: "exc_c4",
            type: "mission_task",
            question: "MISSION: Catch a `ValueError` caused by `int('abc')`. Print 'Invalid'.",
            expectedOutput: "Invalid",
            codeTask: "try:\n    n = int('abc')\n# Catch the ValueError below\n",
            hint: "except ValueError:\n    print('Invalid')",
            explanation: "Specific catches are better than generic ones.",
            learningGoals: "User must catch a specific data conversion error.",
            requiredConcepts: ["except ValueError:", "print('Invalid')"],
            concepts: ["try_except", "type_conversion"],
            regexCheck: /except\s+ValueError/,
            xpReward: 70
        },
        // --- Debugging ---
        {
            id: "exc_d1",
            type: "debugging",
            question: "REPAIR MISSION: The `except` block is missing the colon. Fix the syntax!",
            codeTask: "try:\n    x = 5 / 0\nexcept ZeroDivisionError\n    print('Zero')",
            expectedOutput: "Zero",
            hint: "Add : after ZeroDivisionError",
            explanation: "Fixed! Blocks in try-except need colons.",
            errorType: "SyntaxError",
            concepts: ["syntax", "debugging"],
            xpReward: 75,
            learningGoals: "User must fix a missing colon in an except block.",
            requiredConcepts: ["except ZeroDivisionError:"]
        },
        {
            id: "exc_d2",
            type: "debugging",
            question: "LOGIC REPAIR: The code tries to catch a `KeyboardInterrupt` but uses the wrong name `KeyInterrupt`. Fix it!",
            codeTask: "try:\n    x = 1\n# Fix the exception name below:\nexcept KeyInterrupt:\n    print('Stop')",
            expectedOutput: "",
            hint: "The correct name is KeyboardInterrupt.",
            explanation: "Exception names are specific. KeyboardInterrupt is the standard name.",
            errorType: "NameError",
            concepts: ["exception_names", "debugging"],
            xpReward: 75,
            learningGoals: "User must use the correct built-in name.",
            requiredConcepts: ["except KeyboardInterrupt:"]
        }
    ]
};

export const EXCEPTIONS_QUESTION_BANK = {
    "Concept_TryExcept": EXCEPTIONS_LEVEL_1.questions.filter(q => q.id.includes('exc_m1') || q.id.includes('exc_c1') || q.id.includes('exc_c4') || q.id.includes('exc_d1') || q.id.includes('exc_d2')),
    "Concept_Custom": EXCEPTIONS_LEVEL_1.questions.filter(q => q.id.includes('exc_c2') || q.id.includes('exc_m3')),
    "Concept_Flow": EXCEPTIONS_LEVEL_1.questions.filter(q => q.id.includes('exc_m2') || q.id.includes('exc_m4') || q.id.includes('exc_c3'))
};
