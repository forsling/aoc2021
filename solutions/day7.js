
import { getText } from '../input.js';

const calculateTotalFuel = (positions, alignmentPosition, fuelFunction = (a, b) => Math.abs(a-b)) => { 
    let totalFuel = 0; 
    for (let position of positions) { 
        let fuel = fuelFunction(position, alignmentPosition)
        totalFuel += fuel;
    } 
    return(totalFuel); 
}

let executePart1 = (input) => {
    let calcDist = (array, x) => { 
        let sumFuel = 0; 
        for (let val of array) { 
            sumFuel += Math.abs(val-x); 
        } 
        return(sumFuel); 
    }

    let sortedPositions = input.sort((a,b) => a-b);
    let median = sortedPositions[sortedPositions.length/2];
    let fuel = calcDist(sortedPositions, median);
    return { value: median, fuel: fuel };
}

let executePart2 = (positions) => {
    let getFuelForDistance = (a, b) => {
        let steps = Math.abs(a-b);
        let sum = 0;
        for (let i = 1; i <= steps; i++) {
            sum += i;
        }
        return sum;
    }

    const avg = positions.reduce((a, b) => a + b, 0) / positions.length;

    const avg1 = Math.floor(avg);
    const avg1fuel = calculateTotalFuel(positions, avg1, getFuelForDistance);

    const avg2 = Math.ceil(avg);
    const avg2fuel = calculateTotalFuel(positions, avg2, getFuelForDistance);

    const minFuel = avg1fuel < avg2fuel ? avg1fuel : v2fuavg2fuelel;
    const bestVal = minFuel == avg1fuel ? avg1 : avg2;
    return { value: bestVal, fuel: minFuel };
}


export default async () => {
    const exampleInput = [16,1,2,0,4,2,7,1,2,14];
    const rawInput = await getText(7);
    let input = rawInput.split(',').map((a) => Number.parseInt(a));
    
    let p1result = executePart1(input);
    console.log(`Day 7 Part 1: Minimum fuel consuption ${p1result.fuel} with value ${p1result.value}`);

    let p2result = executePart2(input);
    console.log(`Day 7 Part 2: Minimum fuel consuption ${p2result.fuel} with value ${p2result.value}`);

}