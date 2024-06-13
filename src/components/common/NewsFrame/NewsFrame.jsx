import React from 'react';
import campaignApi from '../../../apis/HelpPage/campaignApi';
import newsData from '../../../apis/PreventPage/newsApi';
import styled, { css } from 'styled-components';

export default function NewsFrame({ type, sorted }) {
  const slideColors = ['0, 80, 200', '5, 170, 90', '255, 204, 0', '255,79,1', '100, 0, 200'];
  const gridCompareFn = (a, b) => {
    if (sorted === 'hottest') {
      return b.participant / b.participantGoal - a.participant / a.participantGoal;
    } else if (sorted === 'newest') {
      return b.endline - a.endline;
    }
  };
  const gridCampaignData = [...campaignApi];
  gridCampaignData.sort(gridCompareFn).splice(4);
  return (
    <CampaignGrid>
      {type === 'help'
        ? gridCampaignData.map((el, index) => {
            return (
              <GridCard key={index}>
                <img src={el.image} alt='캠페인 그리드 이미지' />
                <span>{el.detail}</span>
                <CardDesc fontColor={`${slideColors[index % 4]}`} type={type}>
                  <span>
                    {el.participant} / {el.participantGoal} (명)
                  </span>
                  <span>D-{el.endline}</span>
                </CardDesc>
                <GridCardProgressBar
                  bgColor={`${slideColors[index % 4]}`}
                  percentage={parseInt((el.participant / el.participantGoal) * 100)}
                >
                  <div></div>
                </GridCardProgressBar>
              </GridCard>
            );
          })
        : newsData.map((el, index) => {
            return (
              <GridCard key={index}>
                <img src={el.image} alt='뉴스 그리드 이미지' />
                <span className='multi-ellipsis'>{el.headline}</span>
                <CardDesc fontColor={`${slideColors[index % 4]}`} type={type}>
                  <span>{el.type}</span>
                  <span>{el.date}</span>
                  <span>{el.time}</span>
                </CardDesc>
              </GridCard>
            );
          })}
    </CampaignGrid>
  );
}
const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 160px);
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 65px;
  justify-content: center;
`;

const GridCardProgressBar = styled.div`
  display: block;
  position: relative;
  width: 160px;
  height: 7px;
  border-radius: 10px;
  background-color: rgba(${(props) => props.bgColor}, 0.1);
  margin-bottom: 10px;

  div {
    top: 0;
    position: absolute;
    width: ${(props) => props.percentage}%;
    height: 7px;
    border-radius: 10px;
    background-color: rgb(${(props) => props.bgColor});
    z-index: 1;
  }
`;

const GridCard = styled.div`
  display: flex;
  flex-direction: column;
  img {
    background-color: #c4c4c4;
    filter: grayscale(100%);
    width: 160px;
    border-radius: 10px;
    aspect-ratio: 160/100;
    object-fit: cover;
    margin-bottom: 15px;
    align-self: center;
  }

  span:nth-child(2) {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 12px;
    color: #191919;
  }
`;

const CardDesc = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.type === 'help'
      ? css`
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        `
      : css`
          gap: 5px;
        `}

  span:nth-child(1) {
    font-size: 12px;
    color: rgb(${(props) => props.fontColor});
    font-weight: bold;
  }

  span:nth-child(2) {
    font-size: 12px;
    color: ${(props) => (props.type === 'help' ? '#aaaaaa' : '#cccccc')};
    font-weight: normal;
    margin: unset;
  }

  ${(props) =>
    props.type === 'news' &&
    css`
      span:nth-child(3) {
        font-size: 12px;
        color: #ccc;
      }
    `};
`;
