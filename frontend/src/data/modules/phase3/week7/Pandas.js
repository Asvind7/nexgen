export const PANDAS_LEVEL_1 = {
    title: "Data Frames",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "pd_m1",
            type: "mcq",
            question: "What is a DataFrame?",
            options: { A: "A 2D table of data with rows and columns", B: "A 3D cube", C: "A picture frame", D: "A list of strings" },
            correctAnswer: "A",
            explanation: "Think of a DataFrame like an Excel spreadsheet inside Python.",
            hint: "Spreadsheet style.",
            concepts: ["intro", "dataframes"],
            xpReward: 30
        },
        {
            id: "pd_m2",
            type: "mcq",
            question: "Which Pandas object represents a single column or a 1D array?",
            options: { A: "DataFrame", B: "Series", C: "Panel", D: "Vector" },
            correctAnswer: "B",
            explanation: "A Series is a one-dimensional labeled array. A DataFrame is essentially a collection of Series.",
            hint: "One dimension.",
            concepts: ["intro", "series"],
            xpReward: 30
        },
        {
            id: "pd_m3",
            type: "mcq",
            question: "How do you view the first 5 rows of a DataFrame `df`?",
            options: { A: "df.start()", B: "df.head()", C: "df.first()", D: "df.top()" },
            correctAnswer: "B",
            explanation: "`.head()` is the most common way to peek at your data.",
            hint: "The top of the body.",
            concepts: ["exploration", "methods"],
            xpReward: 30
        },
        {
            id: "pd_m4",
            type: "mcq",
            question: "How do you access a column named 'Price' in `df`?",
            options: { A: "df['Price']", B: "df.get('Price')", C: "Both A and B", D: "df.column('Price')" },
            correctAnswer: "C",
            explanation: "Pandas allows both bracket notation and the .get() method.",
            hint: "Multiple ways.",
            concepts: ["access", "indexing"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "pd_c1",
            type: "mission_task",
            question: "MISSION: Import pandas as pd and create a DataFrame from `{'col': [1, 2]}`. Print it.",
            expectedOutput: "   col\n0    1\n1    2",
            codeTask: "# Import pandas and create the DataFrame below\n",
            hint: "import pandas as pd\ndf = pd.DataFrame({'col': [1, 2]})\nprint(df)",
            explanation: "DataFrames are the workhorse of Pandas.",
            learningGoals: "User must create a Pandas DataFrame.",
            requiredConcepts: ["import pandas as pd", "pd.DataFrame(", "print"],
            concepts: ["dataframes", "creation"],
            regexCheck: /pd\.DataFrame/,
            xpReward: 70
        },
        {
            id: "pd_c2",
            type: "mission_task",
            question: "MISSION: Create a Series `s = pd.Series([10, 20])`. Print `s.mean()`.",
            expectedOutput: "15.0",
            codeTask: "# Create Series and print mean below\n",
            hint: "s = pd.Series([10, 20])\nprint(s.mean())",
            explanation: "Pandas makes statistics easy with built-in methods like .mean().",
            learningGoals: "User must calculate the mean of a Series.",
            requiredConcepts: ["Series(", ".mean(", "print"],
            concepts: ["series", "statistics"],
            regexCheck: /\.mean\s*\(\s*\)/,
            xpReward: 70
        },
        {
            id: "pd_c3",
            type: "mission_task",
            question: "MISSION: Filter `df` to show only rows where column 'A' is greater than 5. Print it.",
            expectedOutput: "   A\n0  6",
            codeTask: "import pandas as pd\ndf = pd.DataFrame({'A': [1, 6]})\n# Apply the filter below\n",
            hint: "print(df[df['A'] > 5])",
            explanation: "Boolean indexing is one of the most powerful features of Pandas.",
            learningGoals: "User must filter a DataFrame.",
            requiredConcepts: ["df[", "df['A']", "> 5", "print"],
            concepts: ["filtering", "indexing"],
            regexCheck: /df\[.*>.*5\]/,
            xpReward: 70
        },
        {
            id: "pd_c4",
            type: "mission_task",
            question: "MISSION: Add a new column 'B' to `df` with values `[10, 20]`. Print `df`.",
            expectedOutput: "   A   B\n0  1  10\n1  6  20",
            codeTask: "import pandas as pd\ndf = pd.DataFrame({'A': [1, 6]})\n# Add column 'B' below\n",
            hint: "df['B'] = [10, 20]\nprint(df)",
            explanation: "Adding columns is as simple as assigning values to a new key.",
            learningGoals: "User must add a column to a DataFrame.",
            requiredConcepts: ["df['B']", "=", "print"],
            concepts: ["manipulation", "columns"],
            regexCheck: /df\['B'\]\s*=/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "pd_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code is trying to import `pandas` but spelled it `pands`. Fix it!",
            codeTask: "import pands as pd\ndf = pd.DataFrame({'x': [1]})",
            expectedOutput: "",
            hint: "Correct the spelling to pandas.",
            explanation: "Fixed! Always double check your import spellings.",
            errorType: "ModuleNotFoundError",
            concepts: ["imports", "debugging"],
            xpReward: 75,
            learningGoals: "User must fix a typo in the import statement.",
            requiredConcepts: ["import pandas as pd"]
        },
        {
            id: "pd_d2",
            type: "debugging",
            question: "LOGIC REPAIR: You are trying to use `.head` as a property, but it's a method! Add parentheses.",
            codeTask: "import pandas as pd\ndf = pd.DataFrame({'x': [1, 2, 3]})\n# Add parentheses to head:\nprint(df.head)",
            expectedOutput: "   x\n0  1\n1  2\n2  3",
            hint: "Use df.head()",
            explanation: "Fixed! head() is a function call that returns the top rows.",
            errorType: "TypeError",
            concepts: ["methods", "debugging"],
            xpReward: 75,
            learningGoals: "User must add parentheses to a method call.",
            requiredConcepts: [".head()"]
        }
    ]
};

export const PANDAS_QUESTION_BANK = {
    "Concept_DataFrame": PANDAS_LEVEL_1.questions.filter(q => q.id.includes('pd_m1') || q.id.includes('pd_m3') || q.id.includes('pd_c1') || q.id.includes('pd_c3') || q.id.includes('pd_d2')),
    "Concept_Series": PANDAS_LEVEL_1.questions.filter(q => q.id.includes('pd_m2') || q.id.includes('pd_c2') || q.id.includes('pd_d1')),
    "Concept_Access": PANDAS_LEVEL_1.questions.filter(q => q.id.includes('pd_m4') || q.id.includes('pd_c4'))
};
