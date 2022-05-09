import { getText } from '../input.js';

const execute = (school, toDay) => {
    const processFish = (currentFish) => {
        let newFish = { 
            n0: currentFish.n1, 
            n1: currentFish.n2, 
            n2: currentFish.n3, 
            n3: currentFish.n4, 
            n4: currentFish.n5, 
            n5: currentFish.n6,  
            n6: currentFish.n7 + currentFish.n0,  
            n7: currentFish.n8,  
            n8: currentFish.n0, 
        };
        return newFish;
    }

    //Calculate the fishies
    for (let day = 0; day < toDay; day++) {
        school = processFish(school);
    }

    const fishCount = (fish) => {
        return Object.keys(fish).reduce((prev, curr, i, arr) => {
            return prev + fish[curr];
        }, 0);
    }

    return fishCount(school);
}
export default async () => {
    const getFishObj = (fishArray) => {
        const fishObj = { n0: 0, n1: 0, n2: 0, n3: 0, n4: 0, n5: 0, n6: 0, n7: 0, n8: 0 };
        for (let num of fishArray) {
            let val = parseInt(num);
            fishObj["n" + val]++
        }
        return fishObj
    }

    // const exampleData = getFishObj(["3","4","3","1","2"]);
    // const e1 = execute(exampleData, 18);
    // const e2 = execute(exampleData, 80);
    // console.log(`Day 6 Example 1 (day 18): ${e1}`);
    // console.log(`Day 6 Example 2 (day 80): ${e2}`);

    const inputText = await getText(6);
    const inputArray = inputText.split(",");
    const realInput = getFishObj(inputArray);
    const p1 = execute(realInput, 80);
    const p2 = execute(realInput, 256);
    console.log(`Day 6 Part 1 (day 80): ${p1}`);
    console.log(`Day 6 Part 2 (day 256): ${p2}`);
}