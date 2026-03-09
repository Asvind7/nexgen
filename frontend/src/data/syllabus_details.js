export const SYLLABUS_DETAILS = {
    "Syntax": [
        { title: "Your First Line", context: "The print() function", question: "How do you display text on the screen?", educationalTip: "To show text, use `print('your message')`", lessonExample: "print('Welcome to Python!')", codeTask: "Print any message of your choice (e.g. 'Hello World').", expectedOutput: "any message", validation: { mustInclude: ["print", "(", ")", "'"], errorMessage: "Check your syntax! Did you use parentheses () and quotes '' around the text?" }, learningGoals: "The user must write a print statement that outputs any string. Be lenient with content." },
        { title: "Comments", context: "Using # for comments", question: "How do you add a hidden note in your code?", educationalTip: "Use a `#` to create a comment. Python will ignore everything after it on that line!", lessonExample: "# This line is ignored\nprint('Hello')", codeTask: "Write a comment and print 'Visible'.", expectedOutput: "Visible", validation: { mustInclude: ["#", "print"], errorMessage: "Start your comment with a # symbol and include a print statement." }, learningGoals: "The user must include a comment starting with # and a print statement." },
        { title: "Syntax Error", context: "Missing Parentheses", question: "What is missing in this print statement?", educationalTip: "In Python 3, `print` is a function and requires `(` and `)` around its arguments.", lessonExample: "print('Fixed parentheses')", codeTask: "Fix the code by adding parentheses.", startingCode: "print 'Hello World'", expectedOutput: "Hello World", validation: { mustInclude: ["(", ")", "print"], errorMessage: "Fix the code! Python 3 requires parentheses around print arguments: print(...)" }, learningGoals: "The user must fix a SyntaxError by adding parentheses to a print statement." },
        { title: "Errors", context: "Understanding SyntaxError", question: "Why is this string broken?", educationalTip: "Every opening quote `'` needs a matching closing quote `'` to end the string.", lessonExample: "print('Match your quotes')", codeTask: "Fix the string by closing the quote.", startingCode: "print('Fixed String)", expectedOutput: "Fixed String", validation: { mustInclude: ["print", "'", "(", ")"], errorMessage: "Fix the string syntax. Ensure quotes match and parentheses are closed." }, learningGoals: "The user must fix the syntax error (missing quote) to print a valid string." },
        { title: "Escape Characters", context: "Using \\n for new lines", question: "How do you print two lines with one print statement?", educationalTip: "Use `\\n` (newline) inside your string to create a line break!", lessonExample: "print('Line A\\nLine B')", codeTask: "Print 'Line 1' and 'Line 2' on separate lines using ONLY ONE print() statement.", startingCode: "print('Line 1 Line 2')", expectedOutput: "Line 1\nLine 2", validation: { mustInclude: ["\\n", "print"], errorMessage: "Use the newline character (\\n) to create a line break inside the string." }, learningGoals: "The user must usage the \\n escape sequence to print two lines using a single print function call." },
        { title: "Multiline Strings", context: "Triple Quotes (''' or \"\"\")", question: "How do you write a string that spans multiple lines?", educationalTip: "Triple quotes allow you to write text exactly as it appears, spanning multiple lines automatically by pressing 'Enter'. You can also still use \\n inside them if you prefer!", lessonExample: "print('''Line 1\nLine 2\nLine 3''')", codeTask: "Use triple quotes to print 'One' and 'Two' on separate lines.", expectedOutput: "One\nTwo", validation: { mustInclude: ["'''", "print"], errorMessage: "Use triple quotes (''') to wrap your multi-line message." }, learningGoals: "The user must use triple quotes for multiline output." }
    ],
    "Variables": [
        {
            title: "The Box Analogy",
            context: "Creating a variable",
            codeTask: "# Create variable 'xp' and set it to 10:\n",
            expectedOutput: "10",
            validation: { mustInclude: ["="], errorMessage: "Create a variable named 'xp' and assign it a value." },
            learningGoals: "The user must declare a variable with any name (like xp, score, etc), assign it a number, and print that variable."
        },
        {
            title: "Naming Rules",
            context: "Snake_case & PascalCase",
            educationalTip: "Python variables usually use `snake_case` (all lowercase), but `PascalCase` (CapitalizedWords) is also valid syntax! (Classes use PascalCase by standard).",
            lessonExample: "player_score = 10  # Standard\nPlayerScore = 10  # Also Valid",
            codeTask: "# Create 'player_name' = 'NexGen' (or 'PlayerName'):\n",
            expectedOutput: "NexGen",
            validation: { mustInclude: ["="], errorMessage: "Variable names must not contain spaces or start with numbers!" },
            learningGoals: "The user must create a variable using a valid naming style (snake_case or PascalCase) and print it."
        },
        {
            title: "Reassignment",
            context: "Changing variable values",
            codeTask: "score = 0\n# Now change 'score' to 100 below:\n",
            expectedOutput: "100",
            validation: { mustInclude: ["="], errorMessage: "Assign a new value to 'score'." },
            learningGoals: "The user must assign a value to a variable, then assign a DIFFERENT value to the same variable, and print it."
        },
        {
            title: "Multiple Assignment",
            context: "Assigning x, y = 1, 2",
            codeTask: "# Assign x=10 and y=20 in one line:\n",
            expectedOutput: "10 20",
            validation: { mustInclude: [","], errorMessage: "Use a comma to separate variables." },
            learningGoals: "The user must assign values to two variables in a single line using a comma."
        },
        {
            title: "Dynamic Types",
            context: "Variables changing types",
            codeTask: "data = 10\n# Reassign 'data' to the string 'Text' below:\n",
            expectedOutput: "Text",
            validation: { mustInclude: ["="], errorMessage: "Change the variable 'data' to a string." },
            learningGoals: "The user must assign a number to a variable, then reassign it to a string."
        },
        {
            title: "Constants",
            context: "UPPERCASE naming convention",
            codeTask: "# Create constant MAX_LIVES = 3:\n",
            expectedOutput: "3",
            validation: { mustInclude: ["MAX_LIVES"], errorMessage: "Use UPPERCASE for constant 'MAX_LIVES'." },
            learningGoals: "The user must define a variable using ALL CAPS to represent a constant."
        }
    ],
    "Data Types": [
        {
            title: "Integers",
            context: "Whole numbers",
            codeTask: "val = 42\n# Print the type of 'val':\n",
            expectedOutput: "<class 'int'>",
            validation: { mustInclude: ["type"], errorMessage: "Use type() to check the variable." },
            learningGoals: "The user must use the type() function on an integer."
        },
        {
            title: "Floats",
            context: "Decimal numbers",
            codeTask: "# Create 'pi' = 3.14 and print it:\n",
            expectedOutput: "3.14",
            validation: { mustInclude: ["pi"], errorMessage: "Define the float variable 'pi'." },
            learningGoals: "The user must define a variable with a decimal number (float)."
        },
        {
            title: "Strings",
            context: "Text data",
            codeTask: "# Create 'msg' = 'Data' and print it:\n",
            expectedOutput: "Data",
            validation: { mustInclude: ["'"], errorMessage: "Strings must be wrapped in quotes." },
            learningGoals: "The user must define a string variable using quotes."
        },
        {
            title: "Booleans",
            context: "True/False logic",
            codeTask: "# Create 'is_active' = True and print it:\n",
            expectedOutput: "True",
            validation: { mustInclude: ["True"], errorMessage: "Use the Boolean value True (capital T)." },
            learningGoals: "The user must define a boolean variable set to True or False."
        },
        {
            title: "Type Conversion",
            context: "str() and int() functions",
            codeTask: "num = 5\n# Print 'Count: ' joined with str(num):\n",
            expectedOutput: "Count: 5",
            validation: { mustInclude: ["str("], errorMessage: "Convert the number to a string using str()." },
            learningGoals: "The user must use str() to convert a number to a string and concatenate it."
        },
        {
            title: "Checking Types",
            context: "Using type() function",
            codeTask: "# Print the type of 10.5:\n",
            expectedOutput: "<class 'float'>",
            validation: { mustInclude: ["type"], errorMessage: "Use type() to check the value." },
            learningGoals: "The user must use type() to check a float."
        }
    ],
    "Operators": [
        {
            title: "Addition & Subtraction",
            context: "Basic math (+, -)",
            codeTask: "# Print the result of 10 + 5:\n",
            expectedOutput: "15",
            validation: { mustInclude: ["+"], errorMessage: "Use the + operator." },
            learningGoals: "The user must use the addition operator."
        },
        {
            title: "Multiplication",
            context: "Using * operator",
            codeTask: "# Print the result of 5 * 5:\n",
            expectedOutput: "25",
            validation: { mustInclude: ["*"], errorMessage: "Use the * operator." },
            learningGoals: "The user must use the multiplication operator."
        },
        {
            title: "Division types",
            context: "Float (/) vs Floor (//)",
            codeTask: "# Print 10 divided by 3, then 10 floor-divided by 3:\n",
            expectedOutput: "3.3333333333333335\n3",
            validation: { mustInclude: ["/", "//"], errorMessage: "Use both / and // operators." },
            learningGoals: "The user must demonstrate both standard division (/) and floor division (//)."
        },
        {
            title: "Modulus",
            context: "The Remainder operator (%)",
            codeTask: "# Print the remainder of 10 divided by 3:\n",
            expectedOutput: "1",
            validation: { mustInclude: ["%"], errorMessage: "Use the % operator." },
            learningGoals: "The user must use the modulus operator to find a remainder."
        },
        {
            title: "Exponents",
            context: "Power operator (**)",
            codeTask: "# Calculate 2 to the power of 3 and print it:\n",
            expectedOutput: "8",
            validation: { mustInclude: ["**"], errorMessage: "Use ** for exponents." },
            learningGoals: "The user must use the exponent operator."
        },
        {
            title: "Comparison",
            context: "Equal (==) and Not Equal (!=)",
            codeTask: "# Compare 5 to 5. Print the result of the equality check:\n",
            expectedOutput: "True",
            validation: { mustInclude: ["=="], errorMessage: "Use == to compare values." },
            learningGoals: "The user must use the equality operator comparison."
        },
        {
            title: "Greater/Less",
            context: "Using >, <, >=, <=",
            codeTask: "# Check if 10 is greater than 2 and print the boolean result:\n",
            expectedOutput: "True",
            validation: { mustInclude: [">"], errorMessage: "Use the > operator." },
            learningGoals: "The user must use a greater than or less than operator."
        },
        {
            title: "Logical Ops",
            context: "and, or, not",
            codeTask: "# Print the boolean result of checking if both True AND False are true:\n",
            expectedOutput: "False",
            validation: { mustInclude: ["and"], errorMessage: "Use the 'and' operator." },
            learningGoals: "The user must use a logical operator (and, or, not)."
        }
    ],
    "Conditionals": [
        { title: "If Statement", context: "Basic if structure", codeTask: "# Write logic that prints 'Yes' if the condition is True:\n", expectedOutput: "Yes", validation: { mustInclude: ["if", ":"], errorMessage: "Use an 'if' statement ending with a colon." }, learningGoals: "The user must write an if statement that executes a print block." },
        { title: "Else", context: "The fallback path", codeTask: "x = 0\n# If x is greater than 0, print 'Pos'. Otherwise, print 'Neg':\n", expectedOutput: "Neg", validation: { mustInclude: ["if", "else", ":"], errorMessage: "Use an 'if-else' structure ending with colons." }, learningGoals: "The user must write an if-else structure where the else block executes and prints 'Neg'." },
        { title: "Elif", context: "Multiple conditions", codeTask: "x = 5\n# Check if x > 10 (print 'Big') or if x > 0 (print 'Medium'):\n", expectedOutput: "Medium", validation: { mustInclude: ["elif "], errorMessage: "Use 'elif' for the second condition." }, learningGoals: "The user must use an elif block to check a second condition." },
        { title: "Nested If", context: "If inside If", codeTask: "# Use nested if statements to print 'Deep' if two conditions are True:\n", expectedOutput: "Deep", validation: { mustInclude: ["        "], errorMessage: "Indent the nested if statement properly." }, learningGoals: "The user must write an if statement inside another if statement." },
        { title: "Boolean Logic", context: "Using 'and' in if", codeTask: "# Print 'Range' if 5 is between 2 and 10:\n", expectedOutput: "Range", validation: { mustInclude: ["and"], errorMessage: "Combine conditions with 'and'." }, learningGoals: "The user must combine two conditions using 'and' in an if statement." },
        { title: "Pass", context: "The pass placeholder", codeTask: "if True:\n# Add a placeholder then print 'Done':\n", expectedOutput: "Done", validation: { mustInclude: ["pass"], errorMessage: "Use the 'pass' keyword." }, learningGoals: "The user must use the 'pass' keyword inside a block." }
    ],
    "Loops": [
        {
            title: "While Loop",
            context: "Looping while true",
            codeTask: "i = 0\n# Use a while loop to print the values of i until it reaches 3:\n",
            expectedOutput: "0\n1\n2",
            validation: { mustInclude: ["while"], errorMessage: "Use a 'while' loop." },
            learningGoals: "The user must create a while loop that runs at least once and updates the loop variable."
        },
        { title: "Infinite Loop Risk", context: "Breaking text", codeTask: "while True:\n# Print the word 'Run' once and then force the loop to exit:\n", expectedOutput: "Run", validation: { mustInclude: ["break"], errorMessage: "Use 'break' to stop the loop." }, learningGoals: "The user must write a while loop that is stopped explicitly by a break statement." },
        { title: "For Loop (Range)", context: "range() function", codeTask: "# Use a for loop to iterate 3 times and print the loop variable:\n", expectedOutput: "0\n1\n2", validation: { mustInclude: ["for", "range"], errorMessage: "Use a 'for' loop with range()." }, learningGoals: "The user must use a for loop with the range() function." },
        { title: "Looping Strings", context: "Char by char iteration", codeTask: "# Iterate through the string 'Py' and print each character one by one:\n", expectedOutput: "P\ny", validation: { mustInclude: ["for"], errorMessage: "Iterate over the string." }, learningGoals: "The user must iterate over a string using a for loop." },
        { title: "Break", context: "Exiting loops early", codeTask: "# Iterate through numbers 0 to 9, print them, but stop the loop if the number is 2:\n", expectedOutput: "0\n1", validation: { mustInclude: ["break"], errorMessage: "Use 'break' to exit." }, learningGoals: "The user must use a break statement to exit a loop early." },
        { title: "Continue", context: "Skipping iterations", codeTask: "# Iterate through numbers 0 to 2, but skip printing if the number is 1:\n", expectedOutput: "0\n2", validation: { mustInclude: ["continue"], errorMessage: "Use 'continue' to skip." }, learningGoals: "The user must use a continue statement to skip an iteration." },
    ],
    "Functions": [
        { title: "Definition", context: "def keyword", codeTask: "# Define a function named 'greet' that prints 'Hi', then call it:\n", expectedOutput: "Hi", validation: { mustInclude: ["def", "greet", "(", ")"], errorMessage: "Define a function named 'greet' and call it with parentheses ()." }, learningGoals: "The user must define a function named 'greet' and call it. AI should be lenient with the greeting message." },
        { title: "Parameters", context: "Passing arguments", codeTask: "def say(msg):\n    # Show the message passed to this function, then call say('Yo'):\n", expectedOutput: "Yo", validation: { mustInclude: ["say("], errorMessage: "Call the function with an argument." }, learningGoals: "The user must define a function that accepts an argument and call it with a value." },
        { title: "Return Values", context: "Returning data", codeTask: "def add(a, b):\n    # Return the sum of a and b:\n", expectedOutput: "4", validation: { mustInclude: ["return"], errorMessage: "Use 'return' to send back the result." }, learningGoals: "The user must define a function that returns a value." },
        { title: "Default Args", context: "Optional parameters", codeTask: "def run(speed=10):\n    # Print the speed parameter:\n", expectedOutput: "10", validation: { mustInclude: ["="], errorMessage: "Set a default value for the parameter." }, learningGoals: "The user must define a function with a default parameter value." },
        { title: "Scope", context: "Local vs Global vars", codeTask: "x = 'Global'\ndef show():\n    # Print the global variable x:\n", expectedOutput: "Global", validation: { mustInclude: ["x", "def"], errorMessage: "Use the global variable inside the function." }, learningGoals: "The user must access a global variable from inside a function." },
        { title: "Docstrings", context: "Documenting code", codeTask: "def test():\n    # Add a docstring with triple quotes and print 'Tested':\n", expectedOutput: "Tested", validation: { mustInclude: ["'''"], errorMessage: "Add a docstring with triple quotes." }, learningGoals: "The user must include a docstring inside a function definition." }
    ],
    "Lists": [
        { title: "Creation", context: "Square brackets []", codeTask: "# Create a variable containing the numbers 1, 2, and 3 in a list, then print it:\n", expectedOutput: "[1, 2, 3]", validation: { mustInclude: ["["], errorMessage: "Use square brackets [] to create a list." }, learningGoals: "The user must create and print a list containing multiple items." },
        { title: "Indexing", context: "Accessing items [0]", codeTask: "items = ['a', 'b']\n# Show only the first element of the 'items' list:\n", expectedOutput: "a", validation: { mustInclude: ["items", "[", "0", "]"], errorMessage: "Access the first item using index 0: items[0]" }, learningGoals: "The user must access the first item of the list using square brackets and index 0." },
        { title: "Slicing", context: "Ranges [start:end]", codeTask: "nums = [0, 1, 2, 3]\n# Print the slice [1:3] of nums:\n", expectedOutput: "[1, 2]", validation: { mustInclude: [":"], errorMessage: "Use slicing syntax [start:end]." }, learningGoals: "The user must slice a list to get a subset of items." },
        { title: "Modifying", context: "Changing values", codeTask: "data = [1, 1]\n# Change the first item (index 0) to 9 and print data:\n", expectedOutput: "[9, 1]", validation: { mustInclude: ["[0]"], errorMessage: "Modify the item at index 0." }, learningGoals: "The user must modify an element in a list by index." },
        { title: "Append", context: "Adding items", codeTask: "log = []\n# Append 'Error' to log and print it:\n", expectedOutput: "['Error']", validation: { mustInclude: [".append"], errorMessage: "Use the .append() method." }, learningGoals: "The user must add an item to a list using .append()." },
        { title: "Remove", context: "Deleting items", codeTask: "nums = [1, 2]\n# Remove the value 1 from nums and print it:\n", expectedOutput: "[2]", validation: { mustInclude: [".remove"], errorMessage: "Use the .remove() method." }, learningGoals: "The user must remove an item from a list using .remove()." },
        { title: "Length", context: "len() function", codeTask: "# Print the length of the list [1, 2, 3]:\n", expectedOutput: "3", validation: { mustInclude: ["len("], errorMessage: "Use the len() function." }, learningGoals: "The user must print the length of a list using len()." }
    ],
    "Tuples": [
        { title: "Immutability", context: "Cannot change tuples ()", codeTask: "# Create a tuple t = (1, 2):\n", expectedOutput: "", validation: { mustInclude: ["("], errorMessage: "Use parentheses () for tuples." }, learningGoals: "The user must demonstrate immutability by creating a tuple using parentheses.", explanation: "Excellent! You've correctly created a tuple using parentheses, demonstrating immutability. 🚀 Now, let's explore *why* immutability is so important in Python." },
        { title: "Accessing", context: "Indexing like lists", codeTask: "t = ('A', 'B')\n# Print the first item (index 0) of t:\n", expectedOutput: "A", validation: { mustInclude: ["[0]"], errorMessage: "Access by index." }, learningGoals: "The user must access an element of a tuple by index." },
        { title: "Unpacking", context: "Assigning to vars", codeTask: "t = (10, 20)\n# Unpack t into variables x, y and print x:\n", expectedOutput: "10", validation: { mustInclude: [","], errorMessage: "Unpack variables using a comma." }, learningGoals: "The user must unpack a tuple into separate variables." },
        { title: "Single Item", context: "Trailing comma", codeTask: "# Create a single-item tuple and print its type:\n", expectedOutput: "<class 'tuple'>", validation: { mustInclude: [","], errorMessage: "Remember the trailing comma for single-item tuples." }, learningGoals: "The user must create a single-item tuple using a trailing comma." },
        { title: "Methods", context: "count() and index()", codeTask: "t = (1, 1, 2)\n# Print the count of value 1 in t:\n", expectedOutput: "2", validation: { mustInclude: [".count"], errorMessage: "Use the .count() method." }, learningGoals: "The user must use the .count() method on a tuple." },
        { title: "Tuple Slicing", context: "Getting range of items", codeTask: "t = (0, 1, 2, 3)\n# Print the slice of t from index 1 to 3:\n", expectedOutput: "(1, 2)", validation: { mustInclude: [":"], errorMessage: "Use slicing syntax [start:end]." }, learningGoals: "The user must slice a tuple to get a subset of items." }
    ],
    "Dictionaries": [
        { title: "Key-Value", context: "Curly braces {}", codeTask: "# Create dict user = {'name': 'Neo'}:\n", expectedOutput: "", validation: { mustInclude: ["{"], errorMessage: "Use curly braces {}." }, learningGoals: "The user must create a dictionary with at least one key-value pair." },
        { title: "Accessing", context: "Using keys", codeTask: "d = {'id': 1}\n# Print the value for key 'id':\n", expectedOutput: "1", validation: { mustInclude: ["d", "[", "'", "id", "'", "]"], errorMessage: "Access the dictionary value using the key 'id': d['id']" }, learningGoals: "The user must access a dictionary value using square brackets and the key 'id'. Be lenient with quote types." },
        { title: "Adding/Edit", context: "New keys or updates", codeTask: "d = {}\n# Add key 'xp' with value 100 to d and print it:\n", expectedOutput: "{'xp': 100}", validation: { mustInclude: ["d", "[", "xp", "]", "=", "100"], errorMessage: "Add the key 'xp' to dictionary 'd' and set it to 100: d['xp'] = 100" }, learningGoals: "The user must use assignment to add a key-value pair to a dictionary and print the result." },
        { title: "Keys & Values", context: ".keys() and .values()", codeTask: "d = {'a': 1}\n# Print the keys of d as a list:\n", expectedOutput: "['a']", validation: { mustInclude: [".keys"], errorMessage: "Use .keys() method." }, learningGoals: "The user must retrieve keys or values from a dictionary." },
        { title: "Get Method", context: "Safe access .get()", codeTask: "d = {}\n# Use .get() to print value for 'miss', default 'N/A':\n", expectedOutput: "N/A", validation: { mustInclude: [".get"], errorMessage: "Use the .get() method." }, learningGoals: "The user must use .get() to access a dictionary key safely." },
        { title: "Looping Dicts", context: ".items() loop", codeTask: "d = {'x': 1}\n# Loop through d.items() and print k, v:\n", expectedOutput: "x 1", validation: { mustInclude: [".items"], errorMessage: "Use .items() to loop." }, learningGoals: "The user must loop through a dictionary's items." }
    ],
    "Sets": [
        { title: "Unique Items", context: "No duplicates {}", codeTask: "# Create set s = {1, 1, 2} and print its length:\n", expectedOutput: "2", validation: { mustInclude: ["{", "}", "1", "2"], errorMessage: "Use curly braces {} and include elements 1 and 2." }, learningGoals: "The user must create a set with duplicate values to observe that only unique values are kept." },
        { title: "Adding", context: ".add() method", codeTask: "s = {1}\n# Add 2 to the set s and print its length:\n", expectedOutput: "2", validation: { mustInclude: [".add"], errorMessage: "Use .add() to add items." }, learningGoals: "The user must add an item to a set." },
        { title: "Operations", context: "Union (|) & Intersect (&)", codeTask: "a = {1, 2}\nb = {2, 3}\n# Print the intersection of a and b:\n", expectedOutput: "{2}", validation: { mustInclude: ["&"], errorMessage: "Use & for intersection." }, learningGoals: "The user must use a set operation like union or intersection." },
        { title: "Membership", context: "'in' keyword", codeTask: "s = {1, 2}\n# Print whether 1 is in s:\n", expectedOutput: "True", validation: { mustInclude: ["in"], errorMessage: "Use 'in' to check membership." }, learningGoals: "The user must check if an item exists in a set." },
        { title: "Safe Removal", context: ".discard() method", codeTask: "s = {1}\n# Use .discard(2) to safely try removing 2 (which isn't there), then print 'Done':\n", expectedOutput: "Done", validation: { mustInclude: [".discard"], errorMessage: "Use .discard() for error-free removal." }, learningGoals: "The user must understand the difference between .remove() (errors if missing) and .discard() (safe)." },
        { title: "Symmetric Diff", context: "The (^) operator", codeTask: "a = {1, 2}\nb = {2, 3}\n# Print the symmetric difference (items in either a or b but not both):\n", expectedOutput: "{1, 3}", validation: { mustInclude: ["^"], errorMessage: "Use the ^ operator." }, learningGoals: "The user must use the symmetric difference operator." }
    ],
    "Comprehensions": [
        { title: "List Comp", context: "Compact loops [x for x]", codeTask: "# Create a list of squares for numbers 0, 1, and 2 using a one-line comprehension:\n", expectedOutput: "[0, 1, 4]", validation: { mustInclude: ["[", "for", "in", "range"], errorMessage: "Use list comprehension syntax: [x**2 for x in range(3)]" }, learningGoals: "The user must write a one-line list comprehension to generate a list of squares." },
        { title: "Filtering", context: "With if condition", codeTask: "# Using comprehension, create a list of even numbers from 0 to 3:\n", expectedOutput: "[0, 2]", validation: { mustInclude: ["if"], errorMessage: "Add an 'if' condition." }, learningGoals: "The user must create and print a filtered list using comprehension." },
        { title: "Dict Comp", context: "{k:v for k,v}", codeTask: "# Dict comprehension: {x: x*2 for x in range(2)}:\n", expectedOutput: "{0: 0, 1: 2}", validation: { mustInclude: ["{", "for"], errorMessage: "Use dict comprehension syntax." }, learningGoals: "The user must create and print a dictionary using comprehension." },
        { title: "Set Comp", context: "{x for x in ...}", codeTask: "# Create a set of squares for [1, 2, 2] using set comprehension:\n", expectedOutput: "{1, 4}", validation: { mustInclude: ["{", "for", "in"], errorMessage: "Use set comprehension syntax: {x*x for x in [1, 2, 2]}" }, learningGoals: "The user must understand that set comprehensions produce unique values." },
        { title: "Ternary Comp", context: "If-Else in one line", codeTask: "# Create a list that says 'Even' or 'Odd' for numbers 0 to 1:\n", expectedOutput: "['Even', 'Odd']", validation: { mustInclude: ["if", "else"], errorMessage: "Use if-else inside the comprehension." }, learningGoals: "The user must use a ternary operator inside a comprehension." },
        { title: "Nested Logic", context: "Multiple filters", codeTask: "# Create a list of numbers from 0 to 9 that are > 3 AND even:\n", expectedOutput: "[4, 6, 8]", validation: { mustInclude: ["if", "if", "for"] }, learningGoals: "The user must use multiple filters in a single comprehension." }
    ],
    // --- PHASE 3: ADVANCED ---
    "String Manipulation": [
        { title: "F-Strings", context: "Formatted strings f''", codeTask: "name = 'Ai'\n# Use an f-string to print a greeting: 'Hello' followed by the name variable:\n", expectedOutput: "Hello Ai", validation: { mustInclude: ["f", "{", "name", "}"], errorMessage: "Use an f-string with curly braces: f'Hello {name}'" }, learningGoals: "The user must use an f-string for variable interpolation. Be lenient with quotes and capitalization." },
        { title: "Splitting", context: ".split() method", codeTask: "words = 'A B'\n# Split 'words' into a list and print it:\n", expectedOutput: "['A', 'B']", validation: { mustInclude: [".split"], errorMessage: "Use .split() method." }, learningGoals: "The user must split a string into a list." },
        { title: "Joining", context: ".join() method", codeTask: "# Join the list ['A', 'B'] with '-' and print it:\n", expectedOutput: "A-B", validation: { mustInclude: [".join"], errorMessage: "Use .join() method." }, learningGoals: "The user must join a list of strings into one." },
        { title: "Strip", context: "Removing whitespace", codeTask: "# Strip whitespace from '  Hi  ' and print it:\n", expectedOutput: "Hi", validation: { mustInclude: [".strip"], errorMessage: "Use .strip() method." }, learningGoals: "The user must remove whitespace using .strip()." },
        { title: "Case Methods", context: "upper(), lower()", codeTask: "# Take the string 'Python' and print it in all capital letters:\n", expectedOutput: "PYTHON", validation: { mustInclude: [".upper"], errorMessage: "Use .upper() method." }, learningGoals: "The user must change string case using .upper() or .lower()." },
        { title: "Replace & Translate", context: "Changing characters", codeTask: "text = 'Ha Ha'\n# Replace all 'a' with 'o' and print the result:\n", expectedOutput: "Ho Ho", validation: { mustInclude: [".replace"], errorMessage: "Use the .replace() method." }, learningGoals: "The user must replace substrings within a string." }
    ],
    "RegEx": [
        { title: "Import re", context: "Regular Expressions", codeTask: "import re\n# Find all numbers within the string 'User123' and print the result:\n", expectedOutput: "['123']", validation: { mustInclude: ["import", "re", "re.findall", "(", ")"], errorMessage: "Import 're' and use re.findall() correctly." }, learningGoals: "The user must import re and find digits in a string using regex patterns." },
        { title: "Match vs Search", context: "Finding patterns", codeTask: "import re\n# Search for 'Py' in 'I love Python' and print only the matched text:\n", expectedOutput: "Py", validation: { mustInclude: ["search"], errorMessage: "Use re.search()." }, learningGoals: "The user must use re.search() to find a match." },
        { title: "Validation", context: "Email pattern check", codeTask: "import re\n# Use re.match to check if 'User' starts with word characters:\n", expectedOutput: "True", validation: { mustInclude: ["match"], errorMessage: "Use re.match()." }, learningGoals: "The user must validate a string using re.match()." },
        { title: "Groups", context: "Extracting subsets", codeTask: "import re\nm = re.search(r'(\\d+)', 'Age: 25')\n# Print the first captured group using m.group(1):\n", expectedOutput: "25", validation: { mustInclude: ["group(1)"], errorMessage: "Extract group 1 from the match." }, learningGoals: "The user must use parentheses to create and extract groups in RegEx." },
        { title: "Quantifiers", context: "Matching counts", codeTask: "import re\n# Find all occurrences of 'a' followed by 2 or more 'b's in 'abb abbbb':\n", expectedOutput: "['abb', 'abbbb']", validation: { mustInclude: ["{2,}"], errorMessage: "Use the {min,max} quantifier." }, learningGoals: "The user must use quantifiers like {n,} or + or *." },
        { title: "Substitution", context: "re.sub()", codeTask: "import re\n# Replace all digits in 'U1 U2' with '#' and print the result:\n", expectedOutput: "U# U#", validation: { mustInclude: ["re.sub"], errorMessage: "Use re.sub() for replacement." }, learningGoals: "The user must use regex for string substitution." }
    ],
    "File I/O": [
        { title: "Reading", context: "open() and read()", codeTask: "print('Reading file...')\n# with open('data.txt') as f: print(f.read())", expectedOutput: "Reading file...", validation: { mustInclude: ["print"], errorMessage: "Print the output." }, learningGoals: "The user must demonstrate file reading logic (simulated)." },
        { title: "Writing", context: "Writing mode 'w'", codeTask: "print('Writing data...')\n# with open('data.txt', 'w') as f: f.write('Hi')", expectedOutput: "Writing data...", validation: { mustInclude: ["print"], errorMessage: "Print the status." }, learningGoals: "The user must demonstrate file writing logic (simulated)." },
        { title: "With Context", context: "with open() as f", codeTask: "print('Auto-closing file')\n# with open('file.txt') as f: pass", expectedOutput: "Auto-closing file", validation: { mustInclude: ["print"], errorMessage: "Print the status." }, learningGoals: "The user must use the 'with' statement for file handling (simulated)." },
        { title: "Append Mode", context: "Writing mode 'a'", codeTask: "print('Appending data...')\n# with open('log.txt', 'a') as f: f.write('\\nDone')", expectedOutput: "Appending data...", validation: { mustInclude: ["'a'"], errorMessage: "Use 'a' for append mode." }, learningGoals: "The user must understand the difference between write ('w') and append ('a')." },
        { title: "Binary Files", context: "Mode 'rb' or 'wb'", codeTask: "print('Reading binary...')\n# with open('img.png', 'rb') as f: data = f.read()", expectedOutput: "Reading binary...", validation: { mustInclude: ["'rb'"], errorMessage: "Use 'rb' for reading binary." }, learningGoals: "The user must understand how to handle non-text files." },
        { title: "JSON Handling", context: "import json", codeTask: "import json\ndata = {'ok': True}\n# Convert data to a JSON string and print it:\n", expectedOutput: '{"ok": true}', validation: { mustInclude: ["json.dumps"], errorMessage: "Use json.dumps() to serialize data." }, learningGoals: "The user must use the json library to handle structured data." }
    ],
    "Lambda": [
        { title: "Anonymous Func", context: "lambda x: ...", codeTask: "# Create a simple lambda function that adds two numbers together, then print the result for 2 and 3:\n", expectedOutput: "5", validation: { mustInclude: ["lambda"], errorMessage: "Use the 'lambda' keyword." }, learningGoals: "The user must create a lambda function." },
        { title: "Inline Use", context: "Quick logic", codeTask: "# Use an inline lambda to double 5 and print it:\n", expectedOutput: "10", validation: { mustInclude: ["lambda"], errorMessage: "Use an inline lambda." }, learningGoals: "The user must use an inline lambda function." },
        { title: "Sorting with Lambda", context: "key argument in sort()", codeTask: "pairs = [(1, 'one'), (2, 'two')]\n# Use .sort() with key=lambda x: x[1] to sort by the names, then print pairs:\n", expectedOutput: "[(1, 'one'), (2, 'two')]", validation: { mustInclude: ["key=", "lambda"], errorMessage: "Use key=lambda for sorting." }, learningGoals: "The user must use lambda for custom sorting logic." },
        { title: "Conditionals in Lambda", context: "Ternary in lambda", codeTask: "# Create a lambda 'check' that returns 'Big' if x > 10 else 'Small'. Print check(15):\n", expectedOutput: "Big", validation: { mustInclude: ["if", "else", "lambda"], errorMessage: "Use a ternary operator inside lambda." }, learningGoals: "The user must use conditional logic within a lambda function." },
        { title: "Lambda Closures", context: "Func returning Lambda", codeTask: "def make_multiplier(n):\n    return lambda x: x * n\n# Create 'doubler' using make_multiplier(2) and print doubler(5):\n", expectedOutput: "10", validation: { mustInclude: ["make_multiplier(2)"], errorMessage: "Create the closure correctly." }, learningGoals: "The user must understand how functions can return lambda closures." },
        { title: "Practical Use", context: "Max with key", codeTask: "data = [{'val': 10}, {'val': 20}]\n# Use max() with key=lambda x: x['val'] to find the dict with highest value. Print it:\n", expectedOutput: "{'val': 20}", validation: { mustInclude: ["key=", "lambda"], errorMessage: "Use key=lambda in max()." }, learningGoals: "The user must use lambda as a key in built-in functions like max()." }
    ],
    "Map/Filter/Reduce": [
        {
            title: "Map",
            context: "Transforming lists",
            codeTask: "nums = [1, 2, 3]\n# Use map() and lambda x: x*x to square all nums. Print as list:\n",
            expectedOutput: "[1, 4, 9]",
            validation: { mustInclude: ["map", "lambda"], errorMessage: "Use map() with a lambda function." },
            learningGoals: "User must use map() to transform a collection."
        },
        {
            title: "Filter",
            context: "Selecting items",
            codeTask: "nums = [1, 5, 10]\n# Use filter() to get numbers > 4. Print as list:\n",
            expectedOutput: "[5, 10]",
            validation: { mustInclude: ["filter"], errorMessage: "Use the filter() function." },
            learningGoals: "User must use filter() to select items from a list."
        },
        {
            title: "Reduce",
            context: "Aggregating values",
            codeTask: "from functools import reduce\nnums = [1, 2, 3, 4]\n# Use reduce() with lambda x, y: x + y to sum the list. Print result:\n",
            expectedOutput: "10",
            validation: { mustInclude: ["reduce", "lambda"], errorMessage: "Use reduce() from functools." },
            learningGoals: "User must use reduce() to aggregate values."
        },
        {
            title: "Lambda Mastery",
            context: "Quick logic",
            codeTask: "# Create a list [1, 2, 3]. Use map() to add '!' to each item as strings. Print result:\n",
            expectedOutput: "['1!', '2!', '3!']",
            validation: { mustInclude: ["map", "lambda"], errorMessage: "Map a lambda over the list." },
            learningGoals: "User must demonstrate combined usage of map and lambda."
        },
        {
            title: "Map Dicts",
            context: "Transforming values",
            codeTask: "d = {'a': 1, 'b': 2}\n# Use map() and lambda to double the values in d.values(). Print as list:\n",
            expectedOutput: "[2, 4]",
            validation: { mustInclude: ["map", "values()"], errorMessage: "Map over the dictionary values." },
            learningGoals: "User must apply map() to dictionary data."
        },
        {
            title: "Complex Filter",
            context: "Filtering objects",
            codeTask: "users = [{'id': 1, 'ok': True}, {'id': 2, 'ok': False}]\n# Use filter() to get only users where 'ok' is True. Print as list:\n",
            expectedOutput: "[{'id': 1, 'ok': True}]",
            validation: { mustInclude: ["filter", "lambda"], errorMessage: "Filter based on a dictionary key." },
            learningGoals: "User must perform complex filtering on structured data."
        }
    ],
    "Exception Handling": [
        { title: "Try-Except", context: "Catching errors", codeTask: "# Surround a division-by-zero operation in a try-except block and print 'Safe' if an error occurs:\n", expectedOutput: "Safe", validation: { mustInclude: ["try:", "except:"], errorMessage: "Use try-except block." }, learningGoals: "The user must wrap code in a try-except block." },
        { title: "Specific Errors", context: "except ValueError", codeTask: "# Attempt to convert the string 'x' to an integer. Catch the ValueError specifically and print 'Invalid':\n", expectedOutput: "Invalid", validation: { mustInclude: ["ValueError"], errorMessage: "Catch ValueError specifically." }, learningGoals: "The user must catch a specific exception type." },
        { title: "Finally", context: "Always runs", codeTask: "# try-finally: print 'Done' in the finally block:\n", expectedOutput: "Done", validation: { mustInclude: ["finally:"], errorMessage: "Use a finally block." }, learningGoals: "The user must use a finally block." },
        { title: "Else Clause", context: "Run if no error", codeTask: "try:\n    x = 1\nexcept:\n    pass\n# Add an else block that prints 'No Error':\n", expectedOutput: "No Error", validation: { mustInclude: ["else:"], errorMessage: "Use the else block." }, learningGoals: "User must use the else clause in try-except." },
        { title: "Raising Errors", context: "raise keyword", codeTask: "def check(x):\n    # Raise ValueError if x < 0:\n    pass\n\ntry:\n    check(-1)\nexcept ValueError:\n    print('Raised')", expectedOutput: "Raised", validation: { mustInclude: ["raise", "ValueError"], errorMessage: "Raise a ValueError." }, learningGoals: "User must manually raise exceptions." },
        { title: "Chaining", context: "raise ... from", codeTask: "try:\n    int('x')\nexcept ValueError as e:\n    # Raise TypeError from e:\n    pass", expectedOutput: "TypeError", validation: { mustInclude: ["from e"], errorMessage: "Chain the exception using 'from'." }, learningGoals: "User must understand exception chaining." }
    ],
    "Classes/Objects": [
        { title: "Class Def", context: "class Keyword", codeTask: "# Define an empty class named 'Dog', and then print its __name__ property:\n", expectedOutput: "Dog", validation: { mustInclude: ["class", "Dog", "pass"], errorMessage: "Define a class named 'Dog' and use 'pass' if it's empty." }, learningGoals: "The user must define a class using the class keyword." },
        { title: "Init", context: "__init__ constructor", codeTask: "# Define a 'Cat' class with a constructor that takes a 'name'. Then, create Cat('Kitty') and print its name:\n", expectedOutput: "Kitty", validation: { mustInclude: ["def", "__init__", "self", "name"], errorMessage: "Define the __init__ constructor with self and name: def __init__(self, name):" }, learningGoals: "The user must define an __init__ method that assigns a name to an object instance." },
        { title: "Methods", context: "Class functions", codeTask: "# Create a 'Bot' class with a 'beep' method that prints 'Beep'. Instantiate it and call the method:\n", expectedOutput: "Beep", validation: { mustInclude: ["def", "beep", "self", "()"], errorMessage: "Define a 'beep' method and call it: bot.beep()" }, learningGoals: "The user must define a class method with self and call it correctly." },
        { title: "Class vs Instance", context: "Shared vs Unique data", codeTask: "class Bird:\n    kind = 'Canary'\n    def __init__(self, name): self.name = name\n# Create two birds. Change Bird.kind to 'Avian' and print the .kind of one bird:\n", expectedOutput: "Avian", validation: { mustInclude: ["Bird.kind ="], errorMessage: "Change the class-level attribute." }, learningGoals: "User must understand the difference between class-level and instance-level attributes." },
        { title: "Magic Methods", context: "__str__ for printing", codeTask: "class Item:\n    def __init__(self, val): self.val = val\n    # Implement __str__ to return f'Val:{self.val}':\n    pass\n\nprint(Item(5))", expectedOutput: "Val:5", validation: { mustInclude: ["__str__"], errorMessage: "Implement the __str__ magic method." }, learningGoals: "User must learn to customize object representation." },
        { title: "Deleter", context: "__del__ destructor", codeTask: "class Life:\n    def __del__(self): print('Gone')\n# Create a Life() object then delete it using 'del' to trigger 'Gone':\n", expectedOutput: "Gone", validation: { mustInclude: ["del "], errorMessage: "Use the 'del' keyword." }, learningGoals: "User must understand the object lifecycle and destructors." }
    ],
    "Decorators": [
        {
            title: "Logger Decorator",
            context: "Wrapping functions",
            codeTask: "def logger(func):\n    def wrapper():\n        print('Start')\n        func()\n        print('End')\n    return wrapper\n\n# Apply the @logger decorator to say_hi():\ndef say_hi():\n    print('Hi')\n\nsay_hi()",
            expectedOutput: "Start\nHi\nEnd",
            validation: { mustInclude: ["@logger"], errorMessage: "Apply @logger to the function." },
            learningGoals: "User must demonstrate basic decorator usage."
        },
        {
            title: "Decorator Args",
            context: "Handling parameters",
            codeTask: "def double(func):\n    def wrapper(x):\n        return func(x) * 2\n    return wrapper\n\n# Decorate add_five(x) to return (x+5)*2:\n@double\ndef add_five(x):\n    return x + 5\n\nprint(add_five(10))",
            expectedOutput: "30",
            validation: { mustInclude: ["@double"], errorMessage: "Use the @double decorator." },
            learningGoals: "User must demonstrate decorators with arguments."
        },
        {
            title: "Timing Decorator",
            context: "Performance checking",
            codeTask: "import time\ndef timer(func):\n    def wrap(*args):\n        # Print 'Time' then return func(*args)\n        print('Time')\n        return func(*args)\n    return wrap\n\n@timer\ndef test(): print('Run')\n\ntest()",
            expectedOutput: "Time\nRun",
            validation: { mustInclude: ["*args"], errorMessage: "Use *args to pass arguments through the decorator." },
            learningGoals: "User must understand how decorators can wrap any function signature."
        },
        {
            title: "Chaining",
            context: "Multiple decorators",
            codeTask: "def bold(f): return lambda: f'<b>{f()}</b>'\ndef italic(f): return lambda: f'<i>{f()}</i>'\n\n# Apply @bold then @italic to greet():\n@bold\n@italic\ndef greet(): return 'Hi'\n\nprint(greet())",
            expectedOutput: "<b><i>Hi</i></b>",
            validation: { mustInclude: ["@bold", "@italic"], errorMessage: "Stack both decorators." },
            learningGoals: "User must understand how decorators can be chained/stacked."
        },
        {
            title: "Class Decorators",
            context: "Decorating a class",
            codeTask: "def add_id(cls):\n    cls.id = 1\n    return cls\n\n# Apply @add_id to User class and print User.id:\n@add_id\nclass User: pass\n\nprint(User.id)",
            expectedOutput: "1",
            validation: { mustInclude: ["@add_id"], errorMessage: "Apply the decorator to the class." },
            learningGoals: "User must understand that decorators can also modify classes."
        }
    ],
    "Generators": [
        {
            title: "Infinite Counter",
            context: "Yield keyword",
            codeTask: "def count_up():\n    n = 1\n    while n <= 3:\n        yield n\n        n += 1\n\n# Create the generator and print list(count_up()):\n",
            expectedOutput: "[1, 2, 3]",
            validation: { mustInclude: ["yield", "count_up"], errorMessage: "Use yield to return values." },
            learningGoals: "User must create a basic generator."
        },
        {
            title: "Lazy Processing",
            context: "Generator expressions",
            codeTask: "nums = [1, 2, 3]\n# Create a generator expression for squares of nums. Print first item using next():\nsq_gen = (x*x for x in nums)\n",
            expectedOutput: "1",
            validation: { mustInclude: ["next(", "sq_gen"], errorMessage: "Use next() to get the first value." },
            learningGoals: "User must use generator expressions."
        },
        {
            title: "Yield From",
            context: "Delegating generators",
            codeTask: "def gen1(): yield 1\ndef gen2():\n    # Use yield from gen1() and then yield 2:\n    pass\n\nprint(list(gen2()))",
            expectedOutput: "[1, 2]",
            validation: { mustInclude: ["yield from"], errorMessage: "Use yield from to delegate to another generator." },
            learningGoals: "User must understand generator delegation."
        },
        {
            title: "Infinite Sequences",
            context: "while True + yield",
            codeTask: "def natural_nums():\n    n = 1\n    while True: yield n; n += 1\n# Use next() 3 times on natural_nums() and print total:\ng = natural_nums()\n",
            expectedOutput: "3",
            validation: { mustInclude: ["next("], errorMessage: "Consume the infinite generator using next()." },
            learningGoals: "User must understand how generators handle infinite data streams."
        },
        {
            title: "Memory Efficiency",
            context: "List vs Generator",
            codeTask: "import sys\n# Compare size of list [0..999] vs generator (0..999). Print 'Gen' if gen is smaller:\n",
            expectedOutput: "Gen",
            validation: { mustInclude: ["print"], errorMessage: "Observe the memory benefits of generators." },
            learningGoals: "User must understand the memory efficiency of lazy evaluation."
        }
    ],
    "Custom Exceptions": [
        {
            title: "Building Error",
            context: "Inheriting Exception",
            codeTask: "class MyError(Exception): pass\n\n# Raise MyError and catch it, printing 'Raised':\ntry:\n    pass\nexcept MyError:\n    print('Raised')",
            expectedOutput: "Raised",
            validation: { mustInclude: ["raise MyError"], errorMessage: "Raise the custom exception." },
            learningGoals: "User must define and raise a custom exception."
        },
        {
            title: "Error Attributes",
            context: "Adding data to errors",
            codeTask: "class CodeError(Exception):\n    def __init__(self, code): self.code = code\n# Raise CodeError(404) and print the .code attribute in except:\n",
            expectedOutput: "404",
            validation: { mustInclude: ["self.code", "except CodeError as e"], errorMessage: "Add and access custom attributes." },
            learningGoals: "User must add metadata to custom exceptions."
        },
        {
            title: "Hierarchy",
            context: "Grouping errors",
            codeTask: "class AppError(Exception): pass\nclass AuthError(AppError): pass\n# Check if AuthError is a subclass of AppError and print result:\n",
            expectedOutput: "True",
            validation: { mustInclude: ["issubclass"], errorMessage: "Use issubclass() to check hierarchy." },
            learningGoals: "User must understand exception hierarchies."
        },
        {
            title: "Error Logging",
            context: "Logging in except",
            codeTask: "import logging\ntry:\n    1/0\nexcept Exception as e:\n    # Use logging.error(e) and print 'Logged':\n    print('Logged')",
            expectedOutput: "Logged",
            validation: { mustInclude: ["logging.error"], errorMessage: "Use the logging module." },
            learningGoals: "User must learn to log exceptions professionally."
        }
    ],
    "Inheritance": [
        {
            title: "Parent/Child",
            context: "Subclassing",
            codeTask: "class Animal:\n    def speak(self): print('...')\n\n# Create a Dog class that inherits from Animal and calls parent speak():\nclass Dog(Animal):\n    pass\n\nd = Dog()\nd.speak()",
            expectedOutput: "...",
            validation: { mustInclude: ["Dog(Animal)"], errorMessage: "Inherit from Animal: class Dog(Animal):" },
            learningGoals: "User must demonstrate basic class inheritance."
        },
        {
            title: "Super()",
            context: "Accessing Parent methods",
            codeTask: "class A:\n    def __init__(self): self.v = 1\n\n# Inherit B from A, use super().__init__() and print self.v:\nclass B(A):\n    def __init__(self):\n        pass\n\nb = B()\nprint(b.v)",
            expectedOutput: "1",
            validation: { mustInclude: ["super().__init__"], errorMessage: "Use super().__init__() to call parent constructor." },
            learningGoals: "User must use super() to initialize parent state."
        },
        {
            title: "Multiple Inheritance",
            context: "Inheriting from two parents",
            codeTask: "class Flyer: def fly(self): print('Fly')\nclass Swimmer: def swim(self): print('Swim')\n\n# Define Duck inheriting from both. Call both methods:\nclass Duck(Flyer, Swimmer):\n    pass\n\nd = Duck()\nd.fly()\nd.swim()",
            expectedOutput: "Fly\nSwim",
            validation: { mustInclude: ["Duck(Flyer, Swimmer)"], errorMessage: "Inherit from both: class Duck(Flyer, Swimmer):" },
            learningGoals: "User must demonstrate multiple inheritance."
        },
        {
            title: "MRO",
            context: "Method Resolution Order",
            codeTask: "class A: pass\nclass B(A): pass\n# Print B.mro():\n",
            expectedOutput: "[<class 'B'>, <class 'A'>, <class 'object'>]",
            validation: { mustInclude: [".mro()"], errorMessage: "Use the .mro() method." },
            learningGoals: "User must understand how Python searches for methods in complex hierarchies."
        },
        {
            title: "Mixins",
            context: "Modular capabilities",
            codeTask: "class RadioMixin: def play(self): print('Music')\nclass Car(RadioMixin): pass\n# Create a Car and call play():\n",
            expectedOutput: "Music",
            validation: { mustInclude: ["Car(RadioMixin)"], errorMessage: "Use the mixin in the class definition." },
            learningGoals: "User must understand the concept of mixins for sharing functionality."
        }
    ],
    "Polymorphism": [
        {
            title: "Polymorphic Operators",
            context: "One operator, many behaviors",
            codeTask: "# Print the result of 5 + 5, then '5' + '5'. Observe how '+' behaves differently:\n",
            expectedOutput: "10\n55",
            validation: { mustInclude: ["+"], errorMessage: "Use the + operator for both addition and concatenation." },
            learningGoals: "User must understand that operators can have different behaviors based on the data types they operate on."
        },
        {
            title: "Method Overriding",
            context: "Redefining parent behavior",
            codeTask: "class Bird:\n    def move(self): print('Fly')\n\n# Override move() in Penguin to print 'Slide':\nclass Penguin(Bird):\n    def move(self):\n        pass\n\np = Penguin()\np.move()",
            expectedOutput: "Slide",
            validation: { mustInclude: ["def move", "Slide"], errorMessage: "Override move() method in the Penguin class." },
            learningGoals: "User must demonstrate method overriding in a child class."
        },
        {
            title: "Duck Typing",
            context: "If it walks like a duck...",
            codeTask: "class Bird: \n    def quack(self): print('Quack!')\nclass Robot: \n    def quack(self): print('Error: Quack!')\n\n# Call .quack() on both, showing Python doesn't care about the type, only the method:\ndef test(obj):\n    pass\n\ntest(Bird())\ntest(Robot())",
            expectedOutput: "Quack!\nError: Quack!",
            validation: { mustInclude: ["obj.quack()"], errorMessage: "Call the .quack() method on the passed object." },
            learningGoals: "User must understand Duck Typing: that Python focuses on method availability rather than rigid class inheritance."
        },
        {
            title: "Polymorphic Functions",
            context: "Shared interfaces",
            codeTask: "class Cat: def speak(self): return 'Meow'\nclass Dog: def speak(self): return 'Woof'\n\n# Write a function 'make_speak' that takes an animal and prints its .speak():\ndef make_speak(animal):\n    pass\n\nmake_speak(Cat())\nmake_speak(Dog())",
            expectedOutput: "Meow\nWoof",
            validation: { mustInclude: ["animal.speak()"], errorMessage: "Call .speak() on the animal object." },
            learningGoals: "User must create a function that handles different objects polymorphically via a shared method interface."
        },
        {
            title: "Operator Overloading",
            context: "Magic methods like __str__",
            codeTask: "class Point:\n    def __init__(self, x): self.x = x\n    # Implement __str__ to return f'Point({self.x})':\n    \n\np = Point(10)\nprint(p)",
            expectedOutput: "Point(10)",
            validation: { mustInclude: ["def __str__", "return"], errorMessage: "Implement the __str__ magic method." },
            learningGoals: "User must implement a magic method to change how a class interacts with built-in functions like print()."
        },
        {
            title: "Abstract Base Classes",
            context: "Enforcing templates with ABC",
            codeTask: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\n\n# Create Square(Shape) and implement area to return 100:\nclass Square(Shape):\n    pass\n\ns = Square()\nprint(s.area())",
            expectedOutput: "100",
            validation: { mustInclude: ["abstractmethod", "return 100"], errorMessage: "Implement the abstract method 'area' in the Square class." },
            learningGoals: "User must implement an abstract method required by a parent Abstract Base Class."
        }
    ],
    "Encapsulation": [
        {
            title: "Private Vars",
            context: "Double underscore __",
            codeTask: "class Vault:\n    def __init__(self): self.__gold = 100\n\n# Try to print v.__gold inside a try block. Catch Exception and print 'Secret':\nv = Vault()\ntry:\n    pass\nexcept:\n    print('Secret')",
            expectedOutput: "Secret",
            validation: { mustInclude: ["__gold"], errorMessage: "Access the private variable __gold." },
            learningGoals: "User must observe that private variables are not directly accessible."
        },
        {
            title: "Properties",
            context: "@property decorator",
            codeTask: "class User:\n    def __init__(self): self._age = 20\n    # Add @property for age that returns self._age:\n    \n\nu = User()\nprint(u.age)",
            expectedOutput: "20",
            validation: { mustInclude: ["@property", "def age"], errorMessage: "Use the @property decorator." },
            learningGoals: "User must use getters with @property."
        },
        {
            title: "Property Setter",
            context: "@prop.setter",
            codeTask: "class Temp:\n    def __init__(self): self._t = 0\n    @property\n    def t(self): return self._t\n    # Add @t.setter that sets self._t = val:\n    \n\nt = Temp()\nt.t = 100\nprint(t.t)",
            expectedOutput: "100",
            validation: { mustInclude: ["@t.setter"], errorMessage: "Implement the property setter." },
            learningGoals: "User must use setters to control attribute assignment."
        },
        {
            title: "Protected Vars",
            context: "Single underscore _",
            codeTask: "class Tool:\n    def __init__(self): self._id = 1\n# Print the 'protected' _id from a Tool instance:\n",
            expectedOutput: "1",
            validation: { mustInclude: ["_id"], errorMessage: "Access the protected variable _id." },
            learningGoals: "User must understand the convention of protected variables."
        },
        {
            title: "Slots",
            context: "Optimizing memory with __slots__",
            codeTask: "class Fast:\n    __slots__ = ['x']\n# Instantiate Fast and set f.x = 10. Print f.x:\n",
            expectedOutput: "10",
            validation: { mustInclude: ["__slots__"], errorMessage: "Use the __slots__ optimization." },
            learningGoals: "User must learn about memory optimization for many objects."
        }
    ],
    "Standard Library": [
        { title: "Math", context: "import math", codeTask: "import math\n# Print the floor of 3.9 using math.floor():\n", expectedOutput: "3", validation: { mustInclude: ["math.floor"], errorMessage: "Use math.floor()." }, learningGoals: "The user must use math.floor() to round down 3.9 and print the result." },
        { title: "Random", context: "import random", codeTask: "import random\n# Set seed to 42, then print random.randint(1, 10):\nrandom.seed(42)\n", expectedOutput: "10", validation: { mustInclude: ["random.randint"], errorMessage: "Use random.randint()." }, learningGoals: "The user must use random.seed(42) and print random.randint(1, 10)." },
        { title: "OS Module", context: "import os", codeTask: "import os\n# Print the current working directory using os.getcwd():\n", expectedOutput: "any", validation: { mustInclude: ["os.getcwd"], errorMessage: "Use os.getcwd()." }, learningGoals: "The user must use os.getcwd() to print the current working directory. Be lenient with the path content." },
        { title: "DateTime", context: "import datetime", codeTask: "from datetime import date\n# Print today's year using date.today().year:\n", expectedOutput: "2026", validation: { mustInclude: ["date.today().year"], errorMessage: "Get the current year." }, learningGoals: "User must use date.today().year to print the current year (2026)." },
        { title: "Itertools", context: "Efficient iteration", codeTask: "import itertools\n# Use itertools.cycle with [1, 2] and next() 3 times. Print the result:\n", expectedOutput: "1", validation: { mustInclude: ["itertools.cycle"], errorMessage: "Use itertools for advanced iteration." }, learningGoals: "User must use itertools.cycle and the next() function to navigate a sequence." },
        { title: "Collections", context: "Specialized containers", codeTask: "from collections import Counter\n# Use Counter to count 'a' in 'banana'. Print the count of 'a':\nc = Counter('banana')\n", expectedOutput: "3", validation: { mustInclude: ["Counter"], errorMessage: "Use Counter from collections." }, learningGoals: "User must use the collections.Counter class to count characters in a string." }
    ],
    "Custom Modules": [
        { title: "Logic", context: "import my_module", codeTask: "import math as m\n# Use 'm' for math.pi and print it:\n", expectedOutput: "3.141592653589793", validation: { mustInclude: ["as m"], errorMessage: "Use an alias for the module." }, learningGoals: "The user must understand module aliasing." },
        { title: "Creation", context: "Exporting code", codeTask: "print('module.py created')\n# # Imagine multi_replace_file_content created module.py with x=10. Print 'Ok':\n", expectedOutput: "Ok", validation: { mustInclude: ["print"], errorMessage: "Explain how to create a file." }, learningGoals: "User must understand how to create and export code to a file." },
        { title: "Folders/Init", context: "__init__.py", codeTask: "print('Package ready')\n# # A folder with __init__.py is a package. Print 'Ok':\n", expectedOutput: "Ok", validation: { mustInclude: ["print"], errorMessage: "Explain the role of __init__.py." }, learningGoals: "User must learn about package structure." },
        { title: "Relative Imports", context: "from . import x", codeTask: "print('Imported relative')\n# # Use '.' or '..' to import from nearby levels. Print 'Ok':\n", expectedOutput: "Ok", validation: { mustInclude: ["print"], errorMessage: "Understand relative paths." }, learningGoals: "User must grasp relative vs absolute imports." },
        { title: "__name__", context: "Script vs Module", codeTask: "# Print __name__ to see if it equals '__main__':\n", expectedOutput: "__main__", validation: { mustInclude: ["__name__"], errorMessage: "Check the __name__ variable." }, learningGoals: "User must understand the entry point pattern." },
        { title: "Sys.path", context: "Module search path", codeTask: "import sys\n# Check if '' (current dir) is in sys.path and print result:\n", expectedOutput: "True", validation: { mustInclude: ["sys.path"], errorMessage: "Use sys.path to check search directories." }, learningGoals: "User must understand how Python finds modules." }
    ],
    "PIP Management": [
        { title: "Concept", context: "Package Installer", codeTask: "print('Searching requests...')\n# # Simulate searching for the 'requests' library:\n", expectedOutput: "Searching requests...", validation: { mustInclude: ["print"], errorMessage: "Explain the purpose of pip." }, learningGoals: "The user must understand pip's role." },
        { title: "Install/Uninstall", context: "pip install", codeTask: "print('Installing numpy...')\n# # Describe the command to install a package:\n", expectedOutput: "Installing numpy...", validation: { mustInclude: ["install"], errorMessage: "Use the install command." }, learningGoals: "User must know how to add new libraries." },
        { title: "Requirements.txt", context: "Managing dependencies", codeTask: "print('Reading requirements...')\n# # Describe how to install from a file:\n", expectedOutput: "Reading requirements...", validation: { mustInclude: ["-r"], errorMessage: "Use -r requirements.txt." }, learningGoals: "User must understand project dependency files." },
        { title: "Pip List", context: "Checking versions", codeTask: "print('Listing packages...')\n# # Describe the command to see installed packages:\n", expectedOutput: "Listing packages...", validation: { mustInclude: ["list"], errorMessage: "Use 'pip list'." }, learningGoals: "User must learn to audit their environment." },
        { title: "Virtual Envs (venv)", context: "Isolation", codeTask: "print('venv created')\n# # Explain why we use virtual environments:\n", expectedOutput: "venv created", validation: { mustInclude: ["print"], errorMessage: "Explain the benefit of venv." }, learningGoals: "User must understand environment isolation." },
        { title: "PIP Upgrade", context: "Stay updated", codeTask: "print('Upgrading...')\n# # Describe the command to upgrade a package:\n", expectedOutput: "Upgrading...", validation: { mustInclude: ["--upgrade"], errorMessage: "Use --upgrade flag." }, learningGoals: "User must learn to keep packages current." }
    ],
    "NumPy Basics": [
        { title: "Arrays", context: "np.array", codeTask: "import numpy as np\n# Create a 2D array [[1, 2], [3, 4]] and print its shape:\n", expectedOutput: "(2, 2)", validation: { mustInclude: ["np.array", ".shape"], errorMessage: "Create a 2D array and check shape." }, learningGoals: "The user must create NumPy arrays." },
        { title: "Slicing", context: "Extracting data", codeTask: "import numpy as np\na = np.array([1, 2, 3, 4, 5])\n# Print elements from index 1 to 4 (exclusive):\n", expectedOutput: "[2 3 4]", validation: { mustInclude: ["a[1:4]"], errorMessage: "Use slice notation [start:stop]." }, learningGoals: "User must slice 1D arrays." },
        { title: "Broadcasting", context: "Universal Ops", codeTask: "import numpy as np\na = np.array([1, 2])\n# Multiply 'a' by 10 and print the result:\n", expectedOutput: "[10 20]", validation: { mustInclude: ["* 10"], errorMessage: "Perform broadcasting multiplication." }, learningGoals: "User must understand element-wise operations." },
        { title: "Reshaping", context: ".reshape()", codeTask: "import numpy as np\na = np.arange(4)\n# Reshape 'a' into (2, 2) and print it:\n", expectedOutput: "[[0 1]\n [2 3]]", validation: { mustInclude: ["reshape(2, 2)"], errorMessage: "Change the array and dimensions." }, learningGoals: "User must modify array structure." },
        { title: "UFuncs", context: "Universal functions", codeTask: "import numpy as np\na = np.array([1, 4, 9])\n# Print the square root of 'a' using np.sqrt():\n", expectedOutput: "[1. 2. 3.]", validation: { mustInclude: ["np.sqrt"], errorMessage: "Use vectorized math functions." }, learningGoals: "User must use NumPy's built-in math functions." },
        { title: "Random", context: "np.random", codeTask: "import numpy as np\nnp.random.seed(0)\n# Generate a random float between 0 and 1 using np.random.rand():\n", expectedOutput: "0.5488135039273248", validation: { mustInclude: ["np.random.rand"], errorMessage: "Use the random module in NumPy." }, learningGoals: "User must generate test data using random." }
    ],
    "Pandas Basics": [
        { title: "DataFrames", context: "pd.DataFrame", codeTask: "import pandas as pd\n# Create a DataFrame from {'A': [1, 2]} and print it:\n", expectedOutput: "   A\n0  1\n1  2", validation: { mustInclude: ["pd.DataFrame"], errorMessage: "Create a pandas DataFrame." }, learningGoals: "The user must create a DataFrame." },
        { title: "Read CSV", context: "pd.read_csv", codeTask: "import pandas as pd\n# Describe how to load 'data.csv' into a DataFrame 'df':\n", expectedOutput: "df = pd.read_csv('data.csv')", validation: { mustInclude: ["read_csv"], errorMessage: "Use pd.read_csv()." }, learningGoals: "User must learn to load external data." },
        { title: "Series vs DF", context: "1D vs 2D", codeTask: "import pandas as pd\n# Create a Series [10, 20] and print its type:\n", expectedOutput: "<class 'pandas.core.series.Series'>", validation: { mustInclude: ["pd.Series"], errorMessage: "Create a Series object." }, learningGoals: "User must distinguish between Series and DataFrames." },
        { title: "Head/Tail", context: "Previewing data", codeTask: "import pandas as pd\ndf = pd.DataFrame({'a': range(10)})\n# Print the first 3 rows of df using .head():\n", expectedOutput: "   a\n0  0\n1  1\n2  2", validation: { mustInclude: [".head(3)"], errorMessage: "Use .head(n) to preview rows." }, learningGoals: "User must learn to inspect data distributions." },
        { title: "Columns", context: "Accessing metadata", codeTask: "import pandas as pd\ndf = pd.DataFrame({'A': [1], 'B': [2]})\n# Print the list of columns in df:\n", expectedOutput: "Index(['A', 'B'], dtype='object')", validation: { mustInclude: [".columns"], errorMessage: "Access the .columns attribute." }, learningGoals: "User must learn to inspect DataFrame structure." },
        { title: "Stats", context: ".describe()", codeTask: "import pandas as pd\ndf = pd.DataFrame({'v': [1, 2, 3]})\n# Print the mean of column 'v':\n", expectedOutput: "2.0", validation: { mustInclude: [".mean()"], errorMessage: "Calculate the average value." }, learningGoals: "User must perform basic statistical analysis." }
    ],
    "Data Cleaning": [
        { title: "Handling Nulls", context: ".isnull()", codeTask: "import pandas as pd\ns = pd.Series([1, None])\n# Print the sum of isnull() for s:\n", expectedOutput: "1", validation: { mustInclude: [".isnull()", ".sum()"], errorMessage: "Count null values." }, learningGoals: "The user must find missing data." },
        { title: "Dropna/Fillna", context: "Cleaning missing data", codeTask: "import pandas as pd\ns = pd.Series([1, None])\n# Fill missing values with 0 and print s:\n", expectedOutput: "0    1.0\n1    0.0\ndtype: float64", validation: { mustInclude: [".fillna(0)"], errorMessage: "Fill nulls using .fillna()." }, learningGoals: "User must learn to handle missing values." },
        { title: "Duplicates", context: ".drop_duplicates()", codeTask: "import pandas as pd\ndf = pd.DataFrame({'a': [1, 1]})\n# Remove duplicate rows and print the result:\n", expectedOutput: "   a\n0  1", validation: { mustInclude: [".drop_duplicates"], errorMessage: "Use .drop_duplicates()." }, learningGoals: "User must identify and remove redundant data." },
        { title: "Dtypes", context: "Data types", codeTask: "import pandas as pd\ndf = pd.DataFrame({'a': [1]})\n# Print the dtypes of the DataFrame:\n", expectedOutput: "a    int64\ndtype: object", validation: { mustInclude: [".dtypes"], errorMessage: "Check data types." }, learningGoals: "User must audit data formats." },
        { title: "Renaming", context: ".rename()", codeTask: "import pandas as pd\ndf = pd.DataFrame({'old': [1]})\n# Rename 'old' to 'new' and print columns:\n", expectedOutput: "Index(['new'], dtype='object')", validation: { mustInclude: ["columns={'old': 'new'}"], errorMessage: "Rename columns using a dictionary." }, learningGoals: "User must modify metadata." },
        { title: "Type Conversion", context: ".astype()", codeTask: "import pandas as pd\ns = pd.Series(['1', '2'])\n# Convert s to integers and print its sum:\n", expectedOutput: "3", validation: { mustInclude: [".astype(int)"], errorMessage: "Cast types using .astype()." }, learningGoals: "User must perform type casting for analysis." }
    ],
    "Manipulation": [
        { title: "Filtering", context: "Boolean indexing", codeTask: "import pandas as pd\ndf = pd.DataFrame({'val': [10, 20, 30]})\n# Print df where val > 20:\n", expectedOutput: "   val\n2   30", validation: { mustInclude: ["df[", "> 20"], errorMessage: "Filter the DataFrame." }, learningGoals: "The user must filter data using boolean index." },
        { title: "Grouping", context: ".groupby()", codeTask: "import pandas as pd\ndf = pd.DataFrame({'k': ['A', 'A', 'B'], 'v': [1, 2, 3]})\n# Get the sum of 'v' grouped by 'k' and print it:\n", expectedOutput: "k\nA    3\nB    3\nName: v, dtype: int64", validation: { mustInclude: [".groupby('k')", ".sum()"], errorMessage: "Use groupby and aggregate." }, learningGoals: "User must perform categorical aggregation." },
        { title: "Merging", context: "pd.merge", codeTask: "import pandas as pd\nd1 = pd.DataFrame({'id': [1], 'n': ['A']})\nd2 = pd.DataFrame({'id': [1], 'v': [10]})\n# Merge d1 and d2 on 'id' and print result:\n", expectedOutput: "   id  n   v\n0   1  A  10", validation: { mustInclude: ["pd.merge"], errorMessage: "Combine datasets on a key." }, learningGoals: "User must perform SQL-style joins." },
        { title: "Sorting", context: ".sort_values()", codeTask: "import pandas as pd\ndf = pd.DataFrame({'v': [2, 1, 3]})\n# Sort df by 'v' in descending order and print result:\n", expectedOutput: "   v\n2  3\n0  2\n1  1", validation: { mustInclude: ["ascending=False"], errorMessage: "Sort descending." }, learningGoals: "User must organize data." },
        { title: "Concat", context: "pd.concat", codeTask: "import pandas as pd\ns1 = pd.Series([1])\ns2 = pd.Series([2])\n# Concatenate s1 and s2 and print result:\n", expectedOutput: "0    1\n0    2\ndtype: int64", validation: { mustInclude: ["pd.concat"], errorMessage: "Stack data objects." }, learningGoals: "User must append datasets." },
        { title: "Apply", context: "Row-wise logic", codeTask: "import pandas as pd\ns = pd.Series([1, 2])\n# Use .apply(lambda x: x*x) and print s:\n", expectedOutput: "0    1\n1    4\ndtype: int64", validation: { mustInclude: [".apply("], errorMessage: "Apply a function to the series." }, learningGoals: "User must apply custom logic to datasets." }
    ],
    // --- PROJECTS ---
    "Simple CLI Calculator (Duolingo-style UI)": [
        {
            title: "Project: CLI Calculator",
            context: "Phase 1 Basics",
            educationalTip: "Combine inputs and if-statements to handle user commands. Use float() for accurate math.",
            startingCode: "# Build a CLI Calculator\nprint('--- NexGen Calculator ---')\n\n# 1. Get num1\n\n# 2. Get operator (+, -, *, /)\n\n# 3. Get num2\n\n# 4. Use if/elif/else to calculate and print 'Result: [value]'\n",
            codeTask: "Complete the calculator logic to ask for two numbers and an operator, then print the result.",
            expectedOutput: "Result:",
            validation: { mustInclude: ["input", "if", "elif", "else"], errorMessage: "You must use input() to get values, and if/elif/else blocks to handle operations." },
            learningGoals: "User must handle multiple user inputs, convert them to numbers, and use conditional logic to perform math."
        }
    ],
    "Contact Book Data Manager": [
        {
            title: "Project: Contact Book",
            context: "Phase 1 Graduation",
            educationalTip: "Use a dictionary to store contacts. Keys are names, values are phone numbers.",
            startingCode: "# Build a simple contact book dictionary.\ncontacts = {}\n\n# 1. Add a contact 'Neo' with number '555-1234'\n\n# 2. Add 'Trinity' with '555-9999'\n\n# 3. Print Neo's number using the dictionary key.\n",
            codeTask: "Create a dictionary called 'contacts', add two people, and print one of their numbers.",
            expectedOutput: "555-1234",
            validation: { mustInclude: ["contacts", "{", "}", "=", "Neo", "Trinity"], errorMessage: "Create a dictionary called contacts and add 'Neo' and 'Trinity'." },
            learningGoals: "User must manage data using dictionaries and assign values.",
        }
    ],
    "Automated Text Analyzer": [
        {
            title: "Project: Text Analyzer",
            context: "Files & Strings",
            educationalTip: "Use .split() to turn a string into a list of words, and len() to count them.",
            startingCode: "text = 'Hello NexGen World of Python Explorers'\n\n# 1. Count total characters\n\n# 2. Count total words (split by spaces)\n\n# 3. Print the results in a formatted string:\n# 'Words: X, Chars: Y'\n",
            codeTask: "Write a script that counts words and characters in the variable 'text'.",
            expectedOutput: "Words: 6, Chars: 40",
            validation: { mustInclude: ["len(", ".split("], errorMessage: "Use len() to count and .split() to break the string into words." },
            learningGoals: "User must demonstrate string splitting, counting, and pattern matching."
        }
    ],
    "URL Shortener Logic": [
        {
            title: "Project: URL Shortener",
            context: "Advanced Logic",
            educationalTip: "Map long URLs to short codes using a dictionary. Create a function to handle the shortening process.",
            startingCode: "import random\nurl_map = {}\n\ndef shorten(long_url):\n    # 1. Generate a random 4-digit code as a string\n    \n    # 2. Store long_url in url_map with the code as the key\n    \n    # 3. Return the short URL like 'nex.link/[code]'\n    pass\n\n# Add 'https://google.com' and print the shortened URL:\n",
            codeTask: "Create a URL shortener function that stores the URL in a dictionary and returns a short link.",
            expectedOutput: "nex.link/",
            validation: { mustInclude: ["url_map[", "return"], errorMessage: "Store the URL in url_map using the generated code as the key and return the new link." },
            learningGoals: "User must use dictionaries and randomization logic within a function."
        }
    ],
    "NexGen Bank Management System": [
        {
            title: "Project: Bank System",
            context: "OOP Mastery",
            educationalTip: "Use OOP Classes! Create an __init__ for balance, and methods for deposit and withdraw.",
            startingCode: "class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    # Add a 'deposit' method\n\n    # Add a 'withdraw' method\n    \n    def show_balance(self):\n        print(f'Balance for {self.owner}: ${self.balance}')\n\n# Create an account for 'Alex' with $100. Deposit $50, withdraw $20, then show balance.\n",
            codeTask: "Complete the Account class with deposit() and withdraw() methods. Test it.",
            expectedOutput: "Balance for Alex: $130",
            validation: { mustInclude: ["def deposit", "def withdraw", "self.balance"], errorMessage: "Define deposit and withdraw methods that update self.balance." },
            learningGoals: "User must demonstrate OOP state manipulation and method definitions."
        }
    ],
    "Personal String-Op Library": [
        {
            title: "Project: String Library",
            context: "Standard Library",
            educationalTip: "Package functions that accept a string and return modified versions.",
            startingCode: "class StringMagic:\n    @staticmethod\n    def reverse(txt):\n        # Return reversed string\n        pass\n        \n    @staticmethod\n    def count_vowels(txt):\n        # Return number of vowels\n        pass\n\n# Use your class to print the reverse of 'Python' \n",
            codeTask: "Implement static methods in a class to act as a custom library.",
            expectedOutput: "nohtyP",
            validation: { mustInclude: ["staticmethod", "return"], errorMessage: "Implement the methods using the @staticmethod decorator." },
            learningGoals: "User must create a modular library of functions mapped to a class namespace."
        }
    ],
    "Duolingo-Style Data Visualizer": [
        {
            title: "Project: Data Visualizer",
            context: "Data Science Mastery",
            educationalTip: "Use Pandas to create a DataFrame from a dictionary and calculate the mean.",
            startingCode: "import pandas as pd\n\ndata = {\n    'Day': ['Mon', 'Tue', 'Wed'],\n    'XP': [150, 200, 350]\n}\n\n# 1. Create a DataFrame 'df' from 'data'\n\n# 2. Calculate the mean of the 'XP' column\n\n# 3. Print 'Average XP: [value]'\n",
            codeTask: "Load a simple dataset into a Pandas DataFrame and calculate the column average.",
            expectedOutput: "Average XP: 233.33333333333334",
            validation: { mustInclude: ["pd.DataFrame", ".mean()"], errorMessage: "Use pd.DataFrame() and the .mean() method." },
            learningGoals: "User must demonstrate Pandas DataFrame initialization and aggregation."
        }
    ],
    // --- PHASE MASTERS ---
    "PHASE 1 MASTER": [
        {
            title: "Phase 1: The Frontier",
            context: "Final Challenge",
            educationalTip: "The ultimate test of Python Fundamentals.",
            codeTask: "# Complete the Phase 1 Final Challenge to advance.\n",
            learningGoals: "Comprehensive mastery of Phase 1 concepts."
        }
    ],
    "PHASE 2 MASTER": [
        {
            title: "Phase 2: The Architect",
            context: "Final Challenge",
            educationalTip: "Master patterns and efficiency.",
            codeTask: "# Complete the Phase 2 Final Challenge to advance.\n",
            learningGoals: "Comprehensive mastery of Phase 2 concepts."
        }
    ],
    "PHASE 3 MASTER": [
        {
            title: "Phase 3: The AI Specialist",
            context: "Final Challenge",
            educationalTip: "You are becoming a professional engineer.",
            codeTask: "# Complete the Phase 3 Final Challenge to graduate.\n",
            learningGoals: "Comprehensive mastery of Phase 3 concepts."
        }
    ]
};
