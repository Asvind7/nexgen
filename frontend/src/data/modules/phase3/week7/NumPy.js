export const NUMPY_LEVEL_1 = {
    title: "Numerical Python",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "np_m1",
            type: "mcq",
            question: "Why use NumPy over standard Python lists?",
            options: { A: "It's slower", B: "It's faster and uses less memory", C: "It's prettier", D: "It's built into basic Python" },
            correctAnswer: "B",
            explanation: "NumPy arrays are stored more efficiently in memory and support vectorized operations, making them much faster for math.",
            concepts: ["efficiency", "vectorization"],
            hint: "Python lists are flexible but slow. NumPy is specialized for speed and large datasets.",
            xpReward: 30
        },
        {
            id: "np_m2",
            type: "mcq",
            question: "How do you create a 1D NumPy array?",
            options: { A: "np.list([1, 2])", B: "np.array([1, 2])", C: "np.create([1, 2])", D: "np.to_array([1, 2])" },
            correctAnswer: "B",
            explanation: "The `np.array()` function converts a Python list or tuple into a NumPy array.",
            concepts: ["creation", "arrays"],
            hint: "What data structure does NumPy focus on? Use the function that shares that name.",
            xpReward: 30
        },
        {
            id: "np_m3",
            type: "mcq",
            question: "What does `arr.shape` return for a 1D array with 4 elements?",
            options: { A: "4", B: "(4,)", C: "[4]", D: "(4, 1)" },
            correctAnswer: "B",
            explanation: "`shape` returns a tuple showing the size of each dimension. For a 1D array, it's `(n,)`.",
            concepts: ["shape", "dimensions"],
            hint: "Shape is always a tuple, even for 1D arrays.",
            xpReward: 30
        },
        {
            id: "np_m4",
            type: "mcq",
            question: "Which function creates an array of evenly spaced numbers between 0 and 1?",
            options: { A: "np.range()", B: "np.linspace()", C: "np.spacing()", D: "np.divide()" },
            correctAnswer: "B",
            explanation: "`np.linspace(start, stop, num)` generates `num` evenly spaced values between `start` and `stop`.",
            concepts: ["linspace", "generation"],
            hint: "It's like a 'linear space' generator.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "np_c1",
            type: "mission_task",
            question: "MISSION: Import numpy as `np` and create an array `arr` with values `[10, 20, 30]`. Print the array.",
            expectedOutput: "[10 20 30]",
            codeTask: "# MISSION: Import numpy as np and create an array 'arr' with values [10, 20, 30]. Print it.\n",
            hint: "First, use 'import numpy as np'. Then, use 'np.array([list])' to create the object.",
            explanation: "Success! You've initialized your first NumPy array.",
            learningGoals: "User must import numpy with alias and create an array.",
            requiredConcepts: ["import numpy as np", "np.array", "print"],
            concepts: ["imports", "creation"],
            regexCheck: /import\s+numpy\s+as\s+np\s*(?:\n\s*|\s+).*np\.array/,
            xpReward: 70
        },
        {
            id: "np_c2",
            type: "mission_task",
            question: "MISSION: Create an array of 5 zeros using `np.zeros()`. Print the result.",
            expectedOutput: "[0. 0. 0. 0. 0.]",
            codeTask: "import numpy as np\n# MISSION: Create an array of 5 zeros using np.zeros() and print it\n",
            hint: "Pass the count (5) as an argument to np.zeros().",
            explanation: "Empty arrays like zeros/ones are great placeholders for data processing.",
            learningGoals: "User must use np.zeros() to create an initialized array.",
            requiredConcepts: ["np.zeros(5)", "print"],
            concepts: ["initialization", "methods"],
            regexCheck: /np\.zeros\s*\(\s*5\s*\)/,
            xpReward: 70
        },
        {
            id: "np_c3",
            type: "mission_task",
            question: "MISSION: Create a NumPy array `scores = [85, 92, 78, 96, 88]` and print its maximum value using `np.max()`.",
            expectedOutput: "96",
            codeTask: "import numpy as np\n# MISSION: Create the scores array and print np.max(scores)\n",
            hint: "Use np.max(your_array) or your_array.max().",
            explanation: "NumPy's statistical functions like max, min, mean work on entire arrays instantly.",
            learningGoals: "User must use np.max() to find the maximum value in an array.",
            requiredConcepts: ["import numpy as np", "np.array", "np.max", "print"],
            concepts: ["statistics", "aggregation"],
            regexCheck: /np\.max\s*\(/,
            xpReward: 70
        },
        {
            id: "np_c4",
            type: "mission_task",
            question: "MISSION: Create array `a = [1, 2, 3]` and array `b = [4, 5, 6]`. Print the result of element-wise addition `a + b`.",
            expectedOutput: "[5 7 9]",
            codeTask: "import numpy as np\n# MISSION: Create arrays a and b, add them and print result\n",
            hint: "NumPy overloads the + operator for element-wise math. Just use a + b directly.",
            explanation: "Vectorized operations in NumPy apply math to every element automatically without a loop.",
            learningGoals: "User must demonstrate vectorized addition with two NumPy arrays.",
            requiredConcepts: ["import numpy as np", "np.array", "print"],
            concepts: ["vectorization", "arithmetic"],
            regexCheck: /np\.array\s*\(\s*\[/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "np_d1",
            type: "debugging",
            question: "REPAIR MISSION: NumPy works with numbers, but you're trying to add a string to an array. Fix the code to use a number instead of '10'.",
            codeTask: "import numpy as np\narr = np.array([1, 2, 3])\n# Fix this to add a number, not a string:\nprint(arr + '10')",
            expectedOutput: "[11 12 13]",
            hint: "Python can't add a string and a number directly. How can you change '10' so it's a number?",
            explanation: "NumPy arrays are homogeneous, meaning all elements should typically be the same type (usually numbers).",
            errorType: "TypeError",
            concepts: ["types", "debugging"],
            xpReward: 75,
            requiredConcepts: ["import numpy as np", "10"],
            learningGoals: "User must correct a type mismatch in NumPy arithmetic."
        },
        {
            id: "np_d2",
            type: "debugging",
            question: "REPAIR MISSION: The code tries to get the shape of an array but calls `size` instead. Fix it to use the correct attribute.",
            codeTask: "import numpy as np\narr = np.array([10, 20, 30, 40])\n# Fix: should print the shape, not size\nprint(arr.size)",
            expectedOutput: "(4,)",
            hint: "Use `.shape` to get the dimension tuple, not `.size`.",
            explanation: "`.size` gives the total number of elements. `.shape` gives the dimensional structure as a tuple.",
            errorType: "WrongOutput",
            concepts: ["shape", "debugging"],
            xpReward: 75,
            requiredConcepts: ["import numpy as np", ".shape"],
            learningGoals: "User must distinguish between .size and .shape."
        }
    ]
};

export const NUMPY_QUESTION_BANK = {
    "Basics": NUMPY_LEVEL_1.questions.filter(q => q.id.includes('np_m1') || q.id.includes('np_c1')),
    "Methods": NUMPY_LEVEL_1.questions.filter(q => q.id.includes('np_m2') || q.id.includes('np_c2') || q.id.includes('np_m3')),
    "Statistics": NUMPY_LEVEL_1.questions.filter(q => q.id.includes('np_c3') || q.id.includes('np_m4')),
    "Vectorization": NUMPY_LEVEL_1.questions.filter(q => q.id.includes('np_c4')),
    "Debugging": NUMPY_LEVEL_1.questions.filter(q => q.id.includes('np_d1') || q.id.includes('np_d2'))
};
