export default {
  title: 'Счастливый билет',
  id: 1,
  description:
    'Необходимо написать проверку числа, равна ли сумма его первых N цифр, сумме последних N цифр. Число на вход всегда кратно 2, и не пустое.',
  funcName: 'checkNumber',
  tests: [
    {
      args: "'233152'",
      result: 'true'
    },
    {
      args: "'1567'",
      result: 'false'
    },
    {
      args: "'15151515'",
      result: 'true'
    }
  ],
  sample:
    'Test.assertEquals(checkNumber("233152"), true);\nTest.assertEquals(checkNumber("1567"), false);\n',
  init: 'function checkNumber(s){\n\n}',
  scope: 5
}
