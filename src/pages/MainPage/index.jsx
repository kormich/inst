import Layout from "../../components/Layout";
import DetailedCard from "../../components/DetailedCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPhotos, sendComment, toggleLike} from "../../redux/actions/photos";
import InfiniteScroll from "react-infinite-scroll-component";
import './styles.css'
import {Bars} from "react-loader-spinner";

const MainPage = () => {
    const photos = useSelector(state =>state.photos.photos)
    const loading = useSelector(state =>state.photos.isPhotoLoading)
    const authorizedUser =useSelector(state => state.users.authorizedUser)
    const total = useSelector(state =>state.photos.totalPhotos)
    const mutateLoading = useSelector(state =>state.photos.isMutateLoading)
    const dispatch = useDispatch()

    const[page, setPage] = useState(1);
    useEffect(() => {dispatch(getPhotos(page))}, [page]);
    const nextHandler =() =>{
        setPage(page+1)
    }
    const onLikeClick =(photoId) =>{
        dispatch(toggleLike(authorizedUser.id, photoId))
    }
    const onCommentSendClick = (photoId, comment) =>{
        dispatch(sendComment(authorizedUser.nickname, photoId, comment))
    }

    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            <div className = "cnMainPageRoot">
                <InfiniteScroll
                    dataLength={photos.length}
                    next = {nextHandler}
                    hasMore={photos.length < total}
                    loader = {<div className="cnMainLoaderContainer">
                        <Bars color="#33CCCC" height={15} width={15}/>
                    </div>}
                    endMessage={<p className="cnMainLoaderContainer"> Thats all</p>}
                >
                    { photos.map(({author, imgUrl, id, likes, comments}) =>(
                        <DetailedCard
                            key ={id}
                            id ={id}
                            userName={author.nickname}
                            userId={author.id}
                            avatarUrl={author.avatarUrl}
                            imgUrl={imgUrl}
                            likes={likes.length}
                            isLikedYourself={likes.includes(authorizedUser.id)}
                            comments={comments}
                            className ="cnMainPageCard"
                            onLikeClick={onLikeClick}
                            onCommentSendClick={onCommentSendClick}
                            mutateLoading={mutateLoading}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </Layout>
    )
}
export  default MainPage;