import { readFileSync } from "node:fs";

const splitText: string[][] = readFileSync("inputs/day_1.txt", "utf-8")
    .split("\r\n")
    .map((line) => line.split("   "));

function getText(splitText: string[][], num: 0 | 1) {
    const ans = splitText.map((arr) => parseInt(arr[num]));
    return ans.slice(0, ans.length - 1);
}
const list1: number[] = getText(splitText, 0);
const list2: number[] = getText(splitText, 1);
const record: Record<number, number> = {};
for (const num of list1) {
    if (record[num] && record[num] != 0) {
        console.log(`Found ${num} already with ${record[num]}`);
        continue;
    } else {
        console.log(`Doing ${num}`);
    }
    for (const comparison of list2) {
        if (!record[num]) {
            record[num] = 0;
        }
        if (num == comparison) {
            record[num]++;
        }
    }
}
let answer: number = 0;
for (const num of list1) {
    answer += num * record[num];
}
console.log(answer);
