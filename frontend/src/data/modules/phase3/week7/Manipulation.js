export const MANIPULATION_LEVEL_1 = {
    title: "Data Wrangler",
    passingScore: 300,
    questions: [
        // --- MCQs ---
        {
            id: "man_m1",
            type: "mcq",
            question: "What is Data Manipulation?",
            options: { A: "Falsifying data", B: "The process of changing data to make it more organized and easier to read", C: "Deleting random files", D: "Drawing charts from data" },
            correctAnswer: "B",
            explanation: "Manipulation involves grouping, sorting, merging, and pivoting to find insights.",
            hint: "Organizing for insights.",
            concepts: ["intro", "manipulation_goals"],
            xpReward: 30
        },
        {
            id: "man_m2",
            type: "mcq",
            question: "Which function joins two DataFrames together along an axis?",
            options: { A: "pd.join()", B: "pd.concat()", C: "pd.add()", D: "pd.link()" },
            correctAnswer: "B",
            explanation: "`pd.concat()` is the go-to function for stacking data vertically or horizontally.",
            hint: "Concatenate.",
            concepts: ["concatenation", "pandas_functions"],
            xpReward: 30
        },
        {
            id: "man_m3",
            type: "mcq",
            question: "What is the default type of join in `pd.merge()`?",
            options: { A: "outer", B: "inner", C: "left", D: "right" },
            correctAnswer: "B",
            explanation: "An 'inner' join keeps only the keys that exist in BOTH dataframes.",
            hint: "The intersection.",
            concepts: ["merging", "joins"],
            xpReward: 30
        },
        {
            id: "man_m4",
            type: "mcq",
            question: "What does `df.sort_values(by='X', ascending=False)` do?",
            options: { A: "Sorts the column X from lowest to highest", B: "Sorts the column X from highest to lowest", C: "Deletes the column X", D: "Filters out rows where X is False" },
            correctAnswer: "B",
            explanation: "`ascending=False` means the result will be in descending order (largest first).",
            hint: "Downwards.",
            concepts: ["sorting", "filtering"],
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "man_c1",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Group `df` by 'Category' and find the `.mean()`. Print 'Grouped'.",
            expectedOutput: "Grouped",
            codeTask: "# Import pandas and perform groupby below\n",
            hint: "import pandas as pd\ndf.groupby('Category').mean()\nprint('Grouped')",
            explanation: "Grouping allows you to see patterns across categories.",
            learningGoals: "User must use groupby() and mean().",
            requiredConcepts: ["import pandas as pd", "groupby(", ".mean(", "print"],
            concepts: ["grouping", "aggregation"],
            regexCheck: /\.groupby/,
            xpReward: 100
        },
        {
            id: "man_c2",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Merge `df1` and `df2` using `pd.merge()`. Print 'Merged'.",
            expectedOutput: "Merged",
            codeTask: "# Import pandas and perform pd.merge below\n",
            hint: "import pandas as pd\npd.merge(df1, df2)\nprint('Merged')",
            explanation: "Merging brings data together like JOIN in SQL.",
            learningGoals: "User must use pd.merge().",
            requiredConcepts: ["import pandas as pd", "pd.merge(", "print"],
            concepts: ["merging", "joins"],
            regexCheck: /pd\.merge/,
            xpReward: 100
        },
        {
            id: "man_c3",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Sort `df` by column 'S' from highest to lowest. Print `df`.",
            expectedOutput: "   S\n1  9\n0  5",
            codeTask: "import pandas as pd\ndf = pd.DataFrame({'S': [5, 9]})\n# Use sort_values below\n",
            hint: "print(df.sort_values(by='S', ascending=False))",
            explanation: "Correct! Sorting helps highlight top performers or outliers.",
            learningGoals: "User must sort data by a column.",
            requiredConcepts: ["import pandas as pd", "sort_values(", "ascending=False", "print"],
            concepts: ["sorting", "manipulation"],
            regexCheck: /ascending\s*=\s*False/,
            xpReward: 70
        },
        {
            id: "man_c4",
            type: "mission_task",
            question: "MISSION: Import pandas as pd. Concatenate `df1` and `df2` vertically using `pd.concat([df1, df2])`. Print the result.",
            expectedOutput: "   x\n0  1\n0  2",
            codeTask: "import pandas as pd\ndf1 = pd.DataFrame({'x': [1]})\ndf2 = pd.DataFrame({'x': [2]})\n# Concat and print below\n",
            hint: "print(pd.concat([df1, df2]))",
            explanation: "Concatenation stacks data neatly, making it easy to combine data from different files.",
            learningGoals: "User must concatenate dataframes.",
            requiredConcepts: ["import pandas as pd", "pd.concat(", "print"],
            concepts: ["concatenation", "manipulation"],
            regexCheck: /pd\.concat/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "man_d1",
            type: "debugging",
            question: "REPAIR MISSION: The code is trying to calculate a `mean` on a `groupby` object but forgot the parentheses `()`. Fix it!",
            codeTask: "import pandas as pd\ndf = pd.DataFrame({'C': ['A', 'A'], 'V': [1, 2]})\n# Add () to mean call:\nprint(df.groupby('C').mean)",
            expectedOutput: "   V\nC   \nA 1.5",
            hint: "Add () after .mean",
            explanation: "Fixed! Statistics on groups must be called as functions.",
            errorType: "TypeError",
            concepts: ["grouping", "debugging"],
            xpReward: 75,
            learningGoals: "User must fix method call syntax.",
            requiredConcepts: ["import pandas as pd", ".mean()"]
        },
        {
            id: "man_d2",
            type: "debugging",
            question: "LOGIC REPAIR: You are trying to merge on column 'ID', but one dataframe has 'id' (lowercase). Fix the column name in `df2`!",
            codeTask: "import pandas as pd\ndf1 = pd.DataFrame({'ID': [1]})\ndf2 = pd.DataFrame({'id': [1], 'v': [10]})\n# Fix the ID key and merge:\nprint(pd.merge(df1, df2, on='ID'))",
            expectedOutput: "   ID   v\n0   1  10",
            hint: "Change {'id': [1]} to {'ID': [1]}",
            explanation: "Pandas is case-sensitive. Column names must match exactly for simple merges on a common key.",
            errorType: "KeyError",
            concepts: ["merging", "debugging"],
            xpReward: 75,
            learningGoals: "User must fix case-sensitivity in column names.",
            requiredConcepts: ["import pandas as pd", "'ID': [1]"]
        }
    ]
};

export const MANIPULATION_QUESTION_BANK = {
    "Concept_Group": MANIPULATION_LEVEL_1.questions.filter(q => q.id.includes('man_m1') || q.id.includes('man_c1') || q.id.includes('man_d1')),
    "Concept_Merge": MANIPULATION_LEVEL_1.questions.filter(q => q.id.includes('man_m2') || q.id.includes('man_m3') || q.id.includes('man_c2') || q.id.includes('man_c4') || q.id.includes('man_d2')),
    "Concept_Sort": MANIPULATION_LEVEL_1.questions.filter(q => q.id.includes('man_m4') || q.id.includes('man_c3'))
};
