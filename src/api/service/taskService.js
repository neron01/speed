import task1 from './tasks/task1'
import task2 from './tasks/task2'
import task3 from './tasks/task3'
import task4 from './tasks/task4'
import task5 from './tasks/task5'
import task6 from './tasks/task6'
const request = require('request')

export const checkTask = async (params) => {
  const task = mapper[params.taskNumber]
  if (!task) {
    return false
  }
  for (const test of task.tests) {
    const testResult = await runTest(params.funcExec, task.funcName, test.args, test.result)
    if (!testResult) {
      return false;
    }
  }

  return true;
}

export const getTaskScope = (taskId) => {
  let mapperElement = mapper[taskId];
  return mapperElement? mapperElement.scope : 0;
}
export const getAllTasks = () => {
  // TODO
}

const runTest = async (testFunction, funcName, args, expectedResult) => {
  try {
    const response = await doRequest('https://rextester.com/rundotnet/Run', {
      formData: {
        LanguageChoiceWrapper: 17,
        Program: testFunction + ';print(' + funcName + '(' + args + '));'
      }
    })
    console.log('response')
    console.log(response);
    const parsedResponse = JSON.parse(response);
    if (parsedResponse.Errors) {
      console.error('upload failed:', parsedResponse.Errors)
    }
    const res = parsedResponse.Result;
    console.log('Res');
    console.log(res);
    console.log('expectedResult');
    console.log(expectedResult);

    let cuttedResult = res.substring(0, res.length - 1)
    console.log('cuttedResult = ' + cuttedResult);
    let b = expectedResult === cuttedResult
    console.log('final result = ' + b)
    return b;
  } catch (e) {
    return false
  }
}

function doRequest(url, option) {
  return new Promise(function(resolve, reject) {
    request.post(url, option, function(error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body)
      } else {
        reject(error)
      }
    })
  })
}

export const mapper = [task1, task2, task3, task4, task5, task6]
