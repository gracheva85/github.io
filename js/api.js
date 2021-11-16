const getData = (url, onSuccess, onError) => fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    onError();
  });

const sendData = (url, onSuccess, onFail, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  ).then((response) => response.ok ? onSuccess() : onFail(),
  )
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
