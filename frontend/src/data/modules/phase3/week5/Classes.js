export const CLASSES_LEVEL_1 = {
    title: "Blueprint Basics",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "cls_m1",
            type: "mcq",
            question: "What is a Class in Python?",
            options: { A: "A function that runs automatically", B: "A blueprint for creating objects", C: "A list of strings", D: "A type of loop" },
            correctAnswer: "B",
            explanation: "Think of a class as a blueprint (like a cookie cutter) and an object as the actual item (the cookie) created from it.",
            concepts: ["oop_fundamentals", "classes"],
            hint: "Classes aren't the items themselves, but the plan for building them.",
            xpReward: 30
        },
        {
            id: "cls_m2",
            type: "mcq",
            question: "Which keyword is used to create a class?",
            options: { A: "def", B: "class", C: "object", D: "struct" },
            correctAnswer: "B",
            explanation: "The `class` keyword starts a class definition block.",
            concepts: ["syntax", "classes"],
            hint: "If you want to create a 'Class', which word should you use to start?",
            xpReward: 30
        },
        {
            id: "cls_m3",
            type: "mcq",
            question: "What is `self` in a Python class method?",
            options: { A: "A global variable", B: "A reference to the current object instance", C: "A keyword for loops", D: "An optional parameter" },
            correctAnswer: "B",
            explanation: "`self` lets each method know which specific object it belongs to. It's like the object pointing at itself.",
            concepts: ["self", "instances"],
            hint: "It refers to the object calling the method.",
            xpReward: 30
        },
        {
            id: "cls_m4",
            type: "mcq",
            question: "What is `__init__` also called?",
            options: { A: "Destructor", B: "Iterator", C: "Constructor", D: "Generator" },
            correctAnswer: "C",
            explanation: "`__init__` is Python's constructor — it runs automatically when you create a new object.",
            concepts: ["constructor", "init"],
            hint: "It INITializes the object.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "cls_c1",
            type: "mission_task",
            question: "MISSION: Create an empty class named `Robot`. Then create an object of it called `r1`.",
            expectedOutput: "",
            codeTask: "# MISSION: Create an empty class named 'Robot' and instantiate it as 'r1'\n",
            hint: "Class names usually start with a capital letter. Use 'pass' to keep a class empty if you're not adding methods yet.",
            explanation: "Success! You've defined a class and instantiated an object.",
            learningGoals: "User must define a class and instantiate it.",
            requiredConcepts: ["class Robot", "Robot()", "r1 ="],
            concepts: ["instantiation", "syntax"],
            regexCheck: /class\s+Robot\s*:(?:\n\s*|\s+)pass\s*(?:\n\s*|\s+)r1\s*=\s*Robot\s*\(\s*\)/,
            xpReward: 70
        },
        {
            id: "cls_c2",
            type: "mission_task",
            question: "MISSION: Add an `__init__` method to a `Dog` class that takes `name` and sets `self.name`. Create `Dog('Rex')` and print its name.",
            expectedOutput: "Rex",
            codeTask: "class Dog:\n    # MISSION: Add __init__ to set self.name = name\n    pass\n\nmy_dog = Dog('Rex')\nprint(my_dog.name)",
            hint: "The constructor method name starts and ends with DOUBLE underscores. Don't forget the 'self' parameter first!",
            explanation: "The `__init__` method (the constructor) is called automatically when you create a new object.",
            learningGoals: "User must implement a constructor with parameters.",
            requiredConcepts: ["def __init__", "self", "self.name = name"],
            concepts: ["constructors", "attributes"],
            regexCheck: /def\s+__init__\s*\(\s*self\s*,\s*name\s*\):\s*(?:\n\s*|\s+)self\.name\s*=\s*name/,
            xpReward: 70
        },
        {
            id: "cls_c3",
            type: "mission_task",
            question: "MISSION: Add a method `speak()` to a `Cat` class that prints 'Meow'. Create an object and call `speak()`.",
            expectedOutput: "Meow",
            codeTask: "class Cat:\n    # MISSION: Add a speak() method that prints 'Meow'\n    pass\n\nc = Cat()\nc.speak()",
            hint: "A method inside a class always needs 'self' as the first parameter: def speak(self):",
            explanation: "Methods are functions attached to a class. They define the behaviors of objects.",
            learningGoals: "User must define an instance method inside a class.",
            requiredConcepts: ["def speak(self)", "print", "Meow"],
            concepts: ["methods", "behavior"],
            regexCheck: /def\s+speak\s*\(\s*self\s*\)/,
            xpReward: 70
        },
        {
            id: "cls_c4",
            type: "mission_task",
            question: "MISSION: Create a `Circle` class with `__init__` taking `radius`. Add an `area()` method that prints `3.14 * radius * radius`. Create `Circle(5)` and call `area()`.",
            expectedOutput: "78.5",
            codeTask: "# Create Circle class with __init__(self, radius) and area() method\n\nc = Circle(5)\nc.area()",
            hint: "In area(), use self.radius to access the value stored in __init__.",
            explanation: "Attributes set in __init__ (like self.radius) can be used in any other method.",
            learningGoals: "User must use self.attribute in a method to compute something.",
            requiredConcepts: ["def __init__", "self.radius", "def area"],
            concepts: ["attributes", "methods", "self"],
            regexCheck: /self\.radius/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "cls_d1",
            type: "debugging",
            question: "REPAIR MISSION: The method `greet` is missing the `self` parameter. Fix it!",
            codeTask: "class Cat:\n    def greet(): # Fix this\n        print('Meow')\n\nc = Cat()\nc.greet()",
            expectedOutput: "Meow",
            hint: "Add 'self' inside the parentheses of greet().",
            explanation: "Instance methods in Python MUST take `self` as their first parameter to access the object.",
            errorType: "TypeError",
            concepts: ["self_parameter", "debugging"],
            xpReward: 75,
            requiredConcepts: ["def greet(self)"],
            learningGoals: "User must add the mandatory self parameter to a class method."
        },
        {
            id: "cls_d2",
            type: "debugging",
            question: "LOGIC REPAIR: The object `d` tries to access `d.name`, but the `__init__` sets `self.nam` (typo). Fix the attribute name!",
            codeTask: "class Dog:\n    def __init__(self, name):\n        self.nam = name  # Fix the typo\n\nd = Dog('Buddy')\nprint(d.name)",
            expectedOutput: "Buddy",
            hint: "Check the attribute name on the left of the = sign inside __init__.",
            explanation: "Attribute name typos cause AttributeError. self.name and self.nam are different names.",
            errorType: "AttributeError",
            concepts: ["attributes", "debugging"],
            xpReward: 75,
            requiredConcepts: ["self.name = name"],
            learningGoals: "User must fix a misspelled attribute name in __init__."
        }
    ]
};

export const CLASSES_QUESTION_BANK = {
    "Fundamentals": CLASSES_LEVEL_1.questions.filter(q => q.id.includes('cls_m1') || q.id.includes('cls_c1')),
    "Attributes": CLASSES_LEVEL_1.questions.filter(q => q.id.includes('cls_m2') || q.id.includes('cls_m4') || q.id.includes('cls_c2')),
    "Methods": CLASSES_LEVEL_1.questions.filter(q => q.id.includes('cls_m3') || q.id.includes('cls_c3') || q.id.includes('cls_c4')),
    "Debugging": CLASSES_LEVEL_1.questions.filter(q => q.id.includes('cls_d1') || q.id.includes('cls_d2'))
};
