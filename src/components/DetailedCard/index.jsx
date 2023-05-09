import './styles.css'
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import {useState} from "react";
import cn from 'classnames';
import {nanoid} from "nanoid";
import Button from "../Button";

const DetailedCard =({
    userName,
    avatarUrl,
    userId,
    imgUrl,
    likes,
    isLikedYourself,
    comments,
    className,
    onLikeClick,
    id,
    onCommentSendClick,
    mutateLoading
                     }) =>{
    const [isCommentsShow, setIsCommentsShow] = useState(false)
    const [comment, setComment] = useState('')
    const handleSendCommentClick = () =>{
        if(comment){
            onCommentSendClick(id, comment)
            setComment('')
        }
    }

    const renderComments = () =>{
        if (comments.length >2 && !isCommentsShow){
            const commentsCopy = [...comments]
            const commentsForRender= commentsCopy.splice(comments.length-2,2)
            return (
                <>
                    <span className="cnDetailedCardComTitle" onClick={()=> setIsCommentsShow(true)}>{`Показать еще ${comments.length-commentsForRender.length} комментариев...`}</span>
                    {commentsForRender.map((comment) => <Comment {...comment} key={nanoid()}/>)}
                </>
            )
        }
        return comments.map((comment) => <Comment {...comment} key={nanoid()}/>)
    }
    return(
        <div className={cn ("cnDetailedCardRoot", className)}>
            <div className="cnDetailedCardHeader">
                <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId}/>
            </div>
            <div>
                <img src={imgUrl} alt="img" className="cnDetailedCardImg"/>
            </div>
            <div className="cnDetailedCardButtons">
                <i onClick={()=>onLikeClick(id)} className={`${isLikedYourself ? 'fas' : 'far'} fa-heart cnDetailedCardButtonsLike`}/>
                <i className= "far fa-comment cnDetailedCardButtonsComment"/>
            </div>
            <div className="cnDetailedCardLikes ">
                {`Оценили ${likes} человек`}
            </div>
            <div className="cnDetailedCardComments">
                {renderComments()}
            </div>
            <div className='cnDetailedCardTextAreaWrapper'>
                <textarea value={comment} onChange={e =>setComment(e.target.value)} placeholder='Введите комментарий' className='cnDetailedCardTextArea'/>
                <Button disabled={mutateLoading} className='cnDetailedCardSendButton' onClick={handleSendCommentClick}>Отправить</Button>
            </div>
        </div>
    )
}
export default DetailedCard;