const catchErrors = (error, dispayError) => {
  let errorMsg

  if (error.response) {
    console.error('Error response', error.response.data)
    errorMsg = error.response.data

    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else if (error.request) {
    console.error('Errror request!', error.request)
    errorMsg = error.request
  } else {
    console.error('Error message!', error.message)
    errorMsg = error.message
  }

  dispayError(errorMsg)
}

export default catchErrors