import { solve as solveDay1_1 } from './2023/day1/puzzle1.js'
import { solve as solveDay1_2 } from './2023/day1/puzzle2.js'
import { solve as solveDay2_1 } from './2023/day2/puzzle1.js'
import { solve as solveDay2_2 } from './2023/day2/puzzle2.js'
import { solve as solveDay3_1 } from './2023/day3/puzzle1.js'
import { solve as solveDay3_2 } from './2023/day3/puzzle2.js'
import { solve as solveDay4_1 } from './2023/day4/puzzle1.js'
import { solve as solveDay4_2 } from './2023/day4/puzzle2.js'
import { solve as solveDay5_1 } from './2023/day5/puzzle1.js'
import { solve as solveDay5_2 } from './2023/day5/puzzle2.js'
import { solve as solveDay6_1 } from './2023/day6/puzzle1.js'
import { solve as solveDay6_2 } from './2023/day6/puzzle2.js'



const results = {
    day1: { 1: solveDay1_1(), 2: solveDay1_2() },
    day2: { 1: solveDay2_1(), 2: solveDay2_2() },
    day3: { 1: solveDay3_1(), 2: solveDay3_2() },
    day4: { 1: solveDay4_1(), 2: solveDay4_2()},
    day5: { 1: solveDay5_1(), 2: solveDay5_2()},
    day6: { 1: solveDay6_1(), 2: solveDay6_2()},
}
console.log(results);

