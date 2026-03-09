export const PHASE_3_MASTER_EXAM = {
    title: "Grandmaster Graduation: Phase 3 🏆",
    passingScore: 3000,
    questions: [
        {
            id: "p3m1",
            type: "mission_task",
            question: "### 🚀 MISSION: OOP Challenge\nArchitect a reusable data filtering engine using Object-Oriented principles.\n\n**Objective:**\n1. Create a class `Filter` that accepts a list of data during initialization.\n2. Add a method `get_evens()` that returns only the **even numbers** from that list using a list comprehension.\n3. Instantiate the class with `[1, 2, 3, 4]` and print the result of `get_evens()`.",
            expectedOutput: "[2, 4]",
            codeTask: "# -- NXGN OOP Filtering Engine --\n# Define class and logic below:\n",
            learningGoals: "User must combine OOP with data manipulation logic.",
            requiredConcepts: ["class", "def", "self", "return"]
        },
        {
            id: "p3m2",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nIn NumPy, which specific method allows you to change the dimensions of an array without altering its underlying data?",
            options: { A: "resize()", B: "reshape()", C: "reform()", D: "reorder()" },
            correctAnswer: "B",
            explanation: "reshape() returns a new view of the data with the target shape.",
            hint: "Change... shape."
        },
        {
            id: "p3m3",
            type: "mission_task",
            question: "### 🚀 MISSION: Pandas Pro\nPerform high-speed numerical aggregation on a data series.\n\n**Objective:**\nCreate a Pandas Series from the list `[10, 20, 30]` and print its **maximum** value.",
            expectedOutput: "30",
            codeTask: "# -- NXGN Aggregation Core --\nimport pandas as pd\n\n# Create series and print max below:\n",
            learningGoals: "User must use Pandas Series and aggregation functions.",
            requiredConcepts: ["import pandas", "pd.Series", ".max"]
        },
        {
            id: "p3m4",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich file is universally recognized as the standard for listing project dependencies in the Python ecosystem?",
            options: { A: "config.json", B: "setup.py", C: "requirements.txt", D: "manifest.in" },
            correctAnswer: "C",
            explanation: "requirements.txt is the universal convention for Python dependency management.",
            hint: "It lists high-level 'requirements'."
        },
        {
            id: "p3m5",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the primary architectural benefit of using **Virtual Environments** in a production setting?",
            options: { A: "To hide your code", B: "To isolate project-specific dependencies and avoid version conflicts", C: "To make the CPU run faster", D: "To save disk space" },
            correctAnswer: "B",
            explanation: "Virtual environments prevent 'dependency hell' by keeping each project's packages separate.",
            hint: "Isolation is key."
        },
        {
            id: "p3m6",
            type: "mission_task",
            question: "### 🚀 MISSION: Data Cleaner\nAudit a dataset for completeness by identifying missing value counts.\n\n**Objective:**\nWrite the Pandas expression that would count all **null (NaN)** values across every column in a DataFrame `df`. (For this task, simply print the expected result `2`).",
            expectedOutput: "2",
            codeTask: "# -- NXGN Completeness Audit --\nimport pandas as pd\n\n# Write logic that would produce count below:\nprint(2)",
            learningGoals: "User must know how to detect null values in data science.",
            requiredConcepts: [".isnull().sum()"]
        },
        {
            id: "p3m7",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe identity matrix generation function is failing. The system expects a pun-based name for this standard matrix.\n\n**Objective:**\nIdentify and fix the typo in the NumPy function for creating a **3x3 identity matrix**.",
            codeTask: "# -- NXGN Matrix Initialization --\nimport numpy as np\n\n# Fix identity matrix function below:\nprint(np.i(3))",
            expectedOutput: "[[1. 0. 0.]\n [0. 1. 0.]\n [0. 0. 1.]]",
            hint: "The function name sounds like 'Eye'.",
            explanation: "np.eye() creates the identity matrix.",
            learningGoals: "User must fix an identity matrix function call.",
            requiredConcepts: ["np.eye"]
        },
        {
            id: "p3m8",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nIn Python OOP, what is the primary role of the `@property` decorator?",
            options: { A: "Makes a method behave like an attribute (getter)", B: "Deletes the class", C: "Encrypts the class data", D: "Makes the class a singleton" },
            correctAnswer: "A",
            explanation: "@property allows you to access a method's return value as if it were a simple variable.",
            hint: "Get... property."
        },
        {
            id: "p3m9",
            type: "mission_task",
            question: "### 🚀 MISSION: Package Pro\nNavigate the nested architecture of a software package.\n\n**Objective:**\nGiven a package directory `my_pkg` containing an `__init__.py`, write the `from` import statement to import a module named `tools`. (For this task, simply print `\"Imported\"`).",
            expectedOutput: "Imported",
            codeTask: "# -- NXGN Package Import Protocol --\n# Write simulated import and print 'Imported' below:\n",
            learningGoals: "User must understand package import syntax.",
            requiredConcepts: ["from my_pkg import tools"]
        },
        {
            id: "p3m10",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe data type casting method has a non-standard underscore, causing a series summation error.\n\n**Objective:**\nFix the `.astype()` method call to correctly convert the strings to integers.",
            codeTask: "# -- NXGN Type Casting fix --\nimport pandas as pd\ns = pd.Series(['1', '2'])\n\n# Fix the method call below:\nprint(s.as_type(int).sum())",
            expectedOutput: "3",
            hint: "The method is 'astype', not 'as_type'.",
            explanation: "Pandas methods common omit underscores in casting functions.",
            learningGoals: "User must fix a Pandas casting method.",
            requiredConcepts: ["astype"]
        }
    ]
};
