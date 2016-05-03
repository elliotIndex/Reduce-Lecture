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

  // notice that reducer function is inline
  const doubleMap = valuesToDouble.reduce((output, num) => {
    accumulator.push(item * 2);
    return accumulator;
  }, []);

  console.log('Lets go Dubs', doubleMap); // [2, 22, 42, 2422, 222442]
}

// Filter
{
  var valuesToFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var findOdds = function(accumulator, item) {
    if (item % 2 !== 0) {
      accumulator.push(item);
    }
    return accumulator;
  };

  var odds = valuesToFilter.reduce(findOdds, []); // [1,3,5,7,9]

  console.log('Odd numbers:', odds);
}

// FilterMap with Reduce vs. Chaining 1
{
  var valuesToFilterMap = [2,5,7,9,10];

  var findOddsAndDouble = function(acc, item) {
    if (item % 2 !== 0) {
      acc.push(item * 2);
    }
    return acc;
  }

  var oddsDoubled = valuesToFilterMap.reduce(findOddsAndDouble, []);

  console.log(oddsDoubled); // [10,14,18]

  var oddsDoubledChained = valuesToFilterMap.filter(function(item) {
    return item % 2 !== 0;
  }).map(function(item) {
    return item * 2;
  });

  console.log(oddsDoubledChained); // Still [10, 14, 18], and this is arguably more readible
}

// FilterMap with Reduce vs. Chaining 2
{
  var bigData = [];
  for (var i = 0; i < 10000000; i++) { // Ten bajillion
    bigData.push(i);
  }

  console.time('BigDataChaining');
  var bigDataChaining = bigData.filter(function(item) {
    return item % 2 !== 0;
  }).map(function(item) {
    return item * 2;
  });
  console.timeEnd('BigDataChaining');

  console.time('BigDataReduce');
  var bigDataReduce = bigData.reduce(function(acc, item) {
    if (item % 2 !== 0) {
      acc.push(item * 2);
    }
    return acc;
  }, [])
  console.timeEnd('BigDataReduce');
}

// Other Reduce Args - Finding Mean with Reduce
{
  var testScores = [1, 2, 3, 4, 5, 6];
  // var testScores = [96, 87, 64, 78, 54, 98];
  var sum = function(acc, value) {
    return acc + value;
  }

  console.log('Average test scores with sum:',
    testScores.reduce(sum, 0)/testScores.length); // 79.5

  var findMean = function(acc, value, index, collection) {
    var sum = acc + value;
    if (index !== collection.length - 1) {
      return sum;
    }
    return sum/collection.length;
  }

  // // We all love ternary operators
  // var findMean = function(acc, value, index, collection) {
  //   var sum = acc + value;
  //   return collection.length !== index + 1 ? sum : sum / collection.length;
  // }


  console.log('Average test scores with reduce:',
    testScores.reduce(findMean, 0)); // 79.5, all within the reduce!
}

// Common Mistakes with Reduce
{
  // The "feature" of reduce defaulting the intial value to the first element in the collection is rarely useful...
  var mistakeVals = [1, 2, 3];

  var mistakeSum = function(acc, val) {
    return acc + val;
  }

  var mistakeValsSummedNoInitial = mistakeVals.reduce(mistakeSum);
  var mistakeValsSummedWithInitial = mistakeVals.reduce(mistakeSum, 0);
  console.log('Safe mistakes:',
    mistakeValsSummedNoInitial,
    mistakeValsSummedWithInitial)
    // 6, 6 (despite the first not passing an initial value)

  // ...and almost always leads to unexpected results
  var ironThrone = ['Stark', 'Stark', 'Lannister', 'Lannister', 'Lannister', 'Greyjoy'];
  var mistakeTallyNoInit = function (tally, item) {
    if (!tally[item]) {
      tally[item] = 1;
    } else {
      tally[item]++;
    }
    return tally;
  }
  var noInitialValue = ironThrone.reduce(mistakeTallyNoInit);
  console.log('Who shall rule the seven kingdoms?', noInitialValue); // Stark

  // Failing to return your accumulator is the other most common mistake
  var mistakeTallyNoAccReturn = function (tally, item) {
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
  var findLongestWord = function(sentence) {
    return sentence.split(' ').reduce(function(acc, word, index, wordArr) {
      if (acc.length < word.length) {
        acc = word;
      }
      return acc;
    }, "");
  }
  var sentance = "I have come here to return accumulators and chew bubblegum...";
  var longestWord = findLongestWord(sentance);
  console.log('Longest Word', longestWord); // 'accumulators'
}

// Flatten
{
  var nestedArraysToFlatten = [[1,2,3],[4,5,6],[7,8,9]];

  var flatten = function(acc, arr) {
    return acc.concat(arr);
  }

  var flattened = nestedArraysToFlatten.reduce(flatten, []);
  console.log('Flattened arrs:', flattened); // [1,2,3,4,5,6,7,8,9]

  // multi level flatten:
  var deepFlatten = function(acc, item) {
    if (Array.isArray(item)) {
      acc = acc.concat(item.reduce(deepFlatten, []));
    } else {
      acc.push(item);
    }
    return acc;
  }

  var deepNestedArrs = [1, [2, 3, [4, 'five', 6], [7, 'ate'], 9], [10], 'eleven']
  var deepFlattened = deepNestedArrs.reduce(deepFlatten, []);
  console.log('Deep Flattened arrs:', deepFlattened);
  // [1,2,3,4,'five',6,7,'ate',9, 10, 'eleven']
}

// FlatMap
{
  var techMentors = [{
    name: 'Beth',
    age: 28,
    likes: [
      'Math',
      'JavaScript',
      'Ricochet Robots'
    ]
  }, {
    name: 'Dan',
    age: 29,
    likes: [
      'Crickets',
      'The Queen',
      'Being Proper'
    ]
  }, {
    name: 'Sunny',
    age: 25,
    likes: [
      'BitCoin',
      'Meteor',
      'Beth',
    ]
  }, {
    name: 'Zach',
    age: 28,
    likes: [
      'JavaScript',
      'Bad Puns',
      'Reduce',
    ]
  }, {
    name: 'Magee',
    age: 36,
    likes: [
      'JavaScript',
      'Dogs',
      'Riding Motorcycles',
    ]
  }];

  var mentorNamesAndAges = techMentors.reduce(function(namesAndAges, mentor) {
    namesAndAges.names.push(mentor.name);
    namesAndAges.ages.push(mentor.age);
    return namesAndAges;
  }, {names: [], ages: []});

  console.log('Just names and ages:', mentorNamesAndAges);

  var sortedMentorLikes = techMentors.reduce(function(likes, mentor, index, mentors) {
    mentor.likes.forEach(function(like) {
      if (likes.indexOf(like) === -1) {
        likes.push(like);
      }
    });
    return index !== mentors.length - 1 ? likes : likes.sort();
  }, []);

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
