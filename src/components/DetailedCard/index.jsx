import './styles.css'
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import {useState} from "react";
import cn from 'classnames';
import {nanoid} from "nanoid";
import PhotoModal from "../PhotoModal";
import TextArea from "../TextArea";
import ImageWithLoader from "../ImageWithLoader";

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
    const [isModalVisible, setIsModalVisible] = useState(false)

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

    const onCloseModal = () => {
        setComment('')
        setIsModalVisible(false);
    };

    const onOpenModal = () => {
        setComment('')
        setIsModalVisible(true);
    }

    return(
        <div className={cn ("cnDetailedCardRoot", className)}>
            <div className="cnDetailedCardHeader">
                <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId}/>
            </div>
            <div className='cnDetailedCardImgWrapper'>
                <ImageWithLoader className="cnDetailedCardImg" src={imgUrl} alt="img" />
            </div>
            <div className="cnDetailedCardButtons">
                <i onClick={()=>onLikeClick(id)} className={`${isLikedYourself ? 'fas' : 'far'} fa-heart cnDetailedCardLikeIcon`}/>
                <i className= "far fa-comment cnDetailedCardLikeComment" onClick={onOpenModal}/>
            </div>
            <div className="cnDetailedCardLikes ">
                {`Оценили ${likes} человек`}
            </div>
            <div className="cnDetailedCardComments">
                {renderComments()}
            </div>
            <TextArea
                value={comment}
                onChange={setComment}
                placeholder='Введите комментарий'
                isLoading={mutateLoading}
                onSubmit={handleSendCommentClick}
                buttonText="Отправить"
            />
            <PhotoModal
                comments={comments}
                isOpen={isModalVisible}
                onClose={onCloseModal}
                userName={userName}
                avatarUrl={avatarUrl}
                userId={userId}
                commentValue={comment}
                setCommentValue={setComment}
                onCommentSubmit = {handleSendCommentClick}
                isCommentLoading={mutateLoading}
                imgUrl={imgUrl}
                isLikedByYou={isLikedYourself}
                onLikeClick={()=> onLikeClick(id)}
            />
        </div>
    )
}
export default DetailedCard;