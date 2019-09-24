export default {
  title: 'Задача 1',
  description: '' +
    'Проанализируя строку, верните длину самого короткого слова.\n' +
    'Строка никогда не будет пустой, и вам не нужно учитывать разные типы данных.',
  funcName: 'findShort',
  tests: [
    {
      args: "'bitcoin take over the world maybe who knows perhaps'",
      result: '3'
    }
  ],
  sample: 'Test.assertEquals(findShort("bitcoin take over the world maybe who knows perhaps"), 3);\n',
  init: 'function findShort(s){\n\n}',
  scope: 5
}
