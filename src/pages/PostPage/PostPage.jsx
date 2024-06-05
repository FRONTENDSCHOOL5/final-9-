import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// img import
import commentIcon from '../../assets/icons/PostPage/comment-icon.png';
import likeIcon from '../../assets/icons/PostPage/like-icon.png';
import addPostImg from '../../assets/images/Postpage/addPost.png';
import likeActiveIcon from '../../assets/icons/PostPage/like-active-icon.png';

import { PostHeader, AddPostBtn } from './PostPageStyle';
import TopBar from '../../components/common/TopBar/TopBar';
import BottomNavBar from '../../components/common/BottomNavBar/BottomNavBar';
import { UserContext } from '../../context/UserContext';
import styled from 'styled-components';

const PostPage = () => {
  const [postsData, setPostsData] = useState([]);
  const [likeClicked, setLikeClicked] = useState(false);
  const [activePostFilter, setActivePostFilter] = useState(0);
  //const [postType, setPostType] = useState('/post/feed/?limit=999&skip=0');
  const [postType, setPostType] = useState('following');

  const postFilterArr = ['이웃들의 글', '나의 글'];
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const getUserInfo = async () => {
    await updateUser(JSON.parse(localStorage.getItem('user')));
  };
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  const addPostNavi = () => {
    navigate('/post/add-post');
  };

  const postTypeHandler = (index) => {
    /* if (index === 0) {
      setPostType('/post/feed');
    } else if (index === 1) {
      setPostType(`/post/${user.accountname}/userpost`);
    } */
    if (index === 0) {
      setPostType('following');
    } else if (index === 1) {
      setPostType(`${user.accountname}`);
    }
  };

  const getPosts = /* async */ () => {
    try {
      /* const response = await fetch(url + postType, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPostsData(data.posts ? data.posts : data.post);
      } else {
        console.error('Error signing up:', response.status);
      } */

      const response = user.following;
      // eslint-disable-next-line no-undef
      const USERS_API = JSON.parse(process.env.REACT_APP_USERS_API);
      // eslint-disable-next-line no-undef
      const POSTS_API = JSON.parse(process.env.REACT_APP_POSTS_API);
      if (postType === 'following') {
        const followingData = response.map((el) => {
          return USERS_API.filter((user) => user._id === el)[0];
        });
        const postData = followingData.map((el) => {
          return POSTS_API.filter((post) => post.author._id === el._id)[0];
        });
        const data = postData.filter((el) => el);
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostsData(data);
      } else {
        const data = POSTS_API.filter((post) => post.author._id === user._id);
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostsData(data);
      }
    } catch (error) {
      //console.error('로그인 실패:', error);
    }
  };

  const postLike = /* async */ (postId) => {
    try {
      /* const response = await fetch(url + `/post/${postId}/heart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // const data = await response.json();
        setLikeClicked((prev) => !prev);
      } else {
        console.error('Error signing up:', response.status);
      } */
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const unlike = /* async */ (postId) => {
    try {
      /* const response = await fetch(url + `/post/${postId}/unheart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // const data = await response.json();
        setLikeClicked((prev) => !prev);
      } else {
        console.error('Error signing up:', response.status);
      } */
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getPosts();
    }
    // eslint-disable-next-line
  }, [user, likeClicked, activePostFilter, postType]);

  const goToPostDetail = (postId) => {
    navigate(`/post/detail/${postId}`);
  };

  const goToUserDetail = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <h1 className='a11y-hidden'>게시판</h1>
      <PostHeader>
        <TopBar iconColor={'#191919'} />
        <div>
          <h2>
            {user?.username}님!
            <br />
            오늘은 어떤 일이 있었나요?
          </h2>
        </div>
      </PostHeader>
      <PostNav>
        <ul>
          {postFilterArr.map((el, index) => {
            return (
              <li
                key={index}
                className={activePostFilter === index ? 'active' : ''}
                onClick={() => {
                  setActivePostFilter(index);
                  postTypeHandler(index);
                }}
              >
                {el}
              </li>
            );
          })}
          <AddPostBtn onClick={addPostNavi}>
            <img src={addPostImg} alt='새 글 작성' />
          </AddPostBtn>
        </ul>
      </PostNav>
      <PostsWrapper>
        <ul>
          {postsData && postsData.length !== 0 ? (
            postsData?.map((el, index) => {
              const date = new Date(el.createdAt);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const created = `${year}.${month}.${day}.`;
              return (
                <li key={index}>
                  <PostContainer>
                    <PostFirstRow
                      onClick={(e) => {
                        if (e.target.id !== 'posting-user-info') {
                          goToPostDetail(el.id);
                        }
                      }}
                    >
                      <div>
                        <PostUserInfoWrapper
                          id='posting-user-info'
                          onClick={() => {
                            goToUserDetail(el.author.accountname);
                          }}
                        >
                          <img src={el.author.image} alt='작성자 프로필 사진' />
                          <span>{el.author.username}</span>
                        </PostUserInfoWrapper>
                        <span>{created}</span>
                      </div>
                      <p>{el.content}</p>
                      {el.image && el.image.split(',').length < 2 && (
                        <FeedImage>
                          <img src={el.image} alt='게시글 이미지' />
                        </FeedImage>
                      )}
                      {el.image && el.image.split(',').length > 1 && (
                        <MultiImageContainer>
                          {el.image.split(',').map((imgEl, index) => {
                            return (
                              <li key={index}>
                                <div>
                                  <img src={imgEl} alt='게시글 이미지' />
                                </div>
                              </li>
                            );
                          })}
                        </MultiImageContainer>
                      )}
                    </PostFirstRow>
                    <PostSecondRow
                      onClick={(e) => {
                        if (e.target.id !== 'correct-btn') {
                          goToPostDetail(el.id);
                        }
                      }}
                    >
                      <div
                        id='correct-btn'
                        onClick={() => {
                          if (el.hearted) {
                            unlike(el.id);
                          } else {
                            postLike(el.id);
                          }
                        }}
                      >
                        <PostsSocialBtn>
                          <img src={el.hearted ? likeActiveIcon : likeIcon} alt='좋아요버튼' />
                        </PostsSocialBtn>
                        <span>정확해요</span>
                        <span>{el.heartCount}</span>
                      </div>
                      <div>
                        <PostsSocialBtn>
                          <img src={commentIcon} alt='댓글버튼' />
                        </PostsSocialBtn>
                        <span>댓글</span>
                        <span>{el.commentCount ? el.commentCount : 0}</span>
                      </div>
                    </PostSecondRow>
                  </PostContainer>
                </li>
              );
            })
          ) : (
            <EmptyPostContainer>
              <p>작성된 게시글이 없습니다.</p>
            </EmptyPostContainer>
          )}
        </ul>
      </PostsWrapper>
      <BottomNavBar />
    </>
  );
};

export default PostPage;

const MultiImageContainer = styled.ul`
  display: flex;
  align-self: center;
  color: #000;
  gap: 15px;
  width: 85%;
  overflow-x: scroll;
  margin-bottom: 25px;
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
    width: 200px;
    cursor: pointer;
    div {
      width: 100%;
      img {
        border: 1px solid #eee;
        aspect-ratio: 1;
        object-fit: cover;
      }
    }
  }
`;

const ModalMenu = styled.div`
  width: 100px;
  position: absolute;
  right: 7px;
  top: 14px;
  z-index: 49;
  cursor: pointer;
`;
const ModalIconWrapper = styled.div`
  width: 16px;
  position: absolute;
  right: 7px;
  top: 14px;
  z-index: 49;
  cursor: pointer;
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
  }
`;

const PostUserInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0;
  img {
    width: 40px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 100%;
    pointer-events: none;
  }
  span {
    pointer-events: none;
  }
`;

const EmptyPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid rgb(221, 221, 221);
`;

const PostsWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 290px);
  overflow-y: scroll;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    /* 크롬, 사파리, 오페라, 엣지 */
    display: none;
  }
  position: relative;
  li {
    cursor: pointer;
  }
`;

const PostNav = styled.nav`
  width: 100%;
  margin: 10px 0;
  ul {
    display: flex;
    justify-content: center;
    gap: 20px;
    position: relative;
    li {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
      &.active {
        color: white;
        background-color: black;
        border-radius: 10px;
      }
    }
  }
`;

const FeedImage = styled.div`
  width: 200px;
  overflow: hidden;
  align-self: center;

  img {
    margin-bottom: 25px;
    display: block;
    width: 100%;

    aspect-ratio: 60/60;
    object-fit: cover;
  }
`;

const PostFirstRow = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 35px 20px 10px;
    span:nth-child(1) {
      font-size: 14px;
      color: #aaa;
      font-weight: bold;
      border-radius: 10px;
      padding: 4px 6px;
      background-color: #f6f6f6;
    }
    span:nth-child(2) {
      font-size: 14px;
      color: #999;
    }
  }
  & > span {
    font-size: 12px;
    color: #aaa;
  }
  p {
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 1.5;
    padding: 0 20px 10px;
  }
`;

const PostSecondRow = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 20px 15px;
  border-top: 1px solid #ccc;
  border-bottom: 10px solid #ccc;
  & > div {
    display: flex;
    font-size: 14px;
    gap: 5px;
    align-items: center;
    cursor: pointer;
  }

  & > #correct-btn span {
    pointer-events: none;
  }
`;

const PostContainer = styled.div`
  width: 100%;
`;

const PostPageHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 50px;
  align-items: center;

  img {
    border-radius: 100%;
  }
`;

const PostsSocialBtn = styled.div`
  width: 18px;
  overflow: hidden;
  pointer-events: none;

  img {
    display: block;
    width: 100%;

    aspect-ratio: 60/60;
    object-fit: cover;
  }
`;
