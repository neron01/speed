export default {
  title: 'Преобразование строки',
  id: 3,
  description:
    'Необходимо преобразовать строку к виду CamelCase, удаляя пробелы.',
  funcName: 'CamelCase',
  tests: [
    {
      args: "'HELLO world'",
      result: 'HelloWorld'
    },
    {
      args: "'bee make bee   and'",
      result: 'BeeMakeBeeAnd'
    },
    {
      args: "'asd 345 AAA asd'",
      result: 'Asd345AaaAsd'
    }
  ],
  sample:
    'Test.assertEquals(CamelCase("HELLO world"), "HelloWorld");\nTest.assertEquals(CamelCase("bee make bee  and "), "BeeMakeBeeAnd");\n',
  init: 'function CamelCase(s){\n\n}',
  scope: 3
}
