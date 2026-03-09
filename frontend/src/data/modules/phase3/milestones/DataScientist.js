export const DATA_SCIENTIST_EXAM = {
    title: "NexGen Data Scientist 📊",
    passingScore: 1000,
    questions: [
        {
            id: "ds1",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nIn the Pandas library, which function is used to load a **CSV file** into a DataFrame?",
            options: { A: "pd.read_csv()", B: "pd.read_csv()", C: "pd.get_data()", D: "pd.load()" },
            correctAnswer: "A",
            explanation: "read_csv is the standard Pandas entry point for CSVs.",
            concepts: ["pandas", "io"],
            hint: "Read... CSV."
        },
        {
            id: "ds2",
            type: "mission_task",
            question: "### 🚀 MISSION: NumPy Master\nInitialize the mathematical core of your data processing unit.\n\n**Objective:**\n1. Import `numpy` as `np`.\n2. Create a NumPy array containing numbers **1 to 5**.\n3. Print the **mean** value of the array.",
            expectedOutput: "3.0",
            codeTask: "# -- NXGN NumPy Analytics --\n# Import np, create array [1-5], and print mean below:\n",
            explanation: "You created a NumPy array and calculated its average value.",
            learningGoals: "User must use numpy arrays and calculate mean.",
            concepts: ["numpy", "statistics"],
            requiredConcepts: ["import numpy as np", "np.array", ".mean()", "print"],
            hint: "Access the 'mean' attribute of the NumPy array using dot notation."
        },
        {
            id: "ds3",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich method is standard for previewing the **first 5 rows** of a Pandas DataFrame?",
            options: { A: "df.first()", B: "df.top()", C: "df.head()", D: "df.view()" },
            correctAnswer: "C",
            explanation: "head() is the standard method to preview the beginning of a dataset.",
            concepts: ["pandas", "inspection"],
            hint: "The opposite of 'tail'."
        },
        {
            id: "ds4",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nIn the NumPy library, what exactly does the `.shape` attribute return?",
            options: { A: "The colors of the array", B: "The dimensions of the array as a tuple", C: "The total number of elements", D: "The size in bytes" },
            correctAnswer: "B",
            explanation: "shape tells you how many rows and columns are in the array.",
            concepts: ["numpy", "metadata"],
            hint: "It describes the structure."
        },
        {
            id: "ds5",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich Pandas method is designed to safely handle or replace **missing (NaN)** values?",
            options: { A: "df.replace_null()", B: "df.fill_empty()", C: "df.fillna()", D: "df.fix()" },
            correctAnswer: "C",
            explanation: "fillna() allows you to replace missing data with a specific value or strategy.",
            concepts: ["pandas", "cleaning"],
            hint: "Fill... NA."
        },
        {
            id: "ds6",
            type: "mission_task",
            question: "### 🚀 MISSION: Pandas Filter\nExtract critical outliers from a structured dataset using boolean indexing.\n\n**Objective:**\nGiven the DataFrame `df`, print only the rows where the column `'val'` is **greater than 10**.",
            expectedOutput: "   val\n1   22",
            codeTask: "# -- NXGN Outlier Detection --\nimport pandas as pd\ndf = pd.DataFrame({'val': [1, 22, 5]})\n\n# Write filtering logic below:\n",
            explanation: "Boolean indexing is a key Pandas skill for filtering data.",
            learningGoals: "User must perform boolean indexing in Pandas.",
            concepts: ["pandas", "filtering"],
            requiredConcepts: ["import pandas as pd", "df[", "> 10", "print"],
            hint: "Use square brackets on df: df[df['val'] > 10] to filter the rows."
        },
        {
            id: "ds7",
            type: "mission_task",
            question: "### 🚀 MISSION: NumPy Reshape\nReconfigure array dimensions to prepare for matrix operations.\n\n**Objective:**\nCreate a NumPy array (import as `np`) of 4 numbers, **reshape** it to a `(2, 2)` matrix, and print its final `.shape`.",
            expectedOutput: "(2, 2)",
            codeTask: "# -- NXGN Matrix Reshaper --\n# Import np, create array, reshape, and print shape below:\n",
            explanation: "Array reshaping is vital for preparing data for machine learning models.",
            learningGoals: "User must understand array reshaping.",
            concepts: ["numpy", "transformation"],
            requiredConcepts: ["import numpy as np", ".reshape(2, 2)", ".shape", "print"],
            hint: "The .reshape() method takes a tuple as an argument. Then access the .shape attribute."
        },
        {
            id: "ds8",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThis visualization script uses a non-standard import alias, which violates NXGN coding standards.\n\n**Objective:**\nFix the import alias for `seaborn` to the industry standard `'sns'`, and print the alias name.",
            codeTask: "# -- NXGN Viz Standards --\nimport seaborn as sea \n\n# Fix alias and print below:\n",
            expectedOutput: "sns",
            hint: "Change 'sea' to 'sns' in the import line, then print the alias.",
            explanation: "Standard aliases make code readable for other data scientists.",
            learningGoals: "User must fix a non-standard import alias.",
            concepts: ["conventions", "imports"],
            requiredConcepts: ["import seaborn as sns", "print(sns)"]
        },
        {
            id: "ds9",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe array initialization function has a spelling error in the NumPy core call.\n\n**Objective:**\nIdentify and fix the typo in the function name for creating an array of zeros.",
            codeTask: "# -- NXGN Zero-Buffer Fix --\nimport numpy as np\n\n# Fix typo in function below:\nprint(np.zeroes(3))",
            expectedOutput: "[0. 0. 0.]",
            hint: "The function for creating zeros is spelled just like the number '0' followed by 's'.",
            explanation: "NumPy naming follows strict spelling.",
            learningGoals: "User must fix a NumPy function name.",
            concepts: ["numpy", "logic_errors"],
            requiredConcepts: ["np.zeros", "print"]
        },
        {
            id: "ds10",
            type: "mission_task",
            question: "### 🚀 MISSION: Data Cleaner\nQuantify the level of noise or missing data in a source Series.\n\n**Objective:**\nDetect and **count** the total number of null values in the Series `s`. Print the final count.",
            expectedOutput: "1",
            codeTask: "# -- NXGN Noise Auditor --\nimport pandas as pd\ns = pd.Series([1, None, 3])\n\n# Count nulls and print below:\n",
            explanation: "Missing value detection is the first step in any data pipeline.",
            learningGoals: "User must detect missing values using isnull() and sum().",
            concepts: ["pandas", "statistics"],
            requiredConcepts: ["import pandas as pd", "pd.Series", ".isnull().sum()", "print"],
            hint: "Chain .isnull() and .sum() to find the total number of missing entries."
        }
    ]
};
