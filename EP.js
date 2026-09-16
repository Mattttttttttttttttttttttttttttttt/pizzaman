const SCRAMBLES = {
    "lunge": [
        "R U R' U R L' R' U R L R' U R L' R' U R L U' R'",
        "R L R' U R L' U' R' U L U L' U' L U' L' U' R U R'",
        "R U' R U L R' U R L' U' R' U L U L' U' L U' L' R'",
        "R' U R' U' R L R' U' R L' R' U' R L R' U' R L' U' R",
        "R' L U' R' U' R U R' U R U L' U' R' L U' L' R U R",
        "R' U' L' R U L U' R' U' R U R' U R U L' U' R' L R",
        "L R' U L U L' U' L U' L' U' R U L R' U R L' U' L'",
        "L U' L U L' R' L U L' R L U L' R' L U L' R U L'",
        "L U R L' U' R' U L U L' U' L U' L' U' R U L R' L'",
        "L' R' L U' L' R U L U' R' U' R U R' U R U L' U' L",
        "L' U' L U' L' R L U' L' R' L U' L' R L U' L' R' U L",
        "L' U L' U' R' L U' L' R U L U' R' U' R U R' U R L",
        "L U L' R U R' U L U' L' U R' L R' U' R' U' R' L' R",
        "L U R L U L' R' L U L' R L U L' R' L U L' U' L'",
        "L' R' U R U L' U' R' L U L' R U L U' R' U' R U' L",
        "L' U R U L' U' R' L U L' R U L U' R' U' R U' R' L",
        "R L U' L' U' R U L R' U' R L' U' R' U L U L' U R'",
        "R U' L' U' R U L R' U' R L' U' R' U L U L' U L R'",
        "R' U' L' R' U' R L R' U' R L' R' U' R L R' U' R U R",
        "R' U' R L' U' L U' R' U R U' L R' L U L U L R L'"
    ],
    "left arm": [
        "R U L' R' U' R L R' U' R L' R' U' R L R' U' R U' R'",
        "R' U L R' U R L' R' U R L R' U R L' R' U R U' R",
        "R' L R' U R L' U' R' U L U L' U' L U' L' U' R U R",
        "R' L' R U L U' R' U' R U' R' U R U L' U' R' L U R",
        "R' U' R U L R' U R L' U' R' U L U L' U' L U' L' R",
        "R' L R U R U R L' R U' L U L' U' R U' R' L U' L'",
        "L U L R' U' R L' U' R' U L U L' U L U' L' U' R L'",
        "L' R' U' R U' R' U R U L' U' R' L U L' R U L U' L",
        "L' U L U' R' U' R U' R' U R U L' U' R' L U L' R L",
        "L U L U' L' R L U' L' R' L U' L' R L U' L' R' U' L'",
        "L' R U R' U R U L' U' R' L U' L' R U L U' R' U' L",
        "L' U R' U R U L' U' R' L U' L' R U L U' R' U' R L",
        "R' L' R U L U' R' U' R U R' U R U L' U' R' L U' R",
        "R' U' R' U' R L R' U' R L' R' U' R L R' U' R L' U R",
        "L U L U' R' U' R U R' U R U L' U' R' L U' L' R L'",
        "L' U L U' R' U' R U R' U R U L' U' R' L U' L' R L"
    ],
    "right arm": [
        "R L U L' U L U' L' U' R U L R' U' R L' U' R' U R'",
        "R U' R' U L U L' U L U' L' U' R U L R' U' R L' R'",
        "L R' L' U' L' U' L' R L' U R' U' R U L' U L R' U R",
        "R' U' R' L U L' R U L U' R' U' R U' R' U R U L' R",
        "L R L' U' R' U L U L' U L U' L' U' R U L R' U' L'",
        "L R' L U' L' R U L U' R' U' R U R' U R U L' U' L'",
        "L U' R' L U' L' R L U' L' R' L U' L' R L U' L' U L'",
        "L U L' U' R' L U' L' R U L U' R' U' R U R' U R L'",
        "L' U' R L U L' R' L U L' R L U L' R' L U L' U L",
        "R U' R' U L U L' U' L U' L' U' R U L R' U R L' R'",
        "R' U' R' U L U L' U' L U' L' U' R U L R' U R L' R",
        "L U L U L' R' L U L' R L U L' R' L U L' R U' L'",
        "L R L' U' R' U L U L' U' L U' L' U' R U L R' U L'",
        "R L' U' L U' L' U' R U L R' U R L' U' R' U L U R'",
        "R U' L U' L' U' R U L R' U R L' U' R' U L U L' R'",
        "R' U' R' U R L' R' U R L R' U R L' R' U R L U R"
    ],
    "lizard": [
        "R' L U L' U L U' L' U' R U L R' U' R L' U' R' U R",
        "R' U' R' U L U L' U L U' L' U' R U L R' U' R L' R",
        "L R' U' R U' R' U R U L' U' R' L U L' R U L U' L'",
        "L U L U' R' U' R U' R' U R U L' U' R' L U L' R L'",
        "R L R' U' R L' U' R' U L U L' U L U' L' U' R U R'",
        "R' L R' U' R L' U' R' U L U L' U L U' L' U' R U R",
        "L U R' L U' L' R L U' L' R' L U' L' R L U' L' U' L'",
        "L U' R L' U' R' U L U L' U L U' L' U' R U L R' L'",
        "R' U' L R' U R L' R' U R L R' U R L' R' U R U R",
        "R' U L' R U L U' R' U' R U' R' U R U L' U' R' L R",
        "L R' L U L' R U L U' R' U' R U' R' U R U L' U' L'",
        "L' R' L U L' R U L U' R' U' R U' R' U R U L' U' L"
    ],
    "right Ol": [
        "R L U' L' U' R U L R' U R L' U' R' U L U L' U' R'",
        "R U L' U' L U' L' U' R U L R' U R L' U' R' U L R'",
        "R L' R U R' U' L R U L' U R' U' L R U L' R' L R'",
        "R L' R U R' U R U' L U' R' L' U L R U L' R' L R'",
        "R' U L R' U' R L' R' U' R L R' U' R L' R' U' R U' R",
        "L R' L' U L R L' R' U L' U' L R U R' L' U L U R",
        "R' L' R L R' U' R L' R' U' R L R' U' R L' R' U' L R",
        "L' R' L U' R' L' R U' L R L' R' L U' R' L' R U' L R",
        "R' L' U L U R U L R' L' U L R L' R' U L' U' L R",
        "R' U' L' R L R' U L' U' R U' L' R' L U' R U' R' L R",
        "R' L' U' R L' R' L R U' L R' L' U' R L' R' L R U' L",
        "R' U L R' L' U' L R L' U' R' U' R' L' R' L U L' R L",
        "L' R' U' L' R L U' L' R' L U' L' R L U' L' R' L R L"
    ],
    "lean right Ol": [
        "R U R' U' R L' R' U' R L R' U' R L' R' U' R L U' R'",
        "R L R' L U' L' R L' U L R' L U L U L R L' U R'",
        "R U' R' U' R L' R' U' R L R' U' R L' R' U' R L U R'",
        "L' U' R L' R' L R U' L R' L' U' R L' R' L R U' L R'",
        "R' L U' L' U' R U L R' U R L' U' R' U L U L' U' R",
        "R' U L' U' L U' L' U' R U L R' U R L' U' R' U L R",
        "R L' R L R' L' R U' L U R U L' U' L R L' R L R",
        "L R L' R' U L' U' L R U R' L' U L U R U L R' L'",
        "R' L' R' L R L' U' L U R U L' U' L' R L R L' R L'",
        "L' U L U' L' R' L U' L' R L U' L' R' L U' L' R U' L",
        "R L' R' L U' R' L' R U' L R L' R' L U' R' L' R U' L",
        "L' U L U L' U' R U' L R' L' U' R U' L R' U' L' U' L",
        "R' U' L U R U' L' R U R' L' U L U R L' U R' U L",
        "L' U' R L' U' L U' L R' L' R L' U' L U' L R' L' U L",
        "L' R L' R' L U' L' R L U' L' R' L U' L' R L U' R' L",
        "L' R' L U' L' U' R U R L R' U R L' R' U' R' U R L"
    ],
    "right Or": [
        "R L' U' R U L R' U' R L' U' R' U L U L' U L U' R'",
        "R U L U' L' U' R U L R' U' R L' U' R' U L U L' R'",
        "R L' R L U' R' L' U' L R U L' U R' U' R U' R' L R'",
        "R L' R L U' R' L' U R U' L U' R' L' U R U' R' L R'",
        "R' U R' U R L R' U R L' R' U R L R' U R L' U' R",
        "L' R' L U' L' R L R U R U L R' L' U L R L' U' R",
        "R' L' R U R' U L' R L U R' U L U' R L' R' L U R",
        "R' L' U L U' R L R' L' U' L R L' U' R' U' L' U' L R",
        "L' U R' L' R L R' U L R L' U R' L' R L R' U L R",
        "R' L' U R L R' U R L' R' U R L R' U R L' R' L R",
        "R' U' L' U' L R U' R' L' U L U' R L R' L' U' L R L'",
        "L' R' L' R L U L' R' L U L' R L U L' R' L U R L",
        "R' L' U R' L R U L' R L R' L' U R' L R U L' R L"
    ],
    "lean right Or": [
        "R U L' R' U R L R' U R L' R' U R L R' U R U' R'",
        "L' U' L R U' R' L' U L U' R L R' L' U' L R L' U' R'",
        "R U' L' R' U R L R' U R L' R' U R L R' U R U R'",
        "L' U' R U R' U L R U L' U' L' U R' U' L U R L R'",
        "L' U R' L R U L' R L R' L' U R' L R U L' R L R'",
        "R' L' U' R U L R' U' R L' U' R' U L U L' U L U' R",
        "R' U L U' L' U' R U L R' U' R L' U' R' U L U L' R",
        "L' U L U R L' U R' U L R L' U R' U L U' L' U' L",
        "L' U R' L U L' R L U L' R' L U L' R L U L' U' L",
        "L' U' L R L' U L' U L R' L R L' U L' U L R' U L",
        "R L' U R' L' R L R' U L R L' U R' L' R L R' U L",
        "L' R U L' R' L U L' R L U L' R' L U L' R L R' L",
        "L' R' U' R U R L R' U' R L' R' U' R' U L U L' R L"
    ],
    "left Ol": [
        "R L R L' R' U' R L R' U' R L' R' U' R L R' U' L' R'",
        "L R U' L R' L' U' R L' R' L R U' L R' L' U' R L' R'",
        "L U R U R' L' U L R U' R' U L' R' L R U R' L' R",
        "L R L' U' L U' R L' R' U' L U' R' U L' R L R' U' L'",
        "L U' L U' L' R' L U' L' R L U' L' R' L U' L' R U L'",
        "R L R' U R L' R' L' U' L' U' R' L R U' R' L' R U L'",
        "R U' L R L' R' L U' R' L' R U' L R L' R' L U' R' L'",
        "L R U' R' U L' R' L R U R' L' R U L U R U R' L'",
        "L R U' L' R' L U' L' R L U' L' R' L U' L' R L R' L'",
        "L' R U L' U' R' L U L' R U L U' R' U' R U' R' U L",
        "L' R L' R' U L R U' L' U R' U L R U' L' U L R' L",
        "L' R L' R' U L R U R' L' U' R U' L U L' U L R' L"
    ],
    "lean left Ol": [
        "L' R' L R U R' L' R U L U R U R' L' U L R U' R'",
        "L U' R' L' R U' L R L' R' L U' R' L' R U' L R L' R'",
        "R' L U L' U' L U' L' U' R U L R' U R L' U' R' U R",
        "L U L R' U' R L' R' U' R L R' U' R L' R' U' R U' L'",
        "L U R U L R' L' U L R L' R' U L' U' L R U R' L'",
        "R' L R' L R L R' U' R' U L U R U' R' L R L' R' L'",
        "R L' U L' U' R L R U' R' L' R U' R U L' R' L' U L",
        "L R L R' L R U' R' U L U R U' L R' L' R L R' L",
        "L' U R' L R U R U R L' R U R' L R' U' R L' R L"
    ],
    "left Or": [
        "L R U L' R L R' L' U R' L R U L' R L R' L' U R'",
        "R L U R L' R' U R L R' U R L' R' U R L R' L' R'",
        "L U' R' L R U R' L' R U L U L R L R' U' R L' R'",
        "R' L R U' R' L' R L U' R U R' L' U' L R U' R' U' L'",
        "L U' R' L U L' R L U L' R' L U L' R L U L' U L'",
        "L R U' R' U' L' U' R' L R U' R' L' R L U' R U R' L'",
        "R L R' U L R L' U R' L' R L R' U L R L' U R' L'",
        "L R L' R' L U L' R L U L' R' L U L' R L U R' L'",
        "L U R L' R' L U' R U L' U R L R' U L' U L R' L'",
        "L' R' U R U L' U' R' L U' L' R U L U' R' U' R U L",
        "L' U' R U R' U R U L' U' R' L U' L' R U L U' R' L",
        "L' R L' U' L U' L' U R' U L R U' R' L' U' R L R' L",
        "L' R L' U' L U R' L' U' R U' L U R' L' U' R L R' L"
    ],
    "lean left Or": [
        "R' U L U L' R L U L' R' L U L' R L U L' R' U' R",
        "R' U' L U L' R L U L' R' L U L' R L U L' R' U R",
        "R' U' R L U L' U R' L R U L' U R' L R L' R' U R",
        "L R' U L R L' U R' L' R L R' U L R L' U R' L' R",
        "R' L R U L' U' R U' R L R' U R L' R U L R' L' R",
        "L R U' R' L' U L U' R L R' L' U' L R L' U' R' U' L'",
        "L U' R' U R L R' U R L' R' U R L R' U R L' U L'",
        "R U' R U L' R' L' U L R L' U L' U' R L R U' R' L'",
        "L U' L R L R' L U' L' U R' L R U L' U R L R' L'",
        "L R' U L' R L U L' R' L U L' R L U L' R' L R L'",
        "L' R' U' R U R' U R U L' U' R' L U' L' R U L U' L",
        "R U R' L' U' L R U' R' U' L' U' R' L R U' R' L' R L"
    ],
    "highway": [
        "R' U' R U' L U L' U R' U' L U' L' U' L R U R' L' R",
        "R' U R' L R U L' U' L R L' R L' R' U L U' L' U L'",
        "R' U R' L R U L' U' R' L' R L' R L U L U' L' U L'",
        "R' U R' U' R U L' R' L R' L R U' R' U L R L' U L'",
        "R' U R' U' R U R L R' L R' L' U' R' U L R L' U L'",
        "L U' L R' L' U' R U L R L' R L' R' U' R' U R U' R",
        "L U' L R' L' U' R U R' L' R L' R L U' R' U R U' R",
        "L U' L U L' U' L' R' L R' L R U L U' R' L' R U' R",
        "L U' L U L' U' R L R' L R' L' U L U' R' L' R U' R",
        "L U L' U R' U' R U' L U R' U R U R' L' U' L R L'",
        "R' L R U' R' L' U L U L' U R U' L U' L' U R' U R",
        "L R' L' U L R U' R' U' R U' L' U R' U R U' L U' L'"
    ],
    "double lizard": [
        "R U R L R' L U L' R L U' L R U' R' U' R U R U' R'",
        "L U L' U L U' R U R' L' R U R' U R U L U L' U R'",
        "L' U R' U R U L U L' U L R' L' U L U' R U R' U R",
        "L' U' L U L U' L' U' L R U' R L R' U R L' R L U L",
        "L U' R' L' U L U L' U' L' R' L' R' U L R' L' R' L R' L",
        "R L' R L' R' L' R U L' R' L' R' U' R' U R U R' L' U' R",
        "L' R L' R L R L' U' R L R L U L U' L' U' L R U L'",
        "R U R' U' R' U R U R' L' U L' R' L U' L' R L' R' U' R'",
        "R' U L R U' R' U' R U R L R L U' R' L R L R' L R'",
        "R U' L U' L' U' R' U' R U' R' L R U' R' U L' U' L U' L'",
        "R' U' R U' R' U L' U' L R L' U' L U' L' U' R' U' R U' L",
        "L' U' L' R' L R' U' R L' R' U R' L' U L U L' U' L' U L"
    ],
    "pirate": [
        "R U R L' U R U' L U R U' R U R L' U R U' L U R",
        "L' U' L U' L U' L' U' L U L U L U' L' U' L U' L U' L'",
        "L U L' U L' U L U L' U' L' U' L' U L U L' U L' U L",
        "L U R U' L U R' L U L U' L U R U' L U R' L U L",
        "R U L' U R U' L R' L' U R' U' L R' L' U R U' L U' R'",
        "R' L' U' R U L' U' L U L' U' L' U' L U' R' L' U L U R",
        "R' U R U' L R L' U R' U' L U' R' L' U R U' L U' L' R",
        "R' U' L' U' L R U L' U L U L U' L' U L U' R' U L R",
        "L R U L' U' R U R' U' R U R U R' U L R U' R' U' L'",
        "L U R U R' L' U' R U' R' U' R' U R U' R' U L U' R' L'",
        "L U' L' U R' L' R U' L U R' U L R U' L' U R' U R L'",
        "L' U' R U' L' U R' L R U' L U R' L R U' L' U R' U L",
        "R' U' L' U R' U' L R' U' R' U R' U' L' U R' U' L R' U' R'",
        "R' U' R U' R U' R' U' R U R U R U' R' U' R U' R U' R'",
        "R U R' U R' U R U R' U' R' U' R' U R U R' U R' U R",
        "L' U' L' R U' L' U R' U' L' U L' U' L' R U' L' U R' U' L'"
    ],
    "arms": [
        "L R L' U R L R' L' R U L R L' R U' R' U R' U' R U' R'",
        "L U' L' U L U' L U' L' U' L U' R' L R U L U' R' L R L",
        "L U R' L' R' L U' R L' U' R' L U R' L' R' L U' R L' U' R'",
        "R' U' L R U' R' L' R' L R U R' L' R U R' L R' U R L' R'",
        "R L' R' L R U' R' L' U L U L' U' L R U R' L' R U L R'",
        "R L' U' R' L R U' R' L' U L U' L' U' L R U R' L' R L R'",
        "R' L R' U L' U R' U L' U' L' U L' U R U R L' U R' U' R",
        "L' R L' R' L' U' R' U' L U L' U L U' R U' R L R L U' R",
        "L' U' R' L U' R L' R' L' U R L' U' R' L U' R L' R' L' U R",
        "R U L R' U L' R L R U' L' R U L R' U L' R L R U' L'",
        "R L' R L R U L U R' U' R U' R' U L' U L' R' L' R' U L'",
        "L R' L U' R U' L U' R U R U' R U' L' U' L' R U' L U L'"
    ],
    "highway": [
        "L R' U' R' U R' U' L' U R' U' L R' U' R' U R' U' L' U R'",
        "R' L' U' R' U' R U R U L R U' R L R U' L U R' L' R'",
        "L' U R' U' L' U L' U' L' R U' L' U R' U' L' U L' U' L' R",
        "L' U' R' L R U' R' U' L R U L' U' R' L R U' R' U' L R",
        "L R U' L' U' L R L' U' R' U L R U' L' U' L R L' U' R'",
        "R' L' U R U R' L' R U L U' R' L' U R U R' L' R U L",
        "R U L R' L' U L U R' L' U' R U L R' L' U L U R' L'",
        "R U' L U R U' R U R L' U R U' L U R U' R U R L'",
        "R' L U L U' L U R U' L U R' L U L U' L U R U' L",
        "L R U L U L' U' L' U' R' L' U L' R' L' U R' U' L R L"
    ],
    "left crawl": [
        "L' R L' U' R' L' R U L' R' U L' R L' U' R' L' R U L' R'",
        "L R' U' L R L R' U L' R U L R' U' L R L R' U L' R",
        "L' R' L U L' R L' U' R' U' R U L' U' L U' R' U R U L'",
        "R' L U L' U R' U' L R U L' U R U' L R' L' U R' U' R",
        "L R U' R' U' R' U R U' R' U L U' R' U R U R' L' U' L'",
        "L' R' L' U R U' L R L U' L R U L U L U' L' U' R' L'",
        "L U L R U' R' U' R U L' U' R U R' U' R U R U R' L'",
        "R' L U' R L' R' L' U R L' U' R' L U' R L' R' L' U R L'",
        "L' U' R U' L U R' L' R U' L' U R' L' R U' L U R' U L",
        "R L U' R' L R U L R' L U' R L U' R' L R U L R' L",
        "R' U L' R L' U' R' U R U L R L' U' R' U R U L' U' R",
        "R' U L U' R' U' R U L R' L' U' R' U' R U L R' L U' R"
    ],
    "right crawl": [
        "L' U' L U' R L U R' L' R' U' L' R' L' U R L U' R U' R'",
        "R' U L U L' U' R U' R' U L U' L' U' R' L R' U R L' R'",
        "L U' R' U L U L' U' R' L R U L U L' U' R' L R' U L'",
        "L U' R L' R U L U' L' U' R' L' R U L U' L' U' R U L'",
        "R U L' U R' U' L R L' U R U' L R L' U R' U' L U' R'",
        "L' R' U L R' L' U' R' L R' U L' R' U L R' L' U' R' L R'",
        "R' L' U L U L U' L' U L U' R' U L U' L' U' L R U R",
        "L R' U L' R L R U' L' R U L R' U L' R L R U' L' R",
        "R' U' R' L' U L U L' U' R U L' U' L U L' U' L' U' L R",
        "R L R U' L' U R' L' R' U R' L' U' R' U' R' U R U L R",
        "L R' U' R U' L U R' L' U' R U' L' U R' L R U' L U L'",
        "R L R' U' R L' R U L U L' U' R U R' U L U' L' U' R"
    ],
    "left climb": [
        "L U' R' L' U R U R' L' R U L U' R' L' U R U R' L' R",
        "L U' R' L R U R' L' R U L U L U R L R' U R L' R'",
        "L R L U L' R L U' L R' U L R L U L' R L U' L R'",
        "R' U L' U R U' L R' L' U R' U' L R' L' U R U' L U' R",
        "L U' L' U L' U' L U L' R' L R U L U' R' L R L U' L'",
        "R' L R U' R' U' L R U L' U' R' L R U' R' U' L R U L'",
        "R L R' U' R L' R' U' L' U' L' U' R' L R U' R' L' R U L'",
        "R L' U L' R' L U' L' R' L' U' R L' U L' R' L U' L' R' L'"
    ],
    "right climb": [
        "L' R' L U L' R L U R U R U L R' L' U L R L' U' R",
        "L' R U' R L R' U R L R U L' R U' R L R' U R L R",
        "L R' L' U L U R' L' U' R U L R' L' U L U R' L' U' R",
        "R' U R U' R U R' U' R L R' L' U' R' U L R' L' R' U R",
        "L U' R U' L' U R' L R U' L U R' L R U' L' U R' U L'",
        "R' L' R' U' R L' R' U R' L U' R' L' R' U' R L' R' U R' L",
        "R' U L R' L' U' L R L' U' R' U' R' U' L' R' L U' L' R L",
        "R' U L R U' L' U' L R L' U' R' U L R U' L' U' L R L'"
    ],
    "left whisper": [
        "L' U' L R L' U' R' U' R U L U' R' U L' U L U' R U R'",
        "R' L' R L U R' L R U L' U L' U' L R' L R U L' U L'",
        "L R' L' U R L R' L' R' L' U L' R' L U' L R U' L R L'",
        "R' U L' R L' R L' U R' L' R' L R U' L R L' U' L R L'",
        "R U L R' L' U R' U' R' L R L' R' L R L' R' U R' U R'",
        "R U R' L' R L' R' L U R' U' L' R' L R L R' U R' U R'",
        "R U L R' L' U R' U' R L' R' L' R' L R' L R U R' U R'",
        "R U R' L R L' R' L R L' R' U R' U' L R' L' U R' U R'",
        "R U R L' R' L' R' L R' L R U R' U' L R' L' U R' U R'",
        "R U L' R' L R L R' U R' U' R' L' R L' R' L U R' U R'",
        "R U L R' L' U R' U' L R' U' R' L' U' R U' L U' R' L' R'",
        "L R L' R' L' U R' L R' L R' U L' U' R' L R U' R' L R"
    ],
    "right whisper": [
        "L R L R' U' R' L R U' L U L' R' L' R U' L U' R L R'",
        "R' L' R L R U' L R' L R' L U' R U L R' L' U L R' L'",
        "L' U' R L R' L' R' L U' L U L R L' R L R' U' L U' L",
        "L' U' L' R L R L R' L R' L' U' L U R' L R U' L U' L",
        "L' U' L R' L' R L R' L' R L U' L U R' L R U' L U' L",
        "L' U' R' L R U' L U L' R L R L R' L R' L' U' L U' L",
        "L' U' L R L' R L R' U' L U R L R' L' R' L U' L U' L",
        "L' U' R' L R U' L U L R' L' R L R' L' R L U' L U' L",
        "L' U' R' L R U' L U R' L U L R U L' U R' U L R L",
        "L U' R L' R L' R U' L R L R' L' U R' L' R U R' L' R",
        "R' L R U' L' R' L R L R U' R L R' U R' L' U R' L' R",
        "L R L' R' U' L R' L' U' R U' R U R' L R' L' U' R U' R",
        "R U R' L' R U L U L' U' R' U L U' R U' R' U L' U' L"
    ],
    "left duel": [
        "L' U' R' U' L U R' L R' L R' L' U' L U R' L R' U R' L R",
        "L U L U L U' L' U' L R' L R U L U' L' R' L' R L' U L'",
        "L' R L' R U' R' U' R U R L' R' L R U R' U' R L' R' U R'",
        "L R' L U R U L U' R' U R L' U' R' U L' R L' U' R' U' R",
        "R L' R L R U L' R L U R U R U' L R' L' U' L R L' R",
        "L' R' L' R U' R' L' R' U' R L R' U R' L' U' L U' R' L R L",
        "R' L R' L' R' U' R U L R L' R U' R' U' R U R U R U R'",
        "R' U R U R U' L R L' U R U' R L R' L' R L R' L' U' R",
        "R' U R U R U' R L' R' L' R L U R U' L' R L R' L U' R",
        "R' U L R L' U R L R L' R' U' L R L' U R U R' L R' L'",
        "L R' U' R' U L R U' L U R' L R U' L U R' U' R U R L'",
        "L U L U' L' U R' L R L' U' L U' L U' L' U' L R' L' R L'",
        "L' R' L U R U L' R L U' L R U L' R L U' L' U' L R L'"
    ],
    "right duel": [
        "R' L U L U' R' L' U R' U' L R' L' U R' U' L U L' U' L' R",
        "R L R' U' L' U' R L' R' U R' L' U' R L' R' U R U R' L' R",
        "R' U' R' U R U' L R' L' R U R' U R' U R U R' L R L' R",
        "L U' R' L' R U' L' R' L' R L U R' L' R U' L' U' L R' L R",
        "L U' L' U' L' U L' R L R L' R' U' L' U R L' R' L R' U L'",
        "L U' L' U' L' U R' L' R U' L' U L' R' L R L' R' L R U L'",
        "L R' L R L U L' U' R' L' R L' U L U L' U' L' U' L' U' L",
        "R L R L' U L R L U L' R' L U' L R U R' U L R' L' R'",
        "R' L R' U' L' U' R' U L U' L' R U L U' R L' R U L U L'",
        "L' R L' R' L' U' R L' R' U' L' U' L' U R' L R U R' L' R L'",
        "R L' R L' U L U L' U' L' R L R' L' U' L U L' R L U' L",
        "R' U' R' U' R' U R U R' L R' L' U' R' U R L R L' R U' R",
        "R U L U R' U' L R' L R' L R U R' U' L R' L U' L R' L'"
    ],
    "left pinch": [
        "R' L R U' R' U' R L R' U L R U' R L R' U L U R L' R'",
        "R' U R' L U' R' U' R U R U' R' U L' U L' R' L' R' U L' R",
        "R' L' R L' U L U R' L R U' L' R' L R L U R' L R U L'",
        "L U' R' L' R L R' L' R L U' L U R' L R U' L U L U L'",
        "L U' R L' R L R' U' L U R L R' L' R' L U' L U L U L'",
        "L R' L R U' R' L' R U' L U L U R L R' U L R L R' L",
        "R L' R' U' L' U' L' U L U' R' L R U L' U L U L' R L R'",
        "R' L R' L' R U' R' U' R U' R U' R' L R L' U R' U' R U R",
        "R' U R' L R' L' R' U' R U L R L' R U' R' U' R U R U R",
        "L U L' U R' L' R U' L U R' U L R U' L' U R' U R U L'",
        "L R L' U L' R L' U R U' R' L' R L' R L' U R U' L' U' R'",
        "R L U' L' R' L U R' L R U' L U R' L R U' R L U L' R'",
        "L' U L' R' L U' L' U L R L' R' L U L U' L' U' L R' L R'"
    ],
    "right pinch": [
        "R U' R' U' R' U' R' U R U R' L R' L' U' R' U R L R L' R",
        "L U L' U R' L R U L' U' L U L' U' R U' R L R' U R' L'",
        "R' U R U L R' L U' R U L R' U' R U L' U' R' U' L' R L'",
        "R' L' R U' R L' R U' L' U L R L' R L' R U' L' U R U L",
        "R U' R L R' U R U' R' L' R L R' U' R' U R U R' L R' L",
        "L' R' U R L R' U' L R' L' U R' U' L R' L' U L' R' U' R L",
        "R' U' R U' L R L' U R' U' L U' R' L' U R U' L U' L' U' R",
        "L U' L R' L R L U L' U' R' L' R L' U L U L' U' L' U' L'",
        "L R' L R L' U L U L' U L' U L R' L' R U' L U L' U' L'",
        "L' R L U R U R U' R' U L R' L' U' R U' R' U' R L' R' L",
        "R' L R' L' U L R L' U R' U' R' U' L' R' L U' R' L' R' L R'",
        "R' U L' R L' R' L U R' U' L' R' L R L R' U R' U' R' U' R",
        "R' U L R L' R' L R L' R' U R' U' L R' L' U R' U' R' U' R"
    ],
    "left dynamite": [
        "R L' R' U L' U R' L R L U' L' U R' L' R U R L' R' L'",
        "R' U R' U L R L' R U' R' U R' U L R L' U R L R' L'",
        "L' U L' U R L' R' L R' L' U' L' U L' R L R L' R' U L",
        "L' R' L' U' R U' L U' R' L' U' L' R U' L' U R' L' R U L",
        "L' U L' U L' R' L R L' R' L R L' U' L' U R' L' R U L",
        "L' U L' U L R L' R L' R' L' R' L U' L' U R' L' R U L",
        "L' U L' U L' R L R L' R' U' L' U R L' R' L R' L' U L",
        "L' U L' U R' L' R U' L' U L' R' L R L' R' L R L' U L",
        "L' U L' U R' L' R U' L' U L R L' R L' R' L' R' L U L",
        "R U' R U' R U L R L' R U' R' U R U R' U' L R' L' R",
        "L R L' U' L R L' U' R' U L' R L' R L' U R' L' R' L R",
        "R' L R U' L R U' R L' R' U R' L' R' L' R L U R' L' R",
        "R' L R U' R' L R U' L R L' R' L' U R' L R' L R' U L'"
    ],
    "right dynamite": [
        "L R' L' U L R' L' U R' L' R L R U' L R' L R' L U' R",
        "L R' L' U R' L' U L' R L U' L R L R L' R' U' L R L'",
        "R' L' R U R' L' R U L U' R L' R L' R U' L R L R' L'",
        "L' U L' U L' U' R' L' R L' U L U' L' U' L U R' L R L'",
        "R U' R U' L R L' U R U' R' L' R L' R L R L R' U' R'",
        "R U' R U' L R L' U R U' R L R' L' R L R' L' R U' R'",
        "R U' R U' R L' R' L' R L U R U' L' R L R' L R U' R'",
        "R U' R U' R' L' R L' R L R L R' U R U' L R L' U' R'",
        "R U' R U' R L R' L' R L R' L' R U R U' L R L' U' R'",
        "R L R U L' U R' U L R U R L' U R U' L R L' U' R'",
        "R U' R U' L' R L R' L R U R U' R L' R' L' R L U' R'",
        "L U' L U' R' L' R L' U L U' L U' R' L' R U' L' R' L R",
        "L' R L U' R U' L R' L' R' U R U' L R L' U' L' R L R"
    ],
    "lonely snail": [
        "R U L' R' L R' U' R' U L' U L U' R U R' L' U' R' L U' R'",
        "L' U' L R L' U' L' U L U R' L' U L R U' L' U' L U L R'",
        "R' L R L' U' L U L' R' U' L' U' R U L R' U L R L U' L'",
        "L R U L' R' U L U L U' R L' R' L R U L U R' L' U L",
        "R' L' U' R L U' R' U' R' U L' R L R' L' U' R' U' L R U' R'",
        "L R' L' R U R' U' R L U R U L' U' R' L U' R' L' R' U R",
        "L' U' R L R' L U L U' R U' R' U L' U' L R U L R' U L",
        "R U R' L' R U R U' R' U' L R U' R' L' U R U R' U' R' L",
        "L' R' L U R U R' L U L' R U' R' U L' R L' U' L' R' U' R",
        "R L R' U' L' U' L R' U' R L' U L U' R L' R U R L U L'"
    ],
    "triple snail": [
        "L U' L' R' U' R' L R' U L' U' L R' U R L' U L U R L' R'",
        "R' U R L U L R' L U' R U R' L U' L' R U' R' U' L' R L",
        "R' U' R' L U L U R' U R U L' U' R U R L U L' U' R L' R'",
        "L U' L U L' R' U R U L R' U L' U' R L R' L U L' R' L R'",
        "R L U L U L' U' L' U' L R U R L U L R L R' U L U R",
        "L' R' U' R' U' R U R U R' L' U' L' R' U' R' L' R' L U' R' U' L'",
        "R' U R' U' R L U' L' U' R' L U' R U L' R' L R' U' R L R' L",
        "L U L R' U' R' U' L U' L' U' R U L' U' L' R' U' R U L' R L"
    ],
    "lonely lizard": [
        "L' R U R U' R' U' L R U R' L' U R U R' U' R' L R U' R'",
        "R U R' L' U R U L R L' R' L U' R U R U L' R' U L R",
        "L R' U L R L' U R' U L' U L U' R L R' L U' L R U L'",
        "R' U' R L R U L' R U L U' R' U' L' R' U R U' R' L R L'",
        "L' U' R L' U' R' L' U L U' R U R' U L' U' L' R L' R' U L",
        "R U L' R U L R U' R' U L' U' L U' R U R L' R L U' R'",
        "R' L U' R' L' R U' L U' R U' R' U L' R' L R' U R' L' U' R",
        "L U L' R' L' U' R L' U' R' U L U R L U' L' U L R' L' R",
        "L' U' L R U' L' U' R' L' R L R' U L' U' L' U' R L U' R' L'",
        "R L' U' L' U L U R' L' U' L R U' L' U' L U L R' L' U L",
        "R U L' U' L R L' U L R' L' U L R' U' R' U' R U R U' R'",
        "L' U' R U R' L' R U' R' L R U' R' L U L U L' U' L' U L"
    ],
    "triple lizard": [
        "R U R' U' R' U R U R L' U' L R L' U' L R' L' U L U' R'",
        "R' U L R U' R L' R L U' R U R' U L' U R' L R U L' R",
        "L U' R' L' U L' R L' R' U L' U' L U' R U' L R' L' U' R L'",
        "L' U' L U L U' L' U' L' R U R' L' R U R' L R U' R' U L",
        "R' L R U L' U R L R' U R' L' R' U' R U' R U R' U R'",
        "L R' L' U' R U' L' R' L U' L R L U L' U L' U' L U' L",
        "R L R U' R L' R U L R U L' U R' U' R' U' R U' R",
        "L' R' L' U L' R L' U' R' L' U' R U' L U L U L' U L'"
    ],
    "both Ol": [
        "R U' R U R' U' R U' R U R U R U' R U' R' U R U' R",
        "L U' L U L' U' L U' L U L U L U' L U' L' U L U' L",
        "L' U' L U' L R L U L' R' L' R' L' R' U R L R U' R U' R'",
        "L R' L' R' U R' U R U' R' U R' U' R U L R L' U' R U' R'",
        "L' U' L U' R' L R U L U' L' U L' U' L U L' U L' R' L' R",
        "R' L U L U' R L' U R U L R U L U R' L U' R U R L'",
        "R U' R' U L U R U' L R' L R L' R U' L U R U L' U' L"
    ],
    "both Or": [
        "R' U R' U' R U R' U R' U' R' U' R' U R' U R U' R' U R'",
        "L' U L' U' L U L' U L' U' L' U' L' U L' U L U' L' U L'",
        "L' U L U' R' U' L' U R' L R' L' R L' U R' U' L' U' R U R'",
        "L R' U' R' U L' R U' L' U' R' L' U' R' U' L R' U L' U' L' R",
        "R U R' U L R' L' U' R' U R U' R U R' U' R U' R L R L'",
        "R' L R L U' L U' L' U L U' L U L' U' R' L' R U L' U L",
        "R U R' U R' L' R' U' R L R L R L U' L' R' L' U L' U L"
    ],
};

const EP_NAMES = Object.keys(SCRAMBLES);
const AUF = ["", "U", "U'"];

let bag = [];   // each selected case appears twice, shuffled
let bagKey = null; // serialized selection the current bag was built from

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function keyFor(selected) {
    return JSON.stringify([...selected].sort());
}

function refillBag(selected) {
    bag = shuffle(selected.flatMap(c => [c, c]));
    bagKey = keyFor(selected);
}

export async function generateEPScramble(selected = EP_NAMES, prev) {
    if (selected.length === 0) return 'Select at least one case';

    if (bag.length === 0 || keyFor(selected) !== bagKey) {
        refillBag(selected);
    }

    const caseName = bag.shift();
    const options = SCRAMBLES[caseName] ?? [];
    prev = prev.replace(/(^U'? )|( U'?$)/g, ""); // remove preAUF and postAUF
    let scram;
    do { scram = options[Math.floor(Math.random() * options.length)] } while (scram === prev);
    scram = AUF[Math.floor(Math.random() * AUF.length)] + " " + scram + " " +
            AUF[Math.floor(Math.random() * AUF.length)];
    return scram;
}

export function EPSidebar() {
    return {
        title: 'Select cases',
        cases: EP_NAMES,
    };
}
