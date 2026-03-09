export const INHERITANCE_LEVEL_1 = {
    title: "Family Trees",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "inh_m1",
            type: "mcq",
            question: "What is Inheritance in Python?",
            options: { A: "Creating a new class from scratch", B: "Creating a class that takes properties from another class", C: "Deleting a class", D: "Moving a class to another file" },
            correctAnswer: "B",
            explanation: "Inheritance allows a 'child' class to reuse logic from a 'parent' class, avoiding code duplication.",
            concepts: ["inheritance", "oop_fundamentals"],
            hint: "Like inheriting traits from parents.",
            xpReward: 30
        },
        {
            id: "inh_m2",
            type: "mcq",
            question: "Which function is used to call a method from the parent class?",
            options: { A: "parent()", B: "super()", C: "base()", D: "this()" },
            correctAnswer: "B",
            explanation: "`super()` returns a proxy object that delegates method calls to the parent class.",
            concepts: ["super_function", "methods"],
            hint: "Superman helps his parents.",
            xpReward: 30
        },
        {
            id: "inh_m3",
            type: "mcq",
            question: "What is Method Overriding?",
            options: { A: "Adding a new method", B: "Redefining a parent's method in the child class", C: "Calling a method twice", D: "Overloading a method with different types" },
            correctAnswer: "B",
            explanation: "When a child class provides its own implementation of a method that is already defined in the parent class, it's called method overriding.",
            concepts: ["overriding", "polymorphism"],
            hint: "The child replaces the parent's version of a method.",
            xpReward: 30
        },
        {
            id: "inh_m4",
            type: "mcq",
            question: "In Python, can a child class inherit from multiple parent classes?",
            options: { A: "No, only single inheritance is allowed", B: "Yes, Python supports multiple inheritance", C: "Only with a special plugin", D: "Only if parents have no common methods" },
            correctAnswer: "B",
            explanation: "Python supports multiple inheritance: `class Child(Parent1, Parent2):`",
            concepts: ["multiple_inheritance", "oop"],
            hint: "Python is generous with inheritance.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "inh_c1",
            type: "mission_task",
            question: "MISSION: Create a class `Car` and a child class `ElectricCar` that inherits from it.",
            expectedOutput: "",
            codeTask: "class Car: pass\n# Define ElectricCar child class here\n",
            hint: "Put the parent class name inside parentheses after the child class name.",
            explanation: "Great! Putting the parent class name in parentheses creates the relationship.",
            learningGoals: "User must define a child class with inheritance syntax.",
            requiredConcepts: ["class ElectricCar(Car)"],
            concepts: ["syntax", "inheritance"],
            regexCheck: /class\s+ElectricCar\s*\(\s*Car\s*\)/,
            xpReward: 70
        },
        {
            id: "inh_c2",
            type: "mission_task",
            question: "MISSION: In `ElectricCar`, override the `drive()` method to print 'Charging...'.",
            expectedOutput: "Charging...",
            codeTask: "class Car:\n    def drive(self): print('Vroom')\n\nclass ElectricCar(Car):\n    # Override drive() here\n    pass\n\ne = ElectricCar()\ne.drive()",
            hint: "Define a new 'def drive(self):' inside ElectricCar and add your print statement.",
            explanation: "Method overriding allows child classes to provide specialized behavior.",
            learningGoals: "User must override a parent method in the child class.",
            requiredConcepts: ["def drive", "self", "Charging..."],
            concepts: ["overriding", "specialization"],
            regexCheck: /def\s+drive\s*\(\s*self\s*\)/,
            xpReward: 70
        },
        {
            id: "inh_c3",
            type: "mission_task",
            question: "MISSION: Create an `Animal` class with a `speak()` method. Create `Dog(Animal)` that overrides `speak()` to print 'Woof'. Call both.",
            expectedOutput: "Animal Speaking\nWoof",
            codeTask: "class Animal:\n    def speak(self): print('Animal Speaking')\n\n# Create Dog inheriting Animal and override speak()\n\na = Animal()\na.speak()\nd = Dog()\nd.speak()",
            hint: "class Dog(Animal): and then def speak(self): print('Woof')",
            explanation: "This is polymorphism in action — same method name, different behaviors!",
            learningGoals: "User must demonstrate polymorphism through inheritance and method overriding.",
            requiredConcepts: ["class Dog(Animal)", "def speak", "Woof"],
            concepts: ["polymorphism", "overriding"],
            regexCheck: /class\s+Dog\s*\(\s*Animal\s*\)/,
            xpReward: 70
        },
        {
            id: "inh_c4",
            type: "mission_task",
            question: "MISSION: Use `super()` inside a `Manager(Employee)` child class `__init__` to call `Employee.__init__` which sets `self.name`. Then print `m.name`.",
            expectedOutput: "Alice",
            codeTask: "class Employee:\n    def __init__(self, name):\n        self.name = name\n\nclass Manager(Employee):\n    def __init__(self, name):\n        # Call parent __init__ using super()\n        pass\n\nm = Manager('Alice')\nprint(m.name)",
            hint: "super().__init__(name) passes the name argument to the parent constructor.",
            explanation: "Using `super()` ensures the parent's initialization logic runs inside the child.",
            learningGoals: "User must use super() to call the parent __init__ correctly.",
            requiredConcepts: ["super().__init__", "name"],
            concepts: ["super_function", "constructor_chaining"],
            regexCheck: /super\s*\(\s*\)\s*\.__init__/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "inh_d1",
            type: "debugging",
            question: "REPAIR MISSION: The `super()` call is missing parentheses. Fix it!",
            codeTask: "class Bird:\n    def __init__(self): print('Bird Ready')\n\nclass Eagle(Bird):\n    def __init__(self):\n        super.__init__() # Fix this\n        print('Eagle Fly')\n\ne = Eagle()",
            expectedOutput: "Bird Ready\nEagle Fly",
            hint: "Use super().__init__()",
            explanation: "Always use parentheses when calling `super()` to get the parent instance.",
            errorType: "AttributeError",
            concepts: ["super_function", "debugging"],
            xpReward: 75,
            requiredConcepts: ["super()."],
            learningGoals: "User must fix the syntax for calling the parent constructor."
        },
        {
            id: "inh_d2",
            type: "debugging",
            question: "LOGIC REPAIR: The child `Truck` class tries to inherit from `Car` but has a typo in the parent name. Fix it!",
            codeTask: "class Car:\n    def drive(self): print('Vroom')\n\nclass Truck(Carr):  # Fix typo\n    pass\n\nt = Truck()\nt.drive()",
            expectedOutput: "Vroom",
            hint: "Check the parent class name inside the parentheses (Carr → Car).",
            explanation: "Python raises a NameError if the parent class doesn't exist. Always verify spelling.",
            errorType: "NameError",
            concepts: ["syntax", "debugging"],
            xpReward: 75,
            requiredConcepts: ["class Truck(Car)"],
            learningGoals: "User must fix the parent class reference typo."
        }
    ]
};

export const INHERITANCE_QUESTION_BANK = {
    "Basics": INHERITANCE_LEVEL_1.questions.filter(q => q.id.includes('inh_m1') || q.id.includes('inh_c1')),
    "Advanced": INHERITANCE_LEVEL_1.questions.filter(q => q.id.includes('inh_m2') || q.id.includes('inh_m3') || q.id.includes('inh_c2') || q.id.includes('inh_d1')),
    "Super": INHERITANCE_LEVEL_1.questions.filter(q => q.id.includes('inh_c3') || q.id.includes('inh_c4') || q.id.includes('inh_m4') || q.id.includes('inh_d2'))
};
