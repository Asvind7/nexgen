import { SYNTAX_QUESTION_BANK, SYNTAX_LEVEL_1 } from './modules/phase1/week1/Syntax';
import { VARIABLES_LEVEL_1, VARIABLES_QUESTION_BANK } from './modules/phase1/week1/Variables';
import { DATA_TYPES_LEVEL_1, DATA_TYPES_QUESTION_BANK } from './modules/phase1/week1/DataTypes';
import { OPERATORS_LEVEL_1, OPERATORS_QUESTION_BANK } from './modules/phase1/week1/Operators';
import { CONDITIONALS_LEVEL_1, CONDITIONALS_QUESTION_BANK } from './modules/phase1/week1/Conditionals';
import { LOOPS_LEVEL_1, LOOPS_QUESTION_BANK } from './modules/phase1/week1/Loops';
import { FUNCTIONS_LEVEL_1, FUNCTIONS_QUESTION_BANK } from './modules/phase1/week1/Functions';
import { MAP_LEVEL_1, MAP_QUESTION_BANK } from './modules/phase1/week1/Map';
import { LAMBDA_LEVEL_1, LAMBDA_QUESTION_BANK } from './modules/phase1/week1/Lambda';

import { LISTS_LEVEL_1, LISTS_QUESTION_BANK } from './modules/phase1/week3/Lists';
import { TUPLES_LEVEL_1, TUPLES_QUESTION_BANK } from './modules/phase1/week3/Tuples';
import { DICTIONARIES_LEVEL_1, DICTIONARIES_QUESTION_BANK } from './modules/phase1/week3/Dictionaries';
import { SETS_LEVEL_1, SETS_QUESTION_BANK } from './modules/phase1/week3/Sets';
import { COMPREHENSIONS_LEVEL_1, COMPREHENSIONS_QUESTION_BANK } from './modules/phase1/week3/Comprehensions';

import { STRING_MANIPULATION_LEVEL_1, STRING_MANIPULATION_QUESTION_BANK } from './modules/phase2/week4/StringManipulation';
import { REGEX_LEVEL_1, REGEX_QUESTION_BANK } from './modules/phase2/week4/RegEx';
import { FILE_IO_LEVEL_1, FILE_IO_QUESTION_BANK } from './modules/phase2/week4/FileIO';

// --- PHASE 3 WEEK 5: OOP ---
import { CLASSES_LEVEL_1, CLASSES_QUESTION_BANK } from './modules/phase3/week5/Classes';
import { INHERITANCE_LEVEL_1, INHERITANCE_QUESTION_BANK } from './modules/phase3/week5/Inheritance';
import { POLYMORPHISM_LEVEL_1, POLYMORPHISM_QUESTION_BANK } from './modules/phase3/week5/Polymorphism';
import { ENCAPSULATION_LEVEL_1, ENCAPSULATION_QUESTION_BANK } from './modules/phase3/week5/Encapsulation';
import { DECORATORS_LEVEL_1, DECORATORS_QUESTION_BANK } from './modules/phase3/week5/Decorators';
import { GENERATORS_LEVEL_1, GENERATORS_QUESTION_BANK } from './modules/phase3/week5/Generators';

// --- PHASE 3 WEEK 6: MODULES ---
import { STANDARD_LIBRARY_LEVEL_1, STANDARD_LIBRARY_QUESTION_BANK } from './modules/phase3/week6/StandardLibrary';
import { CUSTOM_MODULES_LEVEL_1, CUSTOM_MODULES_QUESTION_BANK } from './modules/phase3/week6/CustomModules';
import { PIP_LEVEL_1, PIP_QUESTION_BANK } from './modules/phase3/week6/Pip';
import { EXCEPTIONS_LEVEL_1, EXCEPTIONS_QUESTION_BANK } from './modules/phase3/week6/Exceptions';

// --- PHASE 3 WEEK 7: DATA SCIENCE ---
import { NUMPY_LEVEL_1, NUMPY_QUESTION_BANK } from './modules/phase3/week7/NumPy';
import { PANDAS_LEVEL_1, PANDAS_QUESTION_BANK } from './modules/phase3/week7/Pandas';
import { DATA_CLEANING_LEVEL_1, DATA_CLEANING_QUESTION_BANK } from './modules/phase3/week7/DataCleaning';
import { MANIPULATION_LEVEL_1, MANIPULATION_QUESTION_BANK } from './modules/phase3/week7/Manipulation';

// --- MILESTONES ---
import { BASICS_FOUNDATION_EXAM } from './modules/phase1/milestones/BasicsFoundation';
import { LOGIC_GATES_EXAM } from './modules/phase1/milestones/LogicGates';
import { COLLECTION_ARCHITECT_EXAM } from './modules/phase2/milestones/CollectionArchitect';
import { TEXT_STORAGE_EXAM } from './modules/phase2/milestones/TextStorage';
import { SYSTEM_ARCHITECT_EXAM } from './modules/phase3/milestones/SystemArchitect';
import { DATA_SCIENTIST_EXAM } from './modules/phase3/milestones/DataScientist';
import { ADVANCED_LOGIC_EXAM } from './modules/phase3/milestones/AdvancedLogic';
import { PACKAGE_ARCHITECT_EXAM } from './modules/phase3/milestones/PackageArchitect';

// --- PHASE MASTERS ---
import { PHASE_1_MASTER_EXAM } from './modules/phase1/milestones/Phase1Master';
import { PHASE_2_MASTER_EXAM } from './modules/phase2/milestones/Phase2Master';
import { PHASE_3_MASTER_EXAM } from './modules/phase3/milestones/Phase3Master';

export const BASICS_EXAMS = {
    // -------------------------------------------------------------------------
    // MILESTONES
    // -------------------------------------------------------------------------
    "Basics Foundation Milestone": BASICS_FOUNDATION_EXAM,
    "Logic Gates & Control Flow Mastery": LOGIC_GATES_EXAM,
    "PHASE 1 MASTER": PHASE_1_MASTER_EXAM,

    "Collection Architect Exam": COLLECTION_ARCHITECT_EXAM,
    "Text & Storage Master Exam": TEXT_STORAGE_EXAM,
    "PHASE 2 MASTER": PHASE_2_MASTER_EXAM,

    "Advanced Logic Master Exam": ADVANCED_LOGIC_EXAM,
    "System Architect Exam": SYSTEM_ARCHITECT_EXAM,
    "Package Architect Exam": PACKAGE_ARCHITECT_EXAM,
    "Data Scientist Certification": DATA_SCIENTIST_EXAM,
    "PHASE 3 MASTER": PHASE_3_MASTER_EXAM,

    // -------------------------------------------------------------------------
    // LEVEL EXAMS (Backward Compatibility)
    // -------------------------------------------------------------------------
    "Syntax": SYNTAX_LEVEL_1,
    "Variables": { title: "Variable Vault", passingScore: 300, questions: VARIABLES_LEVEL_1.questions },
    "Data Types": { title: "The Data Refinery ⚗️", passingScore: 300, questions: DATA_TYPES_LEVEL_1.questions },
    "Operators": { title: "Operator Overload ⚡", passingScore: 300, questions: OPERATORS_LEVEL_1.questions },
    "Conditionals": { title: "Logic Gatekeeper 🛡️", passingScore: 300, questions: CONDITIONALS_LEVEL_1.questions },
    "Loops": { title: "The Cyclotron 🔄", passingScore: 300, questions: LOOPS_LEVEL_1.questions },
    "Functions": { title: "Module Factory 🏭", passingScore: 300, questions: FUNCTIONS_LEVEL_1.questions },
    "Lists": LISTS_LEVEL_1,
    "Tuples": TUPLES_LEVEL_1,
    "Dictionaries": DICTIONARIES_LEVEL_1,
    "Sets": SETS_LEVEL_1,
    "Comprehensions": COMPREHENSIONS_LEVEL_1,
    "Lambda": LAMBDA_LEVEL_1,
    "Map/Filter/Reduce": MAP_LEVEL_1,
    "String Manipulation": STRING_MANIPULATION_LEVEL_1,
    "RegEx": REGEX_LEVEL_1,
    "File I/O": FILE_IO_LEVEL_1,
    "Classes/Objects": CLASSES_LEVEL_1,
    "Inheritance": INHERITANCE_LEVEL_1,
    "Polymorphism": POLYMORPHISM_LEVEL_1,
    "Encapsulation": ENCAPSULATION_LEVEL_1,
    "Decorators": DECORATORS_LEVEL_1,
    "Generators": GENERATORS_LEVEL_1,
    "Standard Library": STANDARD_LIBRARY_LEVEL_1,
    "Custom Modules": CUSTOM_MODULES_LEVEL_1,
    "PIP Management": PIP_LEVEL_1,
    "Exception Handling": EXCEPTIONS_LEVEL_1,
    "NumPy Basics": NUMPY_LEVEL_1,
    "Pandas Basics": PANDAS_LEVEL_1,
    "Data Cleaning": DATA_CLEANING_LEVEL_1,
    "Manipulation": MANIPULATION_LEVEL_1,
};

export const LEVEL_1_EXAM = BASICS_EXAMS["Syntax"];

export const ADAPTIVE_QUESTION_BANK = {
    "Syntax": SYNTAX_QUESTION_BANK,
    "Variables": VARIABLES_QUESTION_BANK,
    "Data Types": DATA_TYPES_QUESTION_BANK,
    "Operators": OPERATORS_QUESTION_BANK,
    "Conditionals": CONDITIONALS_QUESTION_BANK,
    "Loops": LOOPS_QUESTION_BANK,
    "Functions": FUNCTIONS_QUESTION_BANK,
    "Lists": LISTS_QUESTION_BANK,
    "Tuples": TUPLES_QUESTION_BANK,
    "Dictionaries": DICTIONARIES_QUESTION_BANK,
    "Sets": SETS_QUESTION_BANK,
    "Comprehensions": COMPREHENSIONS_QUESTION_BANK,
    "String Manipulation": STRING_MANIPULATION_QUESTION_BANK,
    "RegEx": REGEX_QUESTION_BANK,
    "File I/O": FILE_IO_LEVEL_1.questions || FILE_IO_QUESTION_BANK, // Safety check
    "Classes/Objects": CLASSES_QUESTION_BANK,
    "Inheritance": INHERITANCE_QUESTION_BANK,
    "Polymorphism": POLYMORPHISM_QUESTION_BANK,
    "Encapsulation": ENCAPSULATION_QUESTION_BANK,
    "Decorators": DECORATORS_QUESTION_BANK,
    "Generators": GENERATORS_QUESTION_BANK,
    "Standard Library": STANDARD_LIBRARY_QUESTION_BANK,
    "Custom Modules": CUSTOM_MODULES_QUESTION_BANK,
    "PIP Management": PIP_QUESTION_BANK,
    "Exception Handling": EXCEPTIONS_QUESTION_BANK,
    "NumPy Basics": NUMPY_QUESTION_BANK,
    "Pandas Basics": PANDAS_QUESTION_BANK,
    "Data Cleaning": DATA_CLEANING_QUESTION_BANK,
    "Manipulation": MANIPULATION_QUESTION_BANK
};
