const res = document.getElementById("res-text");
const erase = document.getElementById("op-5");
const equal = document.getElementById("op-4");
const deleter = document.getElementById("op-6");
const period = document.getElementById("button-dot");
const all_buttons = document.querySelectorAll(".button");
let recently_added = "0";

const list_numbers = [
    "button-0", "button-1", "button-2",
    "button-3", "button-4", "button-5", 
    "button-6", "button-7", "button-8",
    "button-9"
]

const list_operators = [
    "+", "-", "*", "/" 
]

const DigitMap = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "+": " + ",
    "-": " - ",
    "%": " / ",
    "/": " / ",
    "*": " * ",
    "x": " * ",
    ".": "."
};

document.addEventListener("keydown", function(event) {
    var key = event.key;
    if (key === "x") {
        key = "*";
    }
    else if (key === "%") {
        key = "/"
    }
    
    if (key in DigitMap) {
        if (/[A-DF-Z]/.test(res.textContent)) {
            res.textContent = "0";
            recently_added = "0";
        };

        if (res.textContent === "0" && !list_operators.includes(key)) {
            res.textContent = "";
        }

        if (list_operators.includes(key) && list_operators.includes(recently_added)) {
            last_two = `${key} `;
            res.textContent = res.textContent.slice(0, -2) + last_two;
            recently_added = key;
        }
        
        else {
            res.textContent += DigitMap[key];
            recently_added = key;
        }
        
    }
    else if (key === "Enter") {
        if (list_operators.includes(recently_added)) {
            return
        }

        if (/[A-DF-Z]/.test(res.textContent)) {
            res.textContent = "0";
            recently_added = "0";
        };

        res.textContent = String(Function(`return ${res.textContent}`)());
    }
    else if (key === "Backspace") {
        if (Number(res.textContent) === 0) {
            return;
        } else if (res.textContent.length <= 1 && Number(res.textContent) > 0) {
            res.textContent = "0";
            return
        }
        res.textContent = res.textContent.slice(0, -1); 
        recently_added = res.textContent.charAt(res.textContent.replace(" ", "").length - 1);
        if (recently_added === " ") {
            res.textContent = res.textContent.slice(0, -1); 
            res.textContent = res.textContent.slice(0, -1); 
            recently_added = res.textContent.charAt(res.textContent.replace(" ", "").length - 1);
        }
    }
})

for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].addEventListener("click", function(){
        if (/[A-DF-Z]/.test(res.textContent)) {
            res.textContent = "0";
        };
    })
}

for (let i = 0; i < list_numbers.length; i++) {
    let button = document.getElementById(list_numbers[i]);
    button.addEventListener("click", function(num) {
        return function() {
                if (res.textContent === "0") {
                    res.textContent = "";
                }
                res.textContent += String(num);
            };
    }(i)
);};

for (let i = 0; i < list_operators.length; i++) {
    let button = document.getElementById(`op-${i}`);
    button.addEventListener("click", function(op) {
        return function() {
                if (list_operators.includes(recently_added)) {
                    last_two = `${op} `;
                    res.textContent = res.textContent.slice(0, -2) + last_two;
                }

                else {
                    res.textContent += String(` ${op} `);
                }
                
            };
    }(list_operators[i])
);};

erase.addEventListener("click", function() {
    if (Number(res.textContent) === 0) {
        return;
    } else if (res.textContent.length <= 1 && Number(res.textContent) > 0) {
        res.textContent = "0";
        return
    }
    res.textContent = res.textContent.slice(0, -1); 
    recently_added = res.textContent.charAt(res.textContent.replace(" ", "").length - 1);
    if (recently_added === " ") {
        res.textContent = res.textContent.slice(0, -1); 
        res.textContent = res.textContent.slice(0, -1); 
        recently_added = res.textContent.charAt(res.textContent.replace(" ", "").length - 1);
    }
});

equal.addEventListener("click", function() {
    if (list_operators.includes(recently_added)) {
        return;
    }
    if (/[A-DF-Z]/.test(res.textContent)) {
        res.textContent = "0";
        recently_added = "0";
    };
    res.textContent = String(Function(`return ${res.textContent}`)());
});

deleter.addEventListener("click", function() {
    res.textContent = "0";
});

period.addEventListener("click", function() {
    res.textContent += ".";
})

for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].addEventListener("click", function(){
        recently_added = res.textContent.charAt(res.textContent.replace(" ", "").length - 1);
    })
}