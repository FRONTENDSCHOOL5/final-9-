import styled from 'styled-components';

export const MainHeader = styled.section`
  width: 100%;
  height: 200px;
  padding: 20px 20px 35px;
  background-color: #191919;
  position: relative;
  div.main-user-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    div.main-text-info {
      flex-direction: column;
      p.main-text {
        font-size: 24px;
        font-weight: 600;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #fff;
        margin-bottom: 20px;
      }
      p.user-info {
        font-size: 12px;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #fff;
        opacity: 0.75;
      }
    }
    img {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      //border-radius: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
`;

export const SlideUI = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 0 20px;
  overflow-x: scroll;

  position: relative;
  bottom: 40px;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    /* 크롬, 사파리, 오페라, 엣지 */
    display: none;
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 15px;
    flex-shrink: 0;
  }
`;
export const SlideItem = styled.li`
  width: ${(props) => props.w}px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
  font-weight: 800;
  flex-basis: 1;
  flex-shrink: 0;
  padding: 15px 35px 20px 15px;

  span {
    font-size: 12px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.6);
  }
  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: white;
    margin-top: 15px;
  }
`;

export const MainSponsor = styled.section`
  background-color: #fff;
  width: 100%;
  padding: 0 20px;
  margin-top: 25px;
  margin-bottom: 50px;
  article {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191919;
    padding: 20px 15px;
    color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    margin: 30px 0 20px 0;
    span:first-child {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    span:last-child {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
  }
`;
export const MainVolunteer = styled.section`
  width: 100%;
  background-color: #fff;
  margin-top: 45px;
`;
export const MainFollow = styled.section`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 50px;
  background: #fff;
`;
export const MainFollowList = styled.ul`
  display: flex;
  color: #000;
  gap: 30px;
  width: 100%;
  overflow-x: scroll;
  margin-top: 15px;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    /* 크롬, 사파리, 오페라, 엣지 */
    display: none;
  }
  li {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    -webkit-box-align: center;
    align-items: center;
    width: 64px;
    cursor: pointer;
    div {
      width: 100%;
      img {
        border: 1px solid #eee;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }

    span {
      font-size: 10px;
      display: block;
      width: 80px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
