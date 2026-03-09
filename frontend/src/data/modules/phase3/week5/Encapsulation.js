export const ENCAPSULATION_LEVEL_1 = {
    title: "Secrets Kept",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "enc_m1",
            type: "mcq",
            question: "How do you make a variable private in Python?",
            options: { A: "private_var", B: "__var", C: "hidden.var", D: "@var" },
            correctAnswer: "B",
            explanation: "Prefixing a variable name with double underscores `__` triggers name mangling, making it harder to access from outside the class.",
            hint: "Two underscores are better than one if you want to keep secrets.",
            xpReward: 30
        },
        {
            id: "enc_m2",
            type: "mcq",
            question: "Why use Getters and Setters?",
            options: { A: "To control access and validation of data", B: "To make code longer", C: "To confuse hackers", D: "They are required by Python" },
            correctAnswer: "A",
            explanation: "Getters/Setters allow you to enforce rules (e.g., age cannot be negative) when someone tries to change a value.",
            hint: "Control and Validate.",
            xpReward: 30
        },
        {
            id: "enc_m3",
            type: "mcq",
            question: "What is 'Name Mangling' in Python?",
            options: { A: "A bug in the compiler", B: "Python changing __var to _ClassName__var internally", C: "Deleting a variable", D: "A security feature that encrypts code" },
            correctAnswer: "B",
            explanation: "Name mangling is what Python does to double-underscore variables to prevent name clashes in inheritance.",
            hint: "Python 'mangles' the name by adding the class name as a prefix.",
            xpReward: 30
        },
        {
            id: "enc_m4",
            type: "mcq",
            question: "Is data truly 'private' and inaccessible in Python?",
            options: { A: "Yes, it's strictly enforced", B: "No, it's just a convention (mangled names can still be accessed)", C: "Only in the standard library", D: "Only if using typed Python" },
            correctAnswer: "B",
            explanation: "Python follows the philosophy 'We are all consenting adults here'. Privacy is a hint, not a hard barrier.",
            hint: "Can you still find a hidden item if you know the secret internal name?",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "enc_c1",
            type: "mission_task",
            question: "MISSION: Create a class `Secret` with a private variable `__code` set to 1234. Try printing it directly (it should fail/error or be hidden).",
            expectedOutput: "",
            codeTask: "class Secret:\n    def __init__(self):\n        # MISSION: Create a private variable __code and set it to 1234\n        pass\n\ns = Secret()\n# MISSION: Try printing s.__code to see it fail\n",
            hint: "Prefix the variable name with two underscores: self.__your_variable_name.",
            explanation: "Trying to access `__code` directly raises an AttributeError. That's encapsulation at work!",
            learningGoals: "User must demonstrate private variable encapsulation (simulated).",
            requiredConcepts: ["self.__code", "print"],
            regexCheck: /self\.__code\s*=\s*1234/,
            xpReward: 70
        },
        {
            id: "enc_c2",
            type: "mission_task",
            question: "MISSION: Create a getter method `get_code(self)` that returns `__code`.",
            expectedOutput: "1234",
            codeTask: "class Secret:\n    def __init__(self):\n        self.__code = 1234\n    # MISSION: Define get_code(self) getter method here\n\ns = Secret()\nprint(s.get_code())",
            hint: "The getter should simply return the private variable using 'self.__variable_name'.",
            explanation: "Good job! You exposed the private data through a safe public method.",
            learningGoals: "User must define a getter method.",
            requiredConcepts: ["def get_code", "return self.__code"],
            regexCheck: /def\s+get_code\s*\(\s*self\s*\):\s*(?:\n\s*|\s+)return\s+self\.__code/,
            xpReward: 70
        },
        {
            id: "enc_c3",
            type: "mission_task",
            question: "MISSION: Create a setter method `set_age(self, val)` that only sets `self.__age` if `val > 0`.",
            expectedOutput: "25",
            codeTask: "class User:\n    def __init__(self): self.__age = 0\n    # MISSION: Define set_age(self, val) and only update if val > 0\n\nu = User()\nu.set_age(25)\nprint(u._User__age) # Access for simulation verify",
            hint: "Use an 'if' statement inside the setter to check the condition before assigning.",
            explanation: "Excellent. Setters allow you to validate data before it's saved.",
            learningGoals: "User must implement a setter with validation logic.",
            requiredConcepts: ["def set_age", "if val > 0", "self.__age = val"],
            regexCheck: /if\s+val\s*>\s*0\s*:\s*(?:\n\s*|\s+)self\.__age\s*=\s*val/,
            xpReward: 70
        },
        {
            id: "enc_c4",
            type: "mission_task",
            question: "MISSION: Create a read-only property `version` by defining `get_version(self)` without a setter.",
            expectedOutput: "1.0",
            codeTask: "class App:\n    def __init__(self): self.__v = '1.0'\n    # MISSION: Define get_version(self) getter here\n\na = App()\nprint(a.get_version())",
            hint: "A 'read-only' property has a getter but no setter. Just return the private variable.",
            explanation: "Read-only access is a core part of encapsulation - you prevent users from breaking internal state.",
            learningGoals: "User must implement a read-only accessor.",
            requiredConcepts: ["def get_version", "return self.__v"],
            regexCheck: /def\s+get_version\s*\(\s*self\s*\):\s*(?:\n\s*|\s+)return\s+self\.__v/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "enc_d1",
            type: "debugging",
            question: "REPAIR MISSION: This setter is trying to access a global variable instead of the object's private `__value`. Fix it!",
            codeTask: "class Vault:\n    def __init__(self): self.__value = 0\n    def set_value(self, v):\n        # Fix this line:\n        __value = v\n\nv = Vault()\nv.set_value(500)\nprint(v._Vault__value)",
            expectedOutput: "500",
            hint: "Instance variables require a certain keyword prefix to tell Python that the variable belongs to 'this' object.",
            explanation: "Fixed! You must always use self to access instance attributes, especially private ones.",
            errorType: "LogicError",
            xpReward: 75,
            learningGoals: "User must use self to correctly update an instance attribute.",
            requiredConcepts: ["self.__value"]
        },
        {
            id: "enc_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: The private variable is missing a dash or wait... it should be a double underscore. Fix it!",
            codeTask: "class Bank:\n    def __init__(self):\n        # We want it private:\n        self._balance = 100\n\nb = Bank()\nprint(b._Bank__balance)",
            expectedOutput: "100",
            hint: "To make a variable truly 'private' (or at least mangled), you need two underscores, not just one.",
            explanation: "Single underscore is 'protected' (convention), double underscore is 'private' (mangled).",
            errorType: "AttributeError",
            xpReward: 75,
            learningGoals: "User must fix a variable prefix to enable internal name mangling.",
            requiredConcepts: ["self.__balance"]
        }
    ]
};

export const ENCAPSULATION_QUESTION_BANK = {
    "Concept_Private": ENCAPSULATION_LEVEL_1.questions.filter(q => q.id.includes('enc_m1') || q.id.includes('enc_m3') || q.id.includes('enc_c1') || q.id.includes('enc_d2')),
    "Concept_Accessors": ENCAPSULATION_LEVEL_1.questions.filter(q => q.id.includes('enc_m2') || q.id.includes('enc_m4') || q.id.includes('enc_c2') || q.id.includes('enc_c3') || q.id.includes('enc_c4') || q.id.includes('enc_d1'))
};
