export default {
  title: 'Скобочки',
  id: 5,
  description:
    'Необходимо преобразовать входную строку в строку состоящую из символов "(" и ")".\n' +
    '"(" - ставится если символ в строке встречается четное количество раз.\n' +
    '")" - ставится если символ в строке встречается нечетное количество раз.\n' +
    'Регистр не имеет значения',
  funcName: 'transform',
  tests: [
    {
      args: "'Hello World'",
      result: '))))())()))'
    },
    {
      args: "'AaDf'",
      result: '(())'
    },
    {
      args: "'asdasd'",
      result: '(((((('
    }
  ],
  sample:
    'Test.assertEquals(transform("Hello World"), "))))())()))");\nTest.assertEquals(transform("AaDf"), "(())");\n',
  init: 'function transform(str){\n    return "";\n}',
  scope: 7
}
