import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icons/common/back.png';
import { useNavigate, useParams } from 'react-router-dom';
import profileimg from '../../assets/images/loginPage/logo.png';
import { UserContext } from '../../context/UserContext';

export default function ProfilePage() {
  const { user, updateUser, refresh } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const backToPage = () => {
    navigate(-1);
  };

  const goToUpdate = () => {
    navigate(`/profile/${params.accountname}/update`);
  };

  const goToFollowerPage = () => {
    navigate(`/profile/${params.accountname}/follower`);
  };

  const goToFollowingPage = () => {
    navigate(`/profile/${params.accountname}/following`);
  };

  const getUserProfile = /* async */ () => {
    try {
      /* const response = await fetch(url + `/profile/${params.accountname}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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

  useEffect(() => {
    getUserInfo();
    getUserProfile();
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
            <img src={userInfo?.image ? userInfo?.image : profileimg} alt='프로필사진' />
          </ProfileImgContainer>
          <FollowInfoContainer>
            <div onClick={goToFollowingPage} style={{ cursor: 'pointer' }}>
              <span>팔로잉</span>
              <span>{userInfo?.followingCount}</span>
            </div>
            <div onClick={goToFollowerPage} style={{ cursor: 'pointer' }}>
              <span>팔로워</span>
              <span>{userInfo?.followerCount}</span>
            </div>
          </FollowInfoContainer>
          <DetailInfoContainer>
            <span>상세정보</span>
            <div>
              <DetailList>
                <span>닉네임</span>
                <span>{userInfo?.username}</span>
              </DetailList>
              <DetailList>
                <span>계정아이디</span>
                <span>{userInfo?.accountname}</span>
              </DetailList>
              <DetailList>
                <span>자기소개</span>
                <span>{userInfo?.intro}</span>
              </DetailList>
            </div>
          </DetailInfoContainer>
          {user?.accountname === userInfo?.accountname && (
            <UpdateBtn onClick={goToUpdate}>상세정보 수정</UpdateBtn>
          )}
        </ProfileDetailContainer>
      </div>
    </section>
  );
}

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

  span:nth-child(1) {
    color: #a5a5a5;
    margin-bottom: 10px;
  }
`;

const DetailInfoContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  margin-top: 40px;

  & > span {
    display: block;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const FollowInfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 200px;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    span {
      font-size: 16px;
      font-weight: bold;
    }
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
