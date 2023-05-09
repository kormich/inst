import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import './styles.css'
import UserBio from "../../components/UserBio";
import Card from "../../components/Card";
import {toggleLike} from "../../redux/actions/photos";

const UserPage = () => {
    const authorizedUser =useSelector(state => state.users.authorizedUser)
    const dispatch = useDispatch()
    const onLikeClick = (photoId)=>{
        dispatch(toggleLike(authorizedUser.id, photoId))
    }
    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            <div className="cnUserPageRoot">
                <UserBio
                    avatarUrl={authorizedUser.avatarUrl}
                    nickname={authorizedUser.nickname}
                    subscribed={authorizedUser.subscribed.length}
                    subscribers={authorizedUser.subscribers.length}
                    firstName={authorizedUser.firstName}
                    lastName={authorizedUser.lastName}
                    description={authorizedUser.description}
                    url={authorizedUser.url}
                />
                <div className="cnUserPageRootContent">
                    <Card imgUrl="" className="cnUserPageCard" likes={10} comments={10} isLikedByYou={true} onLikeClick={() => onLikeClick('')}/>
                    <Card imgUrl="" className="cnUserPageCard" likes={10} comments={10}/>
                    <Card imgUrl="" className="cnUserPageCard" likes={10} comments={10}/>
                </div>
            </div>
        </Layout>
    )
}
export  default UserPage;