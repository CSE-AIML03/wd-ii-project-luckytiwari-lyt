function calResult() {
    let numSubjects = parseInt(document.getElementById("subjects").value);
    if (isNaN(numSubjects) || numSubjects <= 0) {
        document.getElementById("result").innerHTML = "Please enter a valid number of subjects.";
        return;
    }
    let totalMarks = 0;
    for (let i = 1; i <= numSubjects; i++) {
        let marks = parseInt(prompt("Enter marks for subject " + i + ":"));
        if (isNaN(marks) || marks < 0) {
            alert("Invalid input for subject " + i + ". Please enter a number.");
            return;
        }
        totalMarks += marks;
    }
    let averageMarks = totalMarks / numSubjects;
    let grade, result;
    if (averageMarks >= 90) {
        grade = "A";
        result = "Pass";
    } else if (averageMarks >= 75) {
        grade = "B";
        result = "Pass";
    } else if (averageMarks >= 49) {
        grade = "C";
        result = "Pass";
    } else {
        grade = "F";
        result = "Fail";
    }
    document.getElementById("result").innerHTML =
        "<h3>Result</h3>" +
        "Total Marks: " + totalMarks + "<br>" +
        "Average Marks: " + averageMarks.toFixed(2) + "<br>" +
        "Grade: " + grade + "<br>" +
        "Result: " + result;
}