export default {
  title: 'Тройная сумма',
  id: 2,
  description:
    'Необходимо найти максимальную сумму трех подряд идущих цифр в массиве. Массив не пустой и в нем более трех элементов.',
  funcName: 'getMaxSum',
  tests: [
    {
      args: "[2,1,8,0,-6,4,8,6,2,4]",
      result: '18'
    },
    {
      args: "[3,2,6,8,2,3]",
      result: '16'
    },
    {
      args: "[-100,-300,-200,-50]",
      result: '-550'
    },
    {
      args: "[3,2,6,8,8,15,2,3]",
      result: '31'
    }
  ],
  sample:
    'Test.assertEquals(getMaxSum([3,2,6,8,2,3]), 16);\nTest.assertEquals(getMaxSum([2,1,8,0,-6,4,8,6,2,4]), 18);\n',
  init: 'function getMaxSum(s){\n\n}',
  scope: 5
}
