import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import donationData from '../../../apis/HelpPage/donationApi';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

export default function DonationInform({ getFromInput }) {
  const donations = parseInt(getFromInput ? getFromInput : 0);
  const params = useParams();
  const navigation = useNavigate();
  const { user, updateUser, refresh, updateRefresh } = useContext(UserContext);
  const userInformation = donationData.filter((el) => {
    return el.id === parseInt(params.donationId);
  });

  const getUserInfo = async () => {
    await updateUser(JSON.parse(localStorage.getItem('user')));
  };
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DonationInfoSection>
        <span>후원 정보</span>
        <DonationDesc>
          <div>
            <span>후원자</span>
            <span>{user?.username}</span>
          </div>
          <div>
            <span>후원 내용</span>
            <span>
              [ {userInformation[0].location} ] <strong>{userInformation[0].detail}</strong>
            </span>
          </div>
          <div>
            <span>후원 금액</span>
            <span>{donations.toLocaleString()}원</span>
          </div>
        </DonationDesc>
      </DonationInfoSection>
      <DonationConfirmButtonContainer>
        <DonationConfirmButton onClick={() => navigation('/main')}>
          {donations.toLocaleString()}원을 후원해요
        </DonationConfirmButton>
      </DonationConfirmButtonContainer>
    </>
  );
}

const DonationConfirmButtonContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const DonationConfirmButton = styled.button`
  width: 100%;
  height: 50px;
  text-align: center;
  color: white;
  background-color: #191919;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 70px;
`;

const DonationInfoSection = styled.section`
  width: 100%;
  padding: 0 20px;
  & > span:first-child {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 50px;
    margin-top: 50px;
  }
`;

const DonationDesc = styled.div`
  div {
    display: flex;
    flex-direction: column;

    span:nth-child(1) {
      font-size: 12px;
      color: #888;
      margin-bottom: 8px;
    }

    span:nth-child(2) {
      font-size: 18px;
      color: #191919;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 32px;

      strong {
        font-size: 22px;
      }
    }
  }

  div:nth-child(2) {
    span:nth-child(2) {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 14px;
    }
  }
`;
