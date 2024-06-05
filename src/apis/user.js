export const emailValidationApi = async (email, { onSuccess, onError }) => {
  try {
    const response = await fetch('https://api.mandarin.weniv.co.kr/user/emailvalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
        },
      }),
    });

    const result = await response.json();
    onSuccess(result);
  } catch (err) {
    onError(err);
  }
};

export const accountNameValidationApi = async (accountname, { onSuccess, onError }) => {
  try {
    const response = await fetch('https://api.mandarin.weniv.co.kr/user/accountnamevalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          accountname,
        },
      }),
    });

    const result = await response.json();
    onSuccess(result);
  } catch (err) {
    onError(err);
  }
};

export const signUpApi = async (
  { username, email, password, accountname, intro, image },
  { onSuccess, onError },
) => {
  const usernameReq = username ? { username } : { username: accountname };
  const introReq = intro ? { intro } : null;
  const imageReq = image ? { image } : null;

  try {
    const response = await fetch('https://api.mandarin.weniv.co.kr/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          accountname,
          ...usernameReq,
          ...introReq,
          ...imageReq,
        },
      }),
    });

    const result = await response.json();
    onSuccess(result);
  } catch (err) {
    onError(err);
  }
};

export const loginApi = /* async */ ({ email, password }, { onSuccess, onError }) => {
  try {
    /* const response = await fetch('https://api.mandarin.weniv.co.kr/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });

    const result = await response.json();

    onSuccess(result);
*/
    //eslint-disable-next-line
    const LOGIN_API = JSON.parse(process.env.REACT_APP_LOGIN_API);
    //eslint-disable-next-line
    const USERS_API = JSON.parse(process.env.REACT_APP_USERS_API);

    const idMatch = LOGIN_API.find((el) => el.email === email);
    if (idMatch) {
      const userObejct = LOGIN_API.filter((el) => el.email === email)[0];
      if (userObejct.password === password) {
        const emailInput = email.split('@')[0];
        const result = {
          user: USERS_API.filter((el) => emailInput === el.accountname.split('@')[1])[0],
        };
        onSuccess(result);
      } else {
        throw Error;
      }
    }
  } catch (err) {
    onError(err);
  }
};
