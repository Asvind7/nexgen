export const DATA_CLEANING_LEVEL_1 = {
    title: "The Janitor",
    passingScore: 300,
    questions: [
        // --- MCQs ---
        {
            id: "clean_m1",
            type: "mcq",
            question: "What is the primary goal of Data Cleaning?",
            options: { A: "Making data look pretty", B: "Removing or fixing incorrect, corrupted, formatted, or incomplete data", C: "Creating new data from scratch", D: "Encrypting sensitive information" },
            correctAnswer: "B",
            explanation: "Cleaning ensures your analysis is based on accurate and reliable information.",
            hint: "Is it about the data's appearance, or its accuracy and completeness?",
            concepts: ["intro", "cleaning_goals"],
            xpReward: 30
        },
        {
            id: "clean_m2",
            type: "mcq",
            question: "How do you check for duplicate rows in a DataFrame `df`?",
            options: { A: "df.repeat()", B: "df.duplicated()", C: "df.check_twice()", D: "df.unique()" },
            correctAnswer: "B",
            explanation: "`.duplicated()` returns a boolean Series indicating which rows are repeats.",
            hint: "Which function looks for 'duplicates' of existing data?",
            concepts: ["duplicates", "checking"],
            xpReward: 30
        },
        {
            id: "clean_m3",
            type: "mcq",
            question: "What does `.isnull().sum()` tell you?",
            options: { A: "The total number of rows", B: "The count of missing values in each column", C: "The sum of all numbers in the data", D: "The names of empty columns" },
            correctAnswer: "B",
            explanation: "Combining .isnull() with .sum() is the standard way to find where data is missing.",
            hint: "If .isnull() finds them, which function would 'sum' them up?",
            concepts: ["missing_values", "counting"],
            xpReward: 30
        },
        {
            id: "clean_m4",
            type: "mcq",
            question: "When should you use `.drop_duplicates()`?",
            options: { A: "When you want to remove identical rows", B: "When you want to delete a whole column", C: "When you want to rename data", D: "When you want to reset the index" },
            correctAnswer: "A",
            explanation: "Cleaning often involves removing noisy, redundant rows.",
            hint: "If you found duplicates, which function would 'drop' them from the table?",
            concepts: ["duplicates", "removal"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "clean_c1",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Given `df`, drop rows with missing values using `.dropna()` and print 'Cleaned'.",
            expectedOutput: "Cleaned",
            codeTask: "# MISSION: Import pandas as pd, use .dropna() on df, and print 'Cleaned'\n",
            hint: "First import pandas, then call the dropna method on the df object, and finally print the confirmation string.",
            explanation: "Cleaning data is 80% of a Data Scientist's job!",
            learningGoals: "User must use dropna and mandatory imports.",
            requiredConcepts: ["import pandas as pd", ".dropna()", "print"],
            concepts: ["missing_values", "removal"],
            regexCheck: /\.dropna\s*\(\s*\)/,
            xpReward: 100
        },
        {
            id: "clean_c2",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Fill missing values in `df` with 0 using `.fillna(0)`. Print 'Filled'.",
            expectedOutput: "Filled",
            codeTask: "# MISSION: Import pandas as pd, fill nulls in df with 0 using .fillna(0), and print 'Filled'\n",
            expectedOutput: "Filled",
            hint: "You need to pass the replacement value (0) as an argument to the fillna method.",
            explanation: "Filling gaps prevents errors in later calculations.",
            learningGoals: "User must use fillna() logic.",
            requiredConcepts: ["import pandas as pd", "fillna(0)", "print"],
            concepts: ["missing_values", "filling"],
            regexCheck: /\.fillna\s*\(\s*0\s*\)/,
            xpReward: 100
        },
        {
            id: "clean_c3",
            type: "mission_task",
            question: "MISSION: Import pandas as pd and numpy as np. Identify total null values in `df` using `df.isnull().sum()`. Print the result.",
            expectedOutput: "A    1\ndtype: int64",
            codeTask: "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'A': [1, np.nan]})\n# MISSION: Identify total null values in df using .isnull().sum() and print it\n",
            hint: "Access the result of df.isnull() and then immediately call .sum() on it within a print statement.",
            explanation: "Exactly! This helps you decide if you should drop or fill the missing data.",
            learningGoals: "User must count null values.",
            requiredConcepts: ["import pandas as pd", "import numpy as np", ".isnull().sum()", "print"],
            concepts: ["missing_values", "counting"],
            regexCheck: /\.isnull\s*\(\s*\)\.sum\s*\(\s*\)/,
            xpReward: 70
        },
        {
            id: "clean_c4",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Replace values in a column. Replace 'M' with 'Male' in `df['G']`. Print `df`.",
            expectedOutput: "      G\n0  Male",
            codeTask: "import pandas as pd\ndf = pd.DataFrame({'G': ['M']})\n# MISSION: Replace 'M' with 'Male' in df['G'] and print df\n",
            hint: "Use the .replace() method on the column df['G']. Remember to assign the result back to df['G'] if you want the change to stick!",
            explanation: "Consistency is key to quality data analysis.",
            learningGoals: "User must replace specific values.",
            requiredConcepts: ["import pandas as pd", "df['G'].replace(", "print"],
            concepts: ["data_transformation", "replacement"],
            regexCheck: /\.replace\s*\(/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "clean_d1",
            type: "debugging",
            question: "REPAIR MISSION: This `dropna` is using an invalid axis. Fix it to drop columns by setting `axis=1`!",
            codeTask: "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'A': [1, np.nan], 'B': [2, 3]})\n# Fix axis to 1:\nprint(df.dropna(axis=2))",
            expectedOutput: "   B\n0  2\n1  3",
            hint: "Check the 'axis' parameter. In Pandas, axis=0 is rows and axis=1 is columns. Which one do you need?",
            explanation: "Fixed! axis=0 is for rows, axis=1 is for columns.",
            errorType: "ValueError",
            concepts: ["missing_values", "debugging"],
            xpReward: 75,
            learningGoals: "User must fix the axis parameter in dropna.",
            requiredConcepts: ["import pandas as pd", "axis=1"]
        },
        {
            id: "clean_d2",
            type: "debugging",
            question: "LOGIC REPAIR: You are trying to fill nulls but didn't provide a value. Fix `fillna()` to use 5.",
            codeTask: "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'x': [np.nan]})\n# Provide 5 to fillna:\nprint(df.fillna())",
            expectedOutput: "     x\n0  5.0",
            hint: "The fillna() function needs to know *what* to fill the gaps with. Pass the value '5' inside the parentheses.",
            explanation: "Fixed! You must provide the value to be used for replacement in fillna.",
            errorType: "TypeError",
            concepts: ["missing_values", "debugging"],
            xpReward: 75,
            learningGoals: "User must provide a value to fillna.",
            requiredConcepts: ["import pandas as pd", "fillna(5)"]
        }
    ]
};

export const DATA_CLEANING_QUESTION_BANK = {
    "Concept_Clean": DATA_CLEANING_LEVEL_1.questions.filter(q => q.id.includes('clean_m1') || q.id.includes('clean_c1') || q.id.includes('clean_d1')),
    "Concept_Nulls": DATA_CLEANING_LEVEL_1.questions.filter(q => q.id.includes('clean_m3') || q.id.includes('clean_c2') || q.id.includes('clean_c3') || q.id.includes('clean_d2')),
    "Concept_Rows": DATA_CLEANING_LEVEL_1.questions.filter(q => q.id.includes('clean_m2') || q.id.includes('clean_m4') || q.id.includes('clean_c4'))
};
