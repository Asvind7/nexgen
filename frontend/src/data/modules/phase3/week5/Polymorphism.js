export const POLYMORPHISM_LEVEL_1 = {
    title: "Shape Shifters",
    passingScore: 500,
    questions: [
        // --- MCQs ---
        {
            id: "poly_m1",
            type: "mcq",
            question: "What is Polymorphism?",
            options: { A: "Many checks", B: "Many forms - different classes can share the same method name", C: "Multi-threading", D: "Inheriting everything" },
            correctAnswer: "B",
            explanation: "Polymorphism allows different objects (like Dog and Cat) to be treated as the same type (Animal) because they share method names (like speak).",
            hint: "Poly = structure, Morph = change/form.",
            xpReward: 30
        },
        {
            id: "poly_m2",
            type: "mcq",
            question: "If `Dog` and `Cat` both have a `speak()` method, what happens if you force `Dog` to override it?",
            options: { A: "It crashes", B: "The Dog's version runs", C: "The Cat's version runs", D: "Both run at once" },
            correctAnswer: "B",
            explanation: "Method Overriding means the child class replaces the parent's version of a method with its own.",
            hint: "The specific (Child) beats the generic (Parent).",
            xpReward: 30
        },
        {
            id: "poly_m3",
            type: "mcq",
            question: "What is the key benefit of Polymorphism in a large system?",
            options: { A: "It makes code run 10x faster", B: "It allows you to add new classes with the same interface without changing existing code", C: "It automatically fixes bugs", D: "It reduces memory usage" },
            correctAnswer: "B",
            explanation: "Polymorphism promotes extensibility and 'openness' to new types of data.",
            hint: "Think about modular growth.",
            xpReward: 30
        },
        {
            id: "poly_m4",
            type: "mcq",
            question: "Which built-in function is often used to demonstrate polymorphism with different container types (like list vs string)?",
            options: { A: "len()", B: "sum()", C: "max()", D: "type()" },
            correctAnswer: "A",
            explanation: "`len()` works on strings, lists, tuples, and dicts. It's a polymorphic function because it behaves differently for different types.",
            hint: "It counts things.",
            xpReward: 30
        },

        // --- Coding Tasks ---
        {
            id: "poly_c1",
            type: "mission_task",
            question: "MISSION: `Duck` inherits from `Bird`. Override the `sound()` method in `Duck` to print 'Quack'.",
            expectedOutput: "Quack",
            codeTask: "class Bird:\n    def sound(self):\n        print('Chirp')\n\nclass Duck(Bird):\n    # Override sound here\n\nd = Duck()\nd.sound()",
            hint: "def sound(self):\n    print('Quack')",
            explanation: "Perfect override! The Duck now has its own unique voice.",
            learningGoals: "User must demonstrate method overriding (simulated).",
            requiredConcepts: ["def", "sound", "print"],
            regexCheck: /def\s+sound\s*\(\s*self\s*\)/, // Checks if sound is defined in child
            xpReward: 70
        },
        {
            id: "poly_c2",
            type: "mission_task",
            question: "MISSION: Create a loop that calls `.speak()` on both a `Dog()` and a `Cat()`.",
            expectedOutput: "Woof\nMeow",
            codeTask: "class Dog:\n    def speak(self): print('Woof')\nclass Cat:\n    def speak(self): print('Meow')\n\nanimals = [Dog(), Cat()]\n# Loop and speak:\n",
            hint: "for a in animals:\n    a.speak()",
            explanation: "This is polymorphism in action! You treated both different objects the same way in a loop.",
            learningGoals: "User must demonstrate polymorphic iteration.",
            requiredConcepts: ["for", "animals", ".speak"],
            regexCheck: /\.speak\s*\(\s*\)/,
            xpReward: 70
        },
        {
            id: "poly_c3",
            type: "mission_task",
            question: "MISSION: Override the `__str__` magic method in class `Person` to return 'I am human'.",
            expectedOutput: "I am human",
            codeTask: "class Person:\n    # Override __str__ here\n\np = Person()\nprint(p)",
            hint: "def __str__(self):\n    return 'I am human'",
            explanation: "Magic methods like `__str__` are classic examples of polymorphism - they change how Python treats your objects.",
            learningGoals: "User must override the __str__ magic method.",
            requiredConcepts: ["__str__"],
            regexCheck: /def\s+__str__\s*\(\s*self\s*\)/,
            xpReward: 70
        },
        {
            id: "poly_c4",
            type: "mission_task",
            question: "MISSION: Define a function `make_dance(performer)` that calls `performer.dance()`. Pass it a `Robot` object.",
            expectedOutput: "Dancing",
            codeTask: "class Robot: def dance(self): print('Dancing')\n# Define make_dance then call it with Robot():\n",
            hint: "def make_dance(obj): obj.dance()\nmake_dance(Robot())",
            explanation: "Duck Typing! If it walks like a duck and quacks like a duck, it's a duck. If it has a dance() method, make_dance can use it.",
            learningGoals: "User must implement a polymorphic function (Duck Typing).",
            requiredConcepts: ["def", ".dance"],
            regexCheck: /\.dance\s*\(\s*\)/,
            xpReward: 70
        },

        // --- Debugging ---
        {
            id: "poly_d1",
            type: "debugging",
            question: "REPAIR MISSION: This code tries to call `speak()` on a list of objects, but one object is missing the method. Fix `Bird`!",
            codeTask: "class Dog: def speak(self): print('Woof')\nclass Bird: pass # Add speak() here\n\nfor a in [Dog(), Bird()]:\n    a.speak()",
            expectedOutput: "Woof\nChirp",
            hint: "Add def speak(self): print('Chirp') to the Bird class.",
            explanation: "Fixed! Poly-morphic loops only work if EVERY object in the collection has the expected method.",
            errorType: "AttributeError",
            xpReward: 75,
            learningGoals: "User must add a missing method to ensure polymorphic compliance."
        },
        {
            id: "poly_d2",
            type: "debugging",
            question: "SYNTAX REPAIR: The `__str__` method should RETURN a string, but this code is PRINTING inside it. Fix it!",
            codeTask: "class Box:\n    def __str__(self):\n        # Fix this line:\n        print('I am a box')\n\nprint(Box())",
            expectedOutput: "I am a box",
            hint: "Change print to return.",
            explanation: "Magic methods like __str__ and __repr__ must return a string value.",
            errorType: "TypeError",
            xpReward: 75,
            learningGoals: "User must correctly return a string from a magic method."
        }
    ]
};

export const POLYMORPHISM_QUESTION_BANK = {
    "Concept_Theory": POLYMORPHISM_LEVEL_1.questions.filter(q => q.id.includes('poly_m1') || q.id.includes('poly_m3') || q.id.includes('poly_m4') || q.id.includes('poly_c4')),
    "Concept_Overriding": POLYMORPHISM_LEVEL_1.questions.filter(q => q.id.includes('poly_m2') || q.id.includes('poly_c1') || q.id.includes('poly_c2') || q.id.includes('poly_c3') || q.id.includes('poly_d1') || q.id.includes('poly_d2'))
};
