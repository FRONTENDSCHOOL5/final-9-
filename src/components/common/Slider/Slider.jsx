import React from 'react';
import styled from 'styled-components';
import userInformStore from '../../../apis/MainPage/usersCampaigns';
import { useNavigate } from 'react-router-dom';

export default function Slider({ type, displayedData }) {
  const navigate = useNavigate();
  const slideColors = ['0, 80, 200', '5, 170, 90', '255, 204, 0', '255,79,1', '100, 0, 200'];
  const usersActivityData = userInformStore.filter((el) => el.name === 'user')[0].campaign;
  const getCampaignDay = (endline) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + endline * 24 * 60 * 60 * 1000);
    const futureDayOfWeek = weekdays[futureDate.getDay()];
    const answer = `${futureDate.getMonth() + 1}. ${futureDate.getDate()}. ${futureDayOfWeek}`;
    return answer;
  };

  const goToDonation = (id) => {
    navigate(`/help/donation/${id}`);
  };
  return (
    <Slides type={type}>
      <ul>
        {type === 'help'
          ? displayedData.map((el, index) => {
              return (
                <Slide
                  key={index}
                  type={type}
                  bgColor={`${slideColors[index % 4]}`}
                  onClick={() => {
                    goToDonation(el.id);
                  }}
                >
                  <img src={el.image} alt={`${el.type}후원카드`}></img>
                  <SlideBadge fontColor={`${slideColors[index % 4]}`}>{el.type}</SlideBadge>
                  <DonationSlideDesc>
                    <span>D-{el.endline}</span>
                    <span>{el.location}</span>
                    <span>{el.detail}</span>
                    <DonationProgressBar
                      percentage={parseInt((el.donated / el.donationGoal) * 100)}
                    >
                      <div></div>
                    </DonationProgressBar>
                    <div>
                      <span>{el.donated?.toLocaleString()}원</span>
                      <span>{parseInt((el.donated / el.donationGoal) * 100)}%</span>
                    </div>
                  </DonationSlideDesc>
                </Slide>
              );
            })
          : usersActivityData.map((el, index) => {
              return (
                <Slide key={index} type={type} bgColor={`${slideColors[index % 4]}`}>
                  <img src={el.image} alt='activity이미지' />
                  <SlideBadge fontColor={`${slideColors[index % 4]}`}>D-{el.endline}</SlideBadge>
                  <CampaignSlideDesc>
                    <div>
                      <span>{el.time}</span>
                      <span>{getCampaignDay(el.endline)}</span>
                    </div>
                    <div>
                      <span>{el.gatherPlace}</span>
                      <span>{el.detail} 봉사</span>
                    </div>
                  </CampaignSlideDesc>
                </Slide>
              );
            })}
      </ul>
    </Slides>
  );
}

const CampaignSlideDesc = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  width: 100%;
  bottom: 20px;
  padding: 0 15px;

  div {
    display: flex;
    flex-direction: column;
    color: white;
    z-index: 1;
    span:nth-child(1) {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 5px;
    }
    span:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const DonationProgressBar = styled.div`
  display: block;
  position: relative;
  width: 190px;
  height: 7px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;

  div {
    top: 0;
    position: absolute;
    width: ${(props) => props.percentage}%;
    height: 7px;
    border-radius: 10px;
    background-color: white;
    z-index: 1;
  }
`;

const Slides = styled.article`
  width: 100%;
  margin-bottom: 40px;
  padding: 0 20px;

  ul {
    display: flex;
    align-items: center;
    height: ${(props) => (props.type === 'help' ? '300px' : '200px')};
    gap: 25px;
    overflow-x: scroll;
    overflow: auto;
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
      /* 크롬, 사파리, 오페라, 엣지 */
      display: none;
    }
  }
`;

const Slide = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  //cursor: pointer;

  &::after {
    content: '';

    border-radius: 8px;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 10px;

    background-color: rgba(${(props) => props.bgColor}, 0.2);
    background: linear-gradient(
        180deg,
        rgba(${(props) => props.bgColor}, 0) 58.27%,
        rgba(${(props) => props.bgColor}, 0.5) 100%
      ),
      radial-gradient(
        98.66% 75.77% at 73.26% 24.23%,
        rgba(${(props) => props.bgColor}, 0) 0%,
        rgba(${(props) => props.bgColor}, 0.5) 100%
      );
  }

  img {
    width: ${(props) => (props.type === 'help' ? '230px' : '315px')};
    border-radius: 10px;

    aspect-ratio: ${(props) => (props.type === 'help' ? '230/260' : '315/141')};
    object-fit: cover;
    opacity: 0.8;
  }
`;

const SlideBadge = styled.div`
  position: absolute;
  top: -5px;
  left: 19px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  background-color: white;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  color: rgb(${(props) => props.fontColor});
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    box-shadow: 0px -1px 2px 0px #ccc;
    z-index: -1;
  }
`;

const DonationSlideDesc = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  color: white;
  z-index: 10;

  & span:nth-child(1) {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  & span:nth-child(2) {
    font-size: 14px;
    margin-bottom: 6px;
  }

  & span:nth-child(3) {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & div:nth-child(5) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.8;
      margin-bottom: 20px;
    }
  }
`;
