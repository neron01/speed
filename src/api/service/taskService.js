import task1 from './tasks/task1'
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

export const getAllTasks = () => {
  // TODO
}

const runTest = async (testFunction, funcName, args, expectedResult) => {
  try {
    console.log('testFunction = ' + testFunction)
    console.log('funcName = ' + funcName)
    console.log('args = ' + args)

    const response = await doRequest('https://rextester.com/rundotnet/Run', {
      formData: {
        LanguageChoiceWrapper: 23,
        Program: testFunction + ';console.log(' + funcName + '(' + args + '));'
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

export const mapper = [task1]
