var input = document.getElementById("input");
var output = document.getElementById("output");
var button = document.getElementById("button");

button.addEventListener("click", convert);

function convert() {
    var binary = input.value;
    if (binary.match("^[01]+$")) {
        var result = 0;
        for (var i = 0; i < binary.length; i++) {
            if (binary[i] == "1") {
                value = Math.pow(2, binary.length - i - 1);
                if (value == 0) {
                    result++;
                } else {
                    result += value;
                }
            }
        }
        output.value = result;
    } else {
        output.value = "Wrong binary number!";
    }
}