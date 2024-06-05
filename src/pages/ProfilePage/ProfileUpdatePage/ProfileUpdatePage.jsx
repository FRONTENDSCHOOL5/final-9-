import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import backIcon from '../../../assets/icons/common/back.png';
import { useNavigate, useParams } from 'react-router-dom';
import addImage from '../../../assets/images/Postpage/addImage.png';

import { UserContext } from '../../../context/UserContext';

export default function ProfileUpdatePage() {
  const { user, updateUser, refresh } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUpdateChecker, setImageUpdateChecker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullImgName, setFullImgName] = useState('');
  const [transmitChecker, setTransmitChecker] = useState('');
  const addImageBtn = useRef();
  const userImageRef = useRef();
  const nicknameRef = useRef();
  const accountnameRef = useRef();
  const selfIntroRef = useRef();
  const [accountnameValid, setAccountnameValid] = useState(null);
  const backToPage = () => {
    navigate(-1);
  };

  const getUserProfile = /* async */ () => {
    try {
      /*  const response = await fetch(url + `/profile/${params.accountname}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.profile);
      } else {
        console.error('Error:', response.status);
      } */
      // eslint-disable-next-line no-undef
      const USERS_API = JSON.parse(process.env.REACT_APP_USERS_API);
      const data = USERS_API.filter((user) => user.accountname === params.accountname)[0];
      setUserInfo(data);
    } catch (error) {
      console.error('실패:', error);
    }
  };

  const getUserInfo = async () => {
    await updateUser(JSON.parse(localStorage.getItem('user')));
  };

  const handleImageChange = (event) => {
    const file = event.target.files;

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setSelectedImage(file[0]);
      setImageUpdateChecker(true);
    };
  };

  const addImageHandler = () => {
    addImageBtn.current.click();
  };

  const previousImgUpload = /* async */ () => {
    const imgData = new FormData();
    imgData.append('image', selectedImage);
    try {
      /*  const response = await fetch(url + '/image/uploadfiles', {
        method: 'POST',
        body: imgData,
      });
      if (response.ok) {
        const data = await response.json();
        setFullImgName(`https://api.mandarin.weniv.co.kr/${data[0].filename}`);
        setImageUpdateChecker(false);
      } else {
        console.error('Error:', response.status);
      } */
    } catch (error) {
      console.error('실패:', error);
    }
  };

  const transProfileUpdateInfo = () => {
    if (!selectedImage) {
      setSelectedImage(userImageRef.current.src);
    }
    if (!checkExistence()) {
      return;
    }
    if (imageUpdateChecker) {
      previousImgUpload();
    } else {
      if (!fullImgName) {
        setFullImgName(userImageRef.current.src);
      } else {
        setTransmitChecker((prev) => !prev);
      }
    }
  };

  useEffect(() => {
    const transmitFunc = /* async */ () => {
      const profileData = {
        user: {
          username: nicknameRef.current.value,
          accountname: accountnameRef.current.value,
          intro: selfIntroRef.current.value,
          image: fullImgName,
        },
      };
      try {
        /*  const response = await fetch(url + `/user`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });
        if (response.ok) {
          const data = await response.json();
          // 이전 값을 불러오기
          const previousData = JSON.parse(localStorage.getItem('user'));

          // 변경된 값 계산
          const newData = { ...previousData, ...data.user };

          // 변경된 값만 반영하기
          localStorage.setItem('user', JSON.stringify(newData));
          navigate(-1);
        } else {
          setAccountnameValid(undefined);
          console.error('Error:', response.status);
        } */
      } catch (error) {
        console.error('실패:', error);
      }
    };
    if (fullImgName) transmitFunc();
    // eslint-disable-next-line
  }, [fullImgName, transmitChecker]);

  const checkExistence = () => {
    // 유효성 검사를 수행하는 함수 호출
    setAccountnameValid(validateAccountname(accountnameRef.current.value));
    return validateAccountname(accountnameRef.current.value);
  };

  const validateAccountname = (input) => {
    const regex = /^[A-Za-z0-9._]+$/;
    // 영문자, 숫자, 점(.), 밑줄(_)만 허용하는 정규식

    if (regex.test(input)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserProfile();
    if (user.accountname !== params.accountname) {
      backToPage();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className='container'>
      <div className='wrapper'>
        <ProfilePageHeader>
          <img src={backIcon} alt='뒤로가기버튼' onClick={backToPage} />
          <span>{user?.accountname === userInfo?.accountname ? '마이페이지' : '이웃정보'}</span>
        </ProfilePageHeader>
        <ProfileDetailContainer>
          <ProfileImgContainer>
            <AddImage onClick={addImageHandler}>
              <img id='addImgBtn' src={addImage} alt='이미지추가버튼' />
              <Input
                type='file'
                name='profileImage'
                multiple
                onChange={handleImageChange}
                bgImg={addImage}
                ref={addImageBtn}
              />
              {(imagePreview || userInfo?.image) && (
                <img
                  src={imagePreview ? imagePreview : userInfo?.image}
                  alt='Preview'
                  style={{ width: '100px' }}
                  ref={userImageRef}
                />
              )}
            </AddImage>
          </ProfileImgContainer>
          <DetailInfoContainer>
            <span>상세정보</span>
            <div>
              <DetailList>
                <span>닉네임</span>
                <input type='text' defaultValue={userInfo?.username} ref={nicknameRef} />
              </DetailList>
              <DetailList>
                <div>
                  <span>계정아이디</span>
                </div>
                <input type='text' defaultValue={userInfo?.accountname} ref={accountnameRef} />
                {accountnameValid === true ? (
                  <p style={{ color: 'green' }}>사용가능한 계정아이디 입니다.</p>
                ) : accountnameValid === false ? (
                  <p style={{ color: 'red' }}>
                    계정아이디는 영문자, 숫자, 점(.), 밑줄(_)만 포함할 수 있습니다.
                  </p>
                ) : accountnameValid === undefined ? (
                  <p style={{ color: 'red' }}>이미 사용중인 계정아이디입니다.</p>
                ) : (
                  ''
                )}
              </DetailList>
              <DetailList>
                <span>자기소개</span>
                <textarea type='text' defaultValue={userInfo?.intro} ref={selfIntroRef} />
              </DetailList>
            </div>
          </DetailInfoContainer>
          <UpdateBtn onClick={transProfileUpdateInfo} disabled={true}>
            수정
          </UpdateBtn>
        </ProfileDetailContainer>
      </div>
    </section>
  );
}

const AddImage = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  position: relative;
  img {
    aspect-ratio: 1;
    object-fit: contain;
  }
  #addImgBtn {
    position: absolute;
    width: 40px;
    z-index: 49;
    right: 90px;
    bottom: -10px;
  }
`;
const Input = styled.input`
  display: none;
`;

const UpdateBtn = styled.button`
  width: 200px;
  height: 50px;
  text-align: center;
  border-radius: 5px;
  color: white;
  background-color: black;
  margin: 45px 0;
  font-size: 16px;
  font-weight: bold;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  span {
    font-size: 14px;
  }

  div {
    margin-bottom: 10px;
  }

  span:nth-child(1) {
    color: #a5a5a5;
    margin-bottom: 10px;
  }

  & > input,
  & > textarea {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }
  & > p {
    margin-top: 10px;
    padding-left: 5px;
  }
`;

const DetailInfoContainer = styled.div`
  width: 100%;
  padding: 0px 20px;

  & > span {
    display: block;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const ProfileDetailContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const ProfileImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  img {
    border: 1px solid #ccc;
    width: 100px;
    border-radius: 100%;
    cursor: pointer;

    aspect-ratio: 15/15;
    object-fit: cover;
  }
`;

const ProfilePageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 16px;
  margin: 20px 0 40px;

  img {
    position: absolute;
    width: 15px;
    left: 20px;
    cursor: pointer;

    aspect-ratio: 15/15;
    object-fit: contain;
  }
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;
