// How Reduce Works
{
  const someArray = [4, 'six', 8];
  const initialValue = '2';

  someArray.reduce((accumulator, item, index, array) => {
    // do some logic with item and accumulator
    // the value returned will be the accumulator in the next pass
    return accumulator % item + index * array.length;
    // the initial value is optional
    // if not provided, the first item in the array is the initial value
      // and the reduce starts on the second item
  }, initialValue)

  // Reduce is like a for loop with
  // these are equivalent:
  const numsToSum = [2,3,5,7,11,13];

  const forLoopSum = 0;
  for (let i = 0; i < numsToSum.length; i++) {
    forLoopSum += numsToSum[i];
  }

  // It looks even better in es6
  const reduceSum = numsToSum.reduce((sum, num) => sum + num);

  console.log('Does forLoopSum === reduceSum?', forLoopSum === es6ReduceSum);
}


// The Basics - Sum
{
  const valuesToSum = [10, 12, 15];

  const reducer = (accumulator, item) => accumulator + item;

  const withoutInitialValue = valuesToSum.reduce(reducer);
  console.log('sum without initial value:', withoutInitialValue); // 37

  const initialValue = 10;

  const withInitialValue = valuesToSum.reduce(reducer, initialValue);
  console.log('sum with initial value', withInitialValue); // 47

  // still works despite emptyValuestoSum being empty
  const emptyValuestoSum = [];
  const emptyTotal = emptyValuestoSum.reduce(reducer, initialValue); //

  console.log('Sum of empty array w/ initialValue:', emptyTotal) // 10

  // Will throw an error if you try to reduce with no initial value
  // var emptyArrayReduce = [].reduce((aggregate, item) => 'u mad?');
}

// Transforming an Array into an Object
{
  const frameworkVotes = ['angular', 'react', 'react', 'angular', 'react', 'backbone'];

  // As always, es6 is cooler. So is code golf
  const tallyVotesES6 = (tally, framework) => {
    tally[framework] = tally[framework] ? tally[framework] + 1 : 1;
    return tally;
  };

  const tally = frameworkVotes.reduce(tallyVotesES6, {});

  console.log('Vote Tally:', tally); // { angular: 2, react: 3, backbone: 1 }
}

// Map
{
  const valuesToDouble = [1, 11, 21, 1211, 111221];

  // Notice that reducer function is inline
  const doubleMap = valuesToDouble.reduce((output, num) => {
    accumulator.push(item * 2);
    return accumulator;
  }, []);

  console.log('Lets go Dubs', doubleMap); // [2, 22, 42, 2422, 222442]
}

// Filter
{
  const valuesToFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Moved reducer inline
  const odds = valuesToFilter.reduce((accumulator, item) => {
    if (item % 2) { // 0 is falsy
      accumulator.push(item);
    }
    return accumulator;
  }, []);

  console.log('Odd numbers:', odds); // [1,3,5,7,9]
}

// FilterMap with Reduce vs. Chaining 1
{
  const values = [2,5,7,9,10];

  const oddsDoubled = values.reduce((acc, item) => {
    item % 2 && acc.push(item * 2); // && works like a short circuit 'if'
    return acc;
  }, []);

  console.log('Doubled odds:', oddsDoubled); // [10,14,18]

  // Arguably more readible, same result
  const chained = values.filter(num => num % 2).map(oddNum => oddNum * 2);

  console.log('Doubled odds (chained):', oddsDoubledChained); // Still [10, 14, 18]
}

// FilterMap with Reduce vs. Chaining 2
{
  const bigData = [];
  for (let i = 0; i < 10000000; i++) { // Ten bajillion
    bigData.push(i);
  }

  console.time('BigDataChaining');
  const bigDataChaining = bigData.filter(num => num % 2).map(oddNum => oddNum * 2);
  console.timeEnd('BigDataChaining');

  console.time('BigDataReduce');
  const bigDataReduce = bigData.reduce((doubledOdds, num) => {
    num % 2 && doubledOdds.push(num * 2)
    return doubledOdds;
  }, []);
  console.timeEnd('BigDataReduce');
}

// Other Reduce Args - Finding Mean with Reduce
{
  const testScores = [96, 87, 64, 78, 54, 98];
  const sum = (acc, value) => acc + value;

  console.log('Average test scores with sum:',
    testScores.reduce(sum, 0)/testScores.length); // 79.5

  // Pick your favorite
  const findMean = (collection) => collection.reduce(sum, 0)/collection.length;

  console.log('Average test scores with reduce:',
    findMean(collection)); // 79.5, all within the reduce!
}

// Common Mistakes with Reduce
{
  // The "feature" of reduce defaulting the intial value to the first element in the collection is rarely useful...
  const mistakeVals = [1, 2, 3];

  const mistakeSum = (acc, val) => acc + val;

  const mistakeValsSummedNoInitial = mistakeVals.reduce(mistakeSum);
  const mistakeValsSummedWithInitial = mistakeVals.reduce(mistakeSum, 0);
  console.log('"Safe" mistakes:',
    mistakeValsSummedNoInitial,
    mistakeValsSummedWithInitial)
    // 6, 6 (despite the first not passing an initial value)

  // ...and almost always leads to unexpected results
  const ironThrone = ['Stark', 'Stark', 'Lannister', 'Lannister', 'Lannister', 'Greyjoy'];
  const mistakeTallyNoInit = (tally, item) => {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }
  const noInitialValue = ironThrone.reduce(mistakeTallyNoInit); // no initial {}
  console.log('Who shall rule the seven kingdoms?', noInitialValue); // Stark

  // Failing to return your accumulator is the other most common mistake
  const mistakeTallyNoAccReturn = (tally, item) => {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    // return tally;
  }
  // var noAccReturned = ironThrone.reduce(mistakeTallyNoAccReturn, {}); // throws an error
}

// Toy Problems...reduced!
{
  const findLongestWord = sentence => ( // es6 implicit return
   sentence.split(' ').reduce((longestYet, word) =>
    longestYet.length > word.length ? longestYet : word, '')
  );
  // note this could all be one one line:
  const flw = s => s.split(' ').reduce((lw, w) => lw.length > w.length ? lw : w), '');
  // but we like descriptive variables

  const sentance = 'I have come here to return accumulators and chew bubblegum...';
  const longestWord = flw(sentance);
  console.log('Longest Word', longestWord); // 'accumulators'
}

// Flatten
{
  const nestedArraysToFlatten = [[1,2,3],[4,5,6],[7,8,9]];

  const flatten = (flatArr, arr) => flatArr.concat(arr);

  const flattened = nestedArraysToFlatten.reduce(flatten, []);
  console.log('Flattened arrs:', flattened); // [1,2,3,4,5,6,7,8,9]

  // multi level flatten:
  const deepFlatten = (flatArr, itemOrArr) => {
    if (Array.isArray(itemOrArr)) {
      flatArr = flatArr.concat(itemOrArr.reduce(deepFlatten, [])); // recursion!
    } else {
      flatArr.push(itemOrArr);
    }
    return flatArr;
  }

  const deepNestedArrs = [1, [2, 3, [4, 'five', 6], [7, 'ate'], 9], [10], 'eleven']
  // const deepFlattened = deepNestedArrs.reduce(deepFlatten, []);
  const deepFlattened = deepFlatten([], deepNestedArrs);
  console.log('Deep Flattened arrs:', deepFlattened);
  // [1,2,3,4,'five',6,7,'ate',9, 10, 'eleven']
}

// FlatMap
{
  const techMentors = [{
    name: 'Beth',
    age: 28,
    likes: ['Math', 'JavaScript', 'Ricochet Robots']
  }, {
    name: 'Dan',
    age: 29,
    likes: ['Crickets', 'The Queen', 'Being Proper']
  }, {
    name: 'Sunny',
    age: 25,
    likes: ['BitCoin', 'Meteor', 'Beth']
  }, {
    name: 'Zach',
    age: 28,
    likes: ['JavaScript', 'Bad Puns', 'Reduce']
  }, {
    name: 'Magee',
    age: 36,
    likes: ['JavaScript', 'Dogs', 'Riding Motorcycles']
  }];

  const mentorNamesAndAges = techMentors.reduce((namesAndAges, mentor) => {
    namesAndAges.names.push(mentor.name);
    namesAndAges.ages.push(mentor.age);
    return namesAndAges;
  }, {names: [], ages: []});

  console.log('Just names and ages:', mentorNamesAndAges);

  const sortedMentorLikes = techMentors
    .reduce((likes, mentor) => likes.concat(mentor.likes), [])
    .sort();

  console.log('Sorted Mentor Likes:', sortedMentorLikes);
}

// Pseudo-redux example
{
  var counterReducer = function(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return Object.assign({}, state, state.count++);
      case 'DECREMENT':
        return Object.assign({}, state, state.count--);
      default:
        return state;
    }
  };

  var initialCountState = {
    count: 0
  };

  var actions = [{type: 'INCREMENT'}, {type: 'NOT_VALID'}, {type: 'INCREMENT'}, {type: 'DECREMENT'}];

  console.log(actions.reduce(counterReducer, initialCountState));
}
