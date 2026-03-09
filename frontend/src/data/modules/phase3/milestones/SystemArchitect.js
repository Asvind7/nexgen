export const SYSTEM_ARCHITECT_EXAM = {
    title: "System Architect Certification 🏛️",
    passingScore: 800,
    questions: [
        {
            id: "sa1",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich fundamental OOP concept allows a sub-class to automatically acquire the properties and behaviors of its super-class?",
            options: { A: "Encapsulation", B: "Inheritance", C: "Polymorphism", D: "Abstraction" },
            correctAnswer: "B",
            explanation: "Inheritance allows hierarchy and reusability.",
            concepts: ["inheritance", "oop_fundamentals"],
            hint: "Family trees have this."
        },
        {
            id: "sa2",
            type: "mission_task",
            question: "### 🚀 MISSION: Exception Architect\nBuild a resilient bridge over a dangerous numerical void.\n\n**Objective:**\nWrap the code `x = 10 / 0` in a `try/except` block. Specifically catch the `ZeroDivisionError` and print the string `\"Safe\"` when it occurs.",
            expectedOutput: "Safe",
            codeTask: "# -- NXGN Runtime Guard --\n# Add try/except block below:\n",
            explanation: "Specific exception handling is better than broad catches.",
            concepts: ["exceptions", "error_handling"],
            learningGoals: "User must identify and catch a specific Python exception.",
            requiredConcepts: ["try:", "except ZeroDivisionError:", "print('Safe')"]
        },
        {
            id: "sa3",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nIn Python, what is the standard naming convention used to signal that an attribute of a class is intended to be **'private'**?",
            options: { A: "_var", B: "__var", C: "private_var", D: "self.var" },
            correctAnswer: "B",
            explanation: "Double underscores `__` trigger name mangling in Python, making the variable harder to access from outside the class.",
            concepts: ["encapsulation", "privacy"],
            hint: "Two is stronger than one."
        },
        {
            id: "sa4",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat is the primary function of the `super()` keyword when used inside a child class constructor?",
            options: { A: "Deletes the current object", B: "Calls the constructor of the parent class", C: "Creates a new superuser", D: "Resets all variables" },
            correctAnswer: "B",
            explanation: "super() gives access to parent methods, commonly used to initialize parent state in a child constructor.",
            concepts: ["super_function", "constructors"],
            hint: "Think 'Superman'... but for parents."
        },
        {
            id: "sa5",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhat exactly is **'Multiple Inheritance'** in the context of Python architecture?",
            options: { A: "Python does not support it", B: "A class can inherit from multiple parent classes", C: "Only 2 parents are allowed", D: "It always causes errors" },
            correctAnswer: "B",
            explanation: "Python supports inheriting from multiple classes, using Method Resolution Order (MRO) to find attributes.",
            concepts: ["multiple_inheritance", "mro"],
            hint: "Duck(Bird, Swimmer)"
        },
        {
            id: "sa6",
            type: "mission_task",
            question: "### 🚀 MISSION: Polymorphic Car\nOverride core engine behaviors to support eco-friendly transport protocols.\n\n**Objective:**\n1. Define an `ElectricCar` class that inherits from `Car`.\n2. Override the `drive()` method so it prints the string `\"Silent Drive\"` instead of the default sound.",
            expectedOutput: "Silent Drive",
            codeTask: "# -- NXGN Vehicle Systems --\nclass Car:\n    def drive(self):\n        print('Vroom')\n\n# Define ElectricCar child class below:\n",
            explanation: "Exactly. Method overriding allows specialized behavior for child classes.",
            concepts: ["method_overriding", "specialization"],
            requiredConcepts: ["class ElectricCar(Car):", "def drive", "Silent Drive"]
        },
        {
            id: "sa7",
            type: "mission_task",
            question: "### 🚀 MISSION: Interface Master\nCommand a fleet of varied vehicles using a single unified interface.\n\n**Objective:**\nLoop through the list `objs` and call the `.start()` method on each object inside the loop.",
            expectedOutput: "Start\nStart",
            codeTask: "# -- NXGN Fleet Command --\nclass Car: def start(self): print('Start')\nclass Bike: def start(self): print('Start')\nobjs = [Car(), Bike()]\n\n# Loop and call start() below:\n",
            explanation: "Nice! Methods allow objects to perform actions.",
            concepts: ["polymorphism", "interfaces"],
            requiredConcepts: ["for", "in", ".start()"]
        },
        {
            id: "sa8",
            type: "mission_task",
            question: "### 🚀 MISSION: Magic Math\nEnable direct mathematical operations between custom objects using magic methods.\n\n**Objective:**\nImplement the `__add__` magic method in the `Point` class so that adding two Point objects returns the **sum of their x-coordinates**.",
            expectedOutput: "30",
            codeTask: "# -- NXGN Vector Core --\nclass Point:\n    def __init__(self, x): self.x = x\n\n    # Implement __add__ below:\n",
            explanation: "Operator overloading makes your classes feel like built-in types.",
            concepts: ["magic_methods", "operator_overloading"],
            requiredConcepts: ["def __add__", "return", "self.x", "other.x"]
        },
        {
            id: "sa9",
            type: "debugging",
            question: "### 🛠️ BUG HUNTER\nThe constructor for this class is failing because it's missing the mandatory instance reference.\n\n**Objective:**\nAdd `self` to the constructor arguments and update the body so the attributes are correctly assigned to the instance.",
            codeTask: "# -- NXGN Identity Matrix --\nclass Person:\n    def __init__(name, age):\n        # Fix constructor below:\n        name = name\n        age = age",
            expectedOutput: "",
            hint: "Add self as the first argument.",
            explanation: "All instance methods in Python must take 'self' as the first argument.",
            concepts: ["self_parameter", "debugging"],
            requiredConcepts: ["self", "self.name = name"]
        },
        {
            id: "sa10",
            type: "mcq",
            question: "### 🧠 MENTAL COMPILER\nWhich special method name is used to define the **Constructor** in a Python class?",
            options: { A: "__start__", B: "__init__", C: "new()", D: "create()" },
            correctAnswer: "B",
            explanation: "__init__ is called when an object is instantiated.",
            concepts: ["constructors", "magic_methods"],
            hint: "It stands for initialize."
        }
    ]
};
