import { readFileSync } from "node:fs";
type Report = number[];
const text = readFileSync("day_2.txt", "utf-8")
    .split("\r\n")
    .map((line) => line.split(" ").map((num) => parseInt(num)))
    .slice(0, -1) as Report[];

let safeReports = 0;
let isSafe = true;

for (const report of text) {
    const pattern = report[0] - report[1] < 0 ? "ascending" : "descending";
    isSafe = true;
    for (const num in report) {
        const current = report[num] - report[parseInt(num) + 1];
        if (report[parseInt(num) + 1] === undefined) {
            continue;
        }
        switch (pattern) {
            case "ascending":
                if (current == -1 || current == -2 || current == -3) {
                } else if (
                    report[num] - report[parseInt(num) + 2] == -1 ||
                    report[num] - report[parseInt(num) + 2] == -2 ||
                    report[num] - report[parseInt(num) + 2] == -3
                ) {
                } else {
                    isSafe = false;
                }
                break;
            case "descending":
                if (current == 1 || current == 2 || current == 3) {
                } else if (
                    report[num] - report[parseInt(num) + 2] == 1 ||
                    report[num] - report[parseInt(num) + 2] == 2 ||
                    report[num] - report[parseInt(num) + 2] == 3
                ) {
                } else {
                    isSafe = false;
                }
                break;
        }
    }
    safeReports += isSafe ? 1 : 0;
}

console.log(safeReports);

// function printText() {
//     text.forEach((report) => {
//         report.forEach((num) => process.stdout.write(`${num} `));
//         console.log();
// }
