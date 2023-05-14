import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import './styles.css'
import UserBio from "../../components/UserBio";
import Card from "../../components/Card";
import {getPostsByUser, sendCommentOnUserPage, toggleLikeOnPost} from "../../redux/actions/postsByUser";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Bars} from "react-loader-spinner";
import {getUser,mutateUser} from "../../redux/actions/users";

const UserPage = () => {
    const authorizedUser =useSelector(state => state.users.authorizedUser)
    const user = useSelector(state => state.users.user);
    const posts = useSelector(state => state.postsByUser.posts);
    const isPostsError = useSelector(state => state.postsByUser.isPostsError);
    const isPostsLoading = useSelector(state => state.postsByUser.isPostsLoading);
    const isUserLoading = useSelector(state => state.users.isUserLoading);
    const isUserError = useSelector(state => state.users.isUserError);
    const isUserMutateLoading = useSelector(state => state.users.isMutateLoading);
    const mutateLoading = useSelector(state =>state.photos.isMutateLoading)
    const dispatch = useDispatch()
    const { id } = useParams();
    const [postsForRender, setPostsForRender] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const newPost = [...posts];
        if (newPost.length) {
            setPostsForRender(newPost.splice(0, 12));
        }
    }, [posts]);

    useEffect(() => {
        dispatch(getPostsByUser(id))
        dispatch(getUser(id))
    }, [id, dispatch]);

    const onLikeClick = (photoId)=>{
        dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id))
    }

    const onCommentSendClick = (photoId, comment) =>{
        dispatch(sendCommentOnUserPage(authorizedUser.nickname, photoId, user.id, comment))
    }

    const nextHandler = () => {
        const newPosts = [...posts];
        const offset = 12 * (page + 1);

        setPostsForRender([...postsForRender, ...newPosts.splice(offset, offset + 12)]);
        setPage(page + 1);
    };

    const onEdit = async (data) => {
        await dispatch(mutateUser(data, user.id));
    };

    const onChangeSubscribers = (isSubscribe) => {
        const subscribers = user.subscribers;
        if (isSubscribe) {
            const newSubscribers = subscribers.filter((subscriber) => subscriber !== authorizedUser.id);
            dispatch(mutateUser({
                ...user,
                subscribers: newSubscribers
            }, user.id));
        } else {
            subscribers.push(authorizedUser.id);
            dispatch(mutateUser({
                ...user,
                subscribers
            }, user.id));
        }
    };

    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            {isPostsLoading || isUserLoading ? <div className="cnMainLoaderContainer">
                <Bars color="#000BFF" height={80} width={80} />
            </div> : <div className="cnUserPageRoot">
                {!isUserError && <UserBio
                    avatarUrl={user.avatarUrl}
                    nickname={user.nickname}
                    postsCount={posts.length}
                    subscribed={user.subscribed.length}
                    subscribers={user.subscribers.length}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    description={user.description}
                    url={user.url}
                    isMyPage={id == authorizedUser.id}
                    isSubscribed={user.subscribers.includes(authorizedUser.id)}
                    onEdit={onEdit}
                    onChangeSubscribers={onChangeSubscribers}
                    fromLoading={isUserMutateLoading}
                />}
                <div className="cnUserPageRootContent">
                    {postsForRender.length ? <InfiniteScroll
                        dataLength={postsForRender.length}
                        next={nextHandler}
                        hasMore={postsForRender.length < posts.length}
                        loader={<div className="cnMainLoaderContainer">
                            <Bars color="#000BFF" height={15} width={15} />
                        </div>}
                        className="cnUserPageScrool"
                    >
                        {postsForRender.map(({ comments, likes, imgUrl, id })=>
                            <Card
                                key={id}
                                imgUrl={imgUrl}
                                className="cnUserPageCard"
                                likes={likes.length}
                                comments={comments}
                                isLikedByYou={likes.includes(authorizedUser.id)}
                                onLikeClick={() => onLikeClick(id)}
                                userData={{
                                    userName:user.nickname,
                                    avatarUrl:user.avatarUrl,
                                    userId:user.id
                                }}
                                onCommentSubmit={(comment) => onCommentSendClick(id, comment)}
                                isMutateLoading={mutateLoading}
                            />)}
                    </InfiniteScroll>  : !isPostsError && <p className="cnUserPageNoPosts">User dont have posts!</p>}
                </div>
            </div>}
        </Layout>
    )
}
export  default UserPage;