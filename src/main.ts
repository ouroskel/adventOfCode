import {solve as solveDay1_1} from './day1/puzzle1.js'
import {solve as solveDay1_2} from './day1/puzzle2.js'
import {solve as solveDay2_1} from './day2/puzzle1.js'
import {solve as solveDay2_2} from './day2/puzzle2.js'


const results = {
    day1: { 1:solveDay1_1(), 2:solveDay1_2()},
    day2: { 1:solveDay2_1(), 2:solveDay2_2()},
}
console.log(results);

