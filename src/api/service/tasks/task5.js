export default {
  title: 'Простые числа',
  id: 4,
  description:
    'Необходимо найти количество простых чисел в заданном отрезке, с учетом,\n' +
    ' что найденное простое число в инвертированном виде, также является простым числом и не равно себе.\n' +
    'Например, 13 - просто и 31 - тоже просто, также 13 не равно 31, значит число 13 подходит, в отличии от 11.\n' +
    'findPrime(2, 50) => [13, 17, 31, 37] => 4 числа',
  funcName: 'findPrime',
  tests: [
    {
      args: "2,100",
      result: '8'
    },
    {
      args: "9900,10000",
      result: '4'
    },
    {
      args: "501,599",
      result: '0'
    }
  ],
  sample:
    'Test.assertEquals(findPrime(2, 100), 8);\nTest.assertEquals(findPrime(9900, 10000), 4);\n',
  init: 'function findPrime(min, max){\n    return 0;\n}',
  scope: 10
}
