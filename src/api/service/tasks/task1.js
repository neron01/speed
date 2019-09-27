export default {
  title: 'Поиск минимального слова',
  id: 0,
  description: '' +
    'Проанализируя строку, верните длину самого короткого слова.\n' +
    'Строка никогда не будет пустой, и вам не нужно учитывать разные типы данных.',
  funcName: 'findShort',
  tests: [
    {
      args: "'bitcoin take over the world maybe who knows perhaps'",
      result: '3'
    },
    {
      args: "'bitcoin world maybe perhaps'",
      result: '5'
    }
  ],
  sample: 'Test.assertEquals(findShort("bitcoin take over the world maybe who knows perhaps"), 3);\n',
  init: 'function findShort(s){\n\n}',
  scope: 3
}
