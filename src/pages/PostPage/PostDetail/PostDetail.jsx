import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import commentIcon from '../../../assets/icons/PostPage/comment-icon.png';
import likeIcon from '../../../assets/icons/PostPage/like-icon.png';
import likeActiveIcon from '../../../assets/icons/PostPage/like-active-icon.png';
import modalIcon from '../../../assets/icons/PostPage/modal-icon.png';
import addIcon from '../../../assets/images/Postpage/addPost.png';

import backIcon from '../../../assets/icons/common/back.png';
import { UserContext } from '../../../context/UserContext';
import styled from 'styled-components';

const PostPage = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [commentContent, setCommentContent] = useState();
  const [commentIndex, setCommentIndex] = useState();
  const modalBtnRef = useRef();
  const commentModalBtnRef = useRef();
  const [likeClicked, setLikeClicked] = useState(false);
  const [postId, setPostId] = useState();
  const navigate = useNavigate();
  const { user, updateUser, refresh, updateRefresh } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState();
  const [targetedCommentId, setTargetedCommentId] = useState('');

  const getUserInfo = async () => {
    await updateUser(JSON.parse(localStorage.getItem('user')));
  };

  useEffect(() => {
    setPostId(params.postId);
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  const goToUserDetail = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const params = useParams();
  const getPosts = /* async */ () => {
    try {
      /* const response = await fetch(url + `/post/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPostsData(data.post);
      } else {
        console.error('Error signing up:', response.status);
      } */
      // eslint-disable-next-line no-undef
      const POSTS_API = JSON.parse(process.env.REACT_APP_POSTS_API);
      const data = POSTS_API.filter((post) => post.id === params.postId)[0];
      setPostsData(data);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const getComments = /* async */ () => {
    try {
      /* const response = await fetch(url + `/post/${postId}/comments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCommentsData(data.comments);
      } else {
        console.error('Error signing up:', response.status);
      } */

      // eslint-disable-next-line no-undef
      const COMMENTS = JSON.parse(process.env.REACT_APP_COMMENTS_API);
      const postData = COMMENTS.filter((commentObj) => commentObj.postId === params.postId)[0];
      const data = postData.comments;
      setCommentsData(data);
    } catch (error) {
      //console.error('댓글이 없습니다:', error);
    }
  };

  const addCommentBtnHandler = /* async */ (e) => {
    e.preventDefault();
    const commentData = {
      comment: {
        content: commentContent,
      },
    };
    try {
      /* const response = await fetch(url + `/post/${postId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (response.ok) {
        // const data = await response.json();
        updateRefresh();
      } else {
        console.error('Error:', response.status);
      } */
    } catch (error) {
      console.error('실패:', error);
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
      getComments();
    }
    // eslint-disable-next-line
  }, [user, likeClicked, postId, refresh]);

  const backToPage = () => {
    navigate(-1);
  };

  const postReport = /* async */ () => {
    try {
      /*  const response = await fetch(url + `/post/${postId}/report`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // const data = await response.json();
      } else {
        console.error('Error:', response.status);
      } */
    } catch (error) {
      console.error('실패:', error);
    }
  };

  function getTimeDifference(createAt) {
    const currentTime = new Date(); // 현재 Date 객체
    const postTime = new Date(createAt); // 게시글의 createAt
    const timeDifference = currentTime - postTime; // 밀리초 단위의 차이 계산

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 4) {
      return `${days}일 전`;
    } else {
      const date = new Date(createAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}.`;
    }
  }

  const deletePostHandler = /* async */ () => {
    try {
      /* const response = await fetch(url + `/post/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // const data = await response.json();
        navigate(-1);
      } else {
        console.error('Error:', response.status);
      } */
    } catch (error) {
      console.error('실패:', error);
    }
  };

  const deleteCommentHandler = /* async */ () => {
    try {
      /* const response = await fetch(url + `/post/${postId}/comments/${targetedCommentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // const data = await response.json();
        setCommentIndex(null);
        updateRefresh();
      } else {
        console.error('Error:', response.status);
      } */
    } catch (error) {
      console.error('실패:', error);
    }
  };

  const commentModalHandler = (index) => {
    setCommentIndex(index);
  };

  return (
    <>
      <PostDetailPageHeader
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <img src={backIcon} alt='뒤로가기버튼' onClick={backToPage} />
        <span>게시글 상세</span>
      </PostDetailPageHeader>

      <PostsWrapper
        onClick={(e) => {
          if (e.target !== modalBtnRef.current) {
            setIsModalOpen(false);
          }
        }}
      >
        <ul>
          {postsData && (
            <li>
              <PostContainer>
                <PostFirstRow>
                  <div>
                    <PostUserInfoWrapper
                      onClick={() => {
                        goToUserDetail(postsData?.author.accountname);
                      }}
                    >
                      <img src={postsData?.author?.image} alt='작성자 프로필 사진' />
                      <span>{postsData?.author?.username}</span>
                    </PostUserInfoWrapper>
                    <span>{postsData?.createdAt && getTimeDifference(postsData?.createdAt)}</span>
                  </div>
                  <ModalIconWrapper
                    onClick={(e) => {
                      setIsModalOpen(true);
                    }}
                    ref={modalBtnRef}
                  >
                    <img src={modalIcon} alt='더보기버튼' />
                  </ModalIconWrapper>
                  {isModalOpen && (
                    <ModalMenu onClick={() => setIsModalOpen((prev) => !prev)}>
                      {user.accountname === postsData.author.accountname ? (
                        <>
                          <li onClick={() => navigate(`update-post`)}>수정하기</li>
                          <li
                            onClick={() => {
                              setDeleteType('post');
                              setDeleteModalOpen((prev) => !prev);
                            }}
                          >
                            삭제하기
                          </li>
                        </>
                      ) : (
                        <li onClick={postReport}>신고하기</li>
                      )}
                    </ModalMenu>
                  )}
                  <p>{postsData?.content}</p>
                  {postsData?.image && postsData?.image.split(',').length < 2 && (
                    <FeedImage>
                      <img src={postsData?.image} alt='게시글 이미지' />
                    </FeedImage>
                  )}
                  {postsData?.image && postsData?.image.split(',').length > 1 && (
                    <MultiImageContainer>
                      {postsData?.image.split(',').map((imgEl, index) => {
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
                <PostSecondRow>
                  <div
                    onClick={() => {
                      if (postsData?.hearted) {
                        unlike(postsData?.id);
                      } else {
                        postLike(postsData?.id);
                      }
                    }}
                    disabled={true}
                  >
                    <PostsSocialBtn>
                      <img src={postsData?.hearted ? likeActiveIcon : likeIcon} alt='좋아요버튼' />
                    </PostsSocialBtn>
                    <span>정확해요</span>
                    <span>{postsData?.heartCount}</span>
                  </div>
                  <div>
                    <PostsSocialBtn>
                      <img src={commentIcon} alt='댓글버튼' />
                    </PostsSocialBtn>
                    <span>댓글</span>
                    <span>{postsData?.commentCount ? postsData?.commentCount : 0}</span>
                  </div>
                </PostSecondRow>
              </PostContainer>
            </li>
          )}
        </ul>
      </PostsWrapper>
      <AddCommentContainer>
        <form onSubmit={addCommentBtnHandler}>
          <input
            type='text'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button type='submit'>
            <img src={addIcon} />
          </button>
        </form>
      </AddCommentContainer>
      {commentsData?.length !== 0 &&
        commentsData?.map((el, index) => {
          return (
            <PostComment
              key={index}
              onClick={(e) => {
                if (commentModalBtnRef.current && !commentModalBtnRef.current.contains(e.target)) {
                  setCommentIndex(null);
                }
              }}
            >
              <div>
                <PostCommentWrapper
                  onClick={() => {
                    goToUserDetail(el?.author.accountname);
                  }}
                >
                  <img src={el.author?.image} alt='작성자 프로필 사진' />
                  <span>{el.author?.username}</span>
                  {el.author?.accountname === postsData?.author?.accountname && <span>작성자</span>}
                </PostCommentWrapper>
              </div>
              <ModalIconWrapper
                onClick={() => {
                  commentModalHandler(index);
                }}
              >
                <img src={modalIcon} alt='더보기버튼' />
              </ModalIconWrapper>
              {commentIndex === index && (
                <ModalMenu ref={commentModalBtnRef}>
                  {user.accountname === el.author?.accountname ? (
                    <>
                      <li
                        onClick={() => {
                          setDeleteType('comment');
                          setTargetedCommentId(el.id);
                          setDeleteModalOpen((prev) => !prev);
                        }}
                      >
                        삭제하기
                      </li>
                    </>
                  ) : (
                    <li onClick={postReport}>신고하기</li>
                  )}
                </ModalMenu>
              )}
              <p>{el.content}</p>
              <CommentCreatedAt>{getTimeDifference(el.createdAt)}</CommentCreatedAt>
            </PostComment>
          );
        })}
      {deleteModalOpen && (
        <DeleteModalContainer onClick={() => setDeleteModalOpen((prev) => !prev)}>
          <DeleteModalContent>
            <span>정말 삭제하시겠습니까?</span>
            <DeleteModalConfirm>
              <span
                onClick={() => {
                  deleteType === 'post' ? deletePostHandler() : deleteCommentHandler();
                }}
              >
                삭제
              </span>
              <span>취소</span>
            </DeleteModalConfirm>
          </DeleteModalContent>
        </DeleteModalContainer>
      )}
    </>
  );
};

export default PostPage;

const DeleteModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DeleteModalContent = styled.div`
  position: relative;
  background-color: white;
  width: 255px;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  & > span {
    padding: 20px 30px;
  }
`;

const DeleteModalConfirm = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #ccc;
  & span {
    display: block;
    width: 50%;
    padding: 18px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: normal;
  }

  & span:hover {
    font-weight: bold;
  }

  & span:nth-child(1) {
    border-right: 1px solid #ccc;
  }
`;

const MultiImageContainer = styled.ul`
  display: flex;
  color: #000;
  gap: 15px;
  width: 100%;
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

const AddCommentContainer = styled.div`
  width: 100%;
  padding: 0 5px;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    position: relative;
    margin-bottom: 5px;

    box-shadow: 0 5px 7px 0 #ddd;
    input {
      display: block;
      width: 100%;
      border-radius: 5px;
      padding: 12px 40px;
      border: 1px solid #aaa;
    }
    button {
      position: absolute;
      right: 16px;
      width: 25px;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
`;

const CommentCreatedAt = styled.span`
  align-self: flex-end;
  padding-right: 20px;
`;

const PostComment = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 20px;
  border-bottom: 3px solid #eee;

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

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
    font-size: 14px;
    padding: 0 20px 10px;
  }
`;

const PostCommentWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0;
  cursor: pointer;
  img {
    width: 30px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 100%;
  }
  & > span:nth-child(3) {
    color: #aaa;
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const PostDetailPageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 16px;
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);

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

const ModalMenu = styled.ul`
  width: 120px;
  position: absolute;
  right: 7px;
  top: 14px;
  z-index: 49;
  cursor: pointer;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    display: flex;
    width: 100%;
    height: 42px;
    justify-content: center;
    align-items: center;
  }

  li:nth-child(2) {
    border-top: 1px solid #aaa;
  }
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
    pointer-events: none;
  }
`;

const PostUserInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0;
  cursor: pointer;

  img {
    width: 40px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const PostsWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    /* 크롬, 사파리, 오페라, 엣지 */
    display: none;
  }
  position: relative;
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

  & > div {
    display: flex;
    font-size: 14px;
    gap: 5px;
    align-items: center;
    cursor: pointer;
  }
`;

const PostContainer = styled.div`
  width: 100%;
`;

const PostsSocialBtn = styled.div`
  width: 18px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;

    aspect-ratio: 60/60;
    object-fit: cover;
  }
`;
