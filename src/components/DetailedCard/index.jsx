import './styles.css'
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import {useState} from "react";

const DetailedCard =({
    userName,
    avatarUrl,
    userId,
    imgUrl,
    likes,
    isLikedYourself,
    comments
                     }) =>{
    const [isCommentsShow, setIsCommentsShow] = useState(false)

    const renderComments = () =>{
        if (comments.length >2 && !isCommentsShow){
            const commentsCopy = [...comments]
            const commentsForRender= commentsCopy.splice(comments.length-2,2)
            return (
                <>
                    <span className="cnDetailedCardComTitle" onClick={()=> setIsCommentsShow(true)}>{`Показать еще ${comments.length-commentsForRender.length} комментариев...`}</span>
                    {commentsForRender.map((comment) => <Comment {...comment}/>)}
                </>
            )
        }
        return comments.map((comment) => <Comment {...comment}/>)
    }
    return(
        <div className="cnDetailedCardRoot">
            <div className="cnDetailedCardHeader">
                <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId}/>
            </div>
            <div>
                <img src={imgUrl} alt="img" className="cnDetailedCardImg"/>
            </div>
            <div className="cnDetailedCardButtons">
                <i className={`${isLikedYourself ? 'fas' : 'far'} fa-heart cnDetailedCardButtonsLike`}/>
                <i className= "far fa-comment cnDetailedCardButtonsComment"/>
            </div>
            <div className="cnDetailedCardLikes ">
                {`Оценили ${likes} человек`}
            </div>
            <div className="cnDetailedCardComments">
                {renderComments()}
            </div>
            <textarea className="cnDetailedCardTextArea"/>
        </div>
    )
}
export default DetailedCard;