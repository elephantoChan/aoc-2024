import { readFileSync } from "node:fs";
type Report = number[];
const input = readFileSync("inputs/day_2.txt", "utf-8")
    .split("\r\n")
    .map((line) => line.split(" ").map((num) => parseInt(num)))
    .slice(0, -1) as Report[];

function isSafe(report: Report): boolean {
    const isIncreasing = report.every(
        (_, i) =>
            i === 0 ||
            (report[i] > report[i - 1] &&
                report[i] - report[i - 1] >= 1 &&
                report[i] - report[i - 1] <= 3)
    );
    const isDecreasing = report.every(
        (_, i) =>
            i === 0 ||
            (report[i] < report[i - 1] &&
                report[i - 1] - report[i] >= 1 &&
                report[i - 1] - report[i] <= 3)
    );
    return isIncreasing || isDecreasing;
}

function checkSafe(reports: Report[]): number {
    let safeCount = 0;

    for (const report of reports) {
        if (isSafe(report)) {
            safeCount++;
            continue;
        }

        for (let i = 0; i < report.length; i++) {
            const modifiedReport = report
                .slice(0, i)
                .concat(report.slice(i + 1));
            if (isSafe(modifiedReport)) {
                safeCount++;
                break;
            }
        }
    }

    return safeCount;
}
console.log(checkSafe(input));
