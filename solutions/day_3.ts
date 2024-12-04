import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day_3.txt", "utf-8")
    .split("\r\n")
    .slice(0, -1);
function day_3_p2(input: string): number {
    let mulEnabled = true;
    let resultSum = 0;
    const instructions = input.match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g);
    if (!instructions) {
        return 0;
    }
    for (const instruction of instructions) {
        if (instruction === "do()") {
            mulEnabled = true;
        } else if (instruction === "don't()") {
            mulEnabled = false;
        } else if (instruction.startsWith("mul(") && mulEnabled) {
            const [x, y] = instruction.match(/\d+/g)!.map(Number);
            resultSum += x * y;
        }
    }
    return resultSum;
}
let answer = 0;
for (const line of input) {
    answer += day_3_p2(line);
}
console.log(answer);

function day_3_p1() {
    let answer: number = 0;
    for (const line of input) {
        const muls = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g) ?? "eh 1";
        for (const exp of Array.from(muls)) {
            const current = exp.match(/[0-9]{1,3},[0-9]{1,3}/) ?? "eh 2";
            answer +=
                Number(current[0].split(",")[0]) *
                Number(current[0].split(",")[1]);
        }
    }
    console.log(answer);
}
