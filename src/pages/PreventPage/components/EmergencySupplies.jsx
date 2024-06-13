import React, { useState } from 'react';
import bottledWater from '../../../assets/icons/PreventPage/bottled-water.png';
import emergencyRations from '../../../assets/icons/PreventPage/emergency-rations.png';
import ointment from '../../../assets/icons/PreventPage/ointment.png';
import chronicDisease from '../../../assets/icons/PreventPage/chronic-disease.png';
import householdMedicine from '../../../assets/icons/PreventPage/household-medicine.png';
import clothes from '../../../assets/icons/PreventPage/clothes.png';
import underwear from '../../../assets/icons/PreventPage/underwear.png';
import shoes from '../../../assets/icons/PreventPage/shoes.png';
import paperTowel from '../../../assets/icons/PreventPage/paper-towel.png';
import wetTissue from '../../../assets/icons/PreventPage/wet-tissue.png';
import plasticBag from '../../../assets/icons/PreventPage/plastic-bag.png';
import lighter from '../../../assets/icons/PreventPage/lighter.png';
import battery from '../../../assets/icons/PreventPage/battery.png';
import flashlight from '../../../assets/icons/PreventPage/flashlight.png';
import styled from 'styled-components';

export default function EmergencySupplies() {
  const [listBtn, setListBtn] = useState(1);

  const emergencyData = [
    { id: 1, name: '전체', type: 1 },
    { id: 2, name: '비상식품', type: 2 },
    { id: 3, name: '구급약품', type: 3 },
    { id: 4, name: '생활용품', type: 4 },
    { id: 5, name: '가공식품', type: 5 },
  ];

  const itemListData = [
    { id: 1, name: '생수', src: bottledWater, type: 2 },
    { id: 2, name: '비상식량', src: emergencyRations, type: 2 },
    { id: 3, name: '연고', src: ointment, type: 3 },
    { id: 4, name: '지병약', src: chronicDisease, type: 3 },
    { id: 5, name: '비상약', src: householdMedicine, type: 3 },
    { id: 6, name: '의류', src: clothes, type: 4 },
    { id: 7, name: '속옷', src: underwear, type: 4 },
    { id: 8, name: '신발', src: shoes, type: 4 },
    { id: 9, name: '화장지', src: paperTowel, type: 4 },
    { id: 10, name: '물티슈', src: wetTissue, type: 4 },
    { id: 11, name: '비닐봉투', src: plasticBag, type: 4 },
    { id: 12, name: '라이터', src: lighter, type: 4 },
    { id: 13, name: '배터리', src: battery, type: 4 },
    { id: 14, name: '손전등', src: flashlight, type: 4 },
  ];

  const handleBtnClick = (buttonIndex) => {
    setListBtn(buttonIndex);
  };
  return (
    <>
      <AllBtnWrapper>
        <AllBtn>
          {emergencyData.map((data) => (
            <EmergencyBtn
              key={data.id}
              className={listBtn === data.id ? 'active' : ''}
              onClick={() => handleBtnClick(data.id)}
            >
              {data.name}
            </EmergencyBtn>
          ))}
        </AllBtn>
      </AllBtnWrapper>
      <MainListWrapper>
        <MainList>
          {listBtn !== 5 ? (
            itemListData.map((data) => {
              if (listBtn === 1 || listBtn === data.type) {
                return (
                  <Button type={data.type} key={data.id}>
                    <div>
                      <img src={data.src} alt={data.name} />
                    </div>
                    <span>{data.name}</span>
                  </Button>
                );
              }
              return null;
            })
          ) : (
            <Empty>해당하는 용품이 없습니다.</Empty>
          )}
        </MainList>
      </MainListWrapper>
    </>
  );
}

const MainList = styled.article`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 100px);
  align-items: baseline;
  padding-bottom: 60px;
  background-color: rgb(255, 255, 255);
`;

const AllBtnWrapper = styled.div`
  background-color: #fff;
  overflow-x: scroll;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    /* 크롬, 사파리, 오페라, 엣지 */
    display: none;
  }
`;

const AllBtn = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0 10px;
  margin-bottom: 30px;
  text-align: center;
`;

const EmergencyBtn = styled.button`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.customBlack};
  border-radius: 100px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: 100%;
  flex-shrink: 0;

  &.active {
    color: #fff;
    background: ${(props) => props.theme.colors.customBlack};
  }
`;

const Button = styled.button`
  cursor: unset;
  text-align: center;
  div {
    width: 32px;
    height: 32px;
    margin: 10px auto 19px;
  }

  img {
    height: 100%;
    object-fit: contain;
  }

  span {
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSize.sm};
    line-height: 100%;
  }
`;

const Empty = styled.p`
  width: 375px;
  height: 75px;
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: 600;
  align-items: center;
`;

const MainListWrapper = styled.div`
  height: 300px;
  overflow: scroll;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    /* 크롬, 사파리, 오페라, 엣지 */
    display: none;
  }
`;
