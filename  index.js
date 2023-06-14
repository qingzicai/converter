const category = document.querySelector("#category");
const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const unit1 = document.querySelector("#unit1");
const unit2 = document.querySelector("#unit2");
const formula = document.querySelector("#formula");

// event listener that fetches the corresponding options and update the unit dropdown menus according to the changes of the category.
category.addEventListener("change", (evt) => {
    evt.preventDefault();
    const selectedCategory = category.value;
    const options = passArray(selectedCategory);
    addUnitsByCategory(selectedCategory, options);
});

// populate the unit1 and unit2 dropdown menus with the available options based on the selected category
const addUnitsByCategory = (selectedCategory, options) => {
    let optionsHTML = "";
    for (let i = 0; i < options.length; i++) {
    optionsHTML += `<option>${options[i]}</option>`;
    }
    unit1.innerHTML = optionsHTML;
    unit2.innerHTML = optionsHTML;
};

  // takes the selectedCategory as a parameter and uses a switch statement to determine which array of options to return.
function passArray(selectedCategory) {
    switch (selectedCategory) {
    case "length":
        return ["Kilometer", "Meter", "Mile"];
    case "digital-storage":
        return ["Byte", "Kilobyte"];
    case "fuel-economy":
        return ["Kilometer per liter", "Miles per gallon"];
    default:
        return [];
    }
}



const conversionFactorList = {
    Kilometer: {
        Meter: 1000,
        Mile: 0.621371
    },
    Meter: {
        Kilometer: 0.001,
        Mile: 0.000621371
    },
    Mile: {
        Kilometer: 1.60934,
        Meter: 1609.34
    },
    Kilometer_per_liter: {
        Kilometer_per_gallon: 2.352
    },
    Kilometer_per_gallon: {
        Kilometer_per_liter: 0.425144
    },
    Byte: {
        Kilobyte: 0.001
    },
    Kilobyte: {
        Byte: 1000
    }
};

const conversionFactor = (inputUnit1, inputUnit2) => {
    let metricUnit1 = inputUnit1;
    let metricUnit2 = inputUnit2;
    
    if (conversionFactorList[metricUnit1] && conversionFactorList[metricUnit2]) {
    return conversionFactorList[metricUnit1][metricUnit2];
    }

    return 1;
};

unit1.addEventListener("change", handleUnitChange);
unit2.addEventListener("change", handleUnitChange);
input1.addEventListener("input", () => handleInputChange(input1, input2));
input2.addEventListener("input", () => handleInputChange(input2, input1));

// updating the otherInput value when the units are changed without modifying the input values.
function handleUnitChange() {
    const metricUnit1 = unit1.value;
    const metricUnit2 = unit2.value;
    // get the current input value
    const inputValue = input1.value;

    if (inputValue === "") {
        input2.value = "";
    } else {
    convert(metricUnit1, metricUnit2, inputValue, input1, input2);
    }
}

// handling the input changes，performs conversion and updates values of both inputs accordingly.
function handleInputChange(input, otherInput) {
    const metricUnit1 = unit1.value;
    const metricUnit2 = unit2.value;
    const value = input.value;

    if (value === "") {
        input.value = "";
        otherInput.value = "";
    } else {
    convert(metricUnit1, metricUnit2, value, input, otherInput);
    }
}

// core function convert（）
function convert(metricUnit1, metricUnit2, inputValue, input, otherInput) {
    const factor = conversionFactor(metricUnit1, metricUnit2);

    if (input === input1) {
      otherInput.value = inputValue * factor;
    } else if (input === input2) {
    otherInput.value = inputValue / factor;
    }
    formula.innerText = `The conversion factor of transferring ${metricUnit1} to ${metricUnit2} is ${factor}.`;
}


// if (input.value === input1.value) {
//     otherInput.value = inputValue * factor;
//   } else if (input.value === input2.value) {
//     otherInput.value = inputValue / factor;
//   }