// export function generateRandom(min, max) {
//   var num = Math.floor(Math.random() * (max - min + 1)) + min;
//   return num === 8 || num === 15 ? generateRandom(min, max) : num;
// }

const absentArray = [44, 65, 5, 34, 87, 42, 8, 76, 21, 33];
const len = 3;

export const generateRandomWithAbsentArray = (min, max, exclude) => {
  let random;
  while (!random) {
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    if (exclude.indexOf(x) === -1) random = x;
  }
  return random;
};

export const generateRandom = (numberOfElems, maxVal) => {
  //   const randomArray = [];
  //   for (let i = 0; i < len; ) {
  //     const random = Math.floor(Math.random() * lengthOfArr);
  //     if (!absentArray.includes(random) && !randomArray.includes(random)) {
  //       randomArray.push(random);
  //       i++;
  //     }
  //   }
  //   return randomArray;

  const n = numberOfElems;
  const arr = [];
  if (n == 0) {
    console.log(null);
  }
  let randomnumbers = new Set(),
    ans;

  while (randomnumbers.size < n) {
    randomnumbers.add(Math.floor(Math.random() * maxVal));
  }
  ans = [...randomnumbers];
  return ans;
};

export function zip(arr1, arr2) {
  console.log("arr1", arr1);
  console.log("arr2", arr2);
  let zipped = arr1.map((x, i) => {
    return { ...arr2[x] };
  });
  return zipped;
}
