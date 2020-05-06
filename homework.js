const NumberOfElements = 100;

// Отсюда будем брать значения

let arr0 = [];
arr0.length = NumberOfElements;
arr0.fill(1).map((currentValue, index) => {
  arr0[index] = index + 1;
});

// Задание 1

let arr1 = [];
arr1.length = NumberOfElements;
arr1.fill(1).map((currentValue, index) => {
  const randomIndex = Math.floor(Math.random() * arr0.length);
  arr1[index] = arr0[randomIndex];
  arr0.splice(randomIndex, 1);
});
console.log('Задание 1\narr1:\n', arr1);

// Задание 2

let arr2 = [];
arr2.length = NumberOfElements;
arr2.fill(1).map((currentValue, index) => {
  arr2[index] = arr1[NumberOfElements - index - 1];
});
console.log('\nЗадание 2\narr2:\n', arr2);

// Задание 3

let arr3 = [];
arr3.length = NumberOfElements;
arr3.fill(1).map((currentValue, index) => {
  arr3[index] = arr1[index] - arr2[index];
});
console.log('\nЗадание 3\narr3:\n', arr3);

// Задание 4

let meanOfArray = arr3.reduce((acc, n) => {
  return acc + n;
});
meanOfArray /= NumberOfElements;
console.log('\nЗадание 4\nСреднее арифметическое: ', meanOfArray);