export default {
  title: 'Задача о бубликах',
  id: 1,
  description:
    'Зная длину бублика необходимо найти его радиус.',
  funcName: 'findShort',
  tests: [
    {
      args: "'bitcoin take over the world maybe who knows perhaps'",
      result: '3'
    }
  ],
  sample:
    'Test.assertEquals(findShort("bitcoin take over the world maybe who knows perhaps"), 3);\n',
  init: 'function findShort(s){\n\n}',
  scope: 3
}
