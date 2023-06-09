import './styles.css'
import cn from "classnames";
import PhotoModal from "../PhotoModal";
import {useState} from "react";
import ImageWithLoader from "../ImageWithLoader";

const Card = ({ imgUrl, className, likes, comments, isLikedByYou, onLikeClick, onCommentSubmit,  id, userData, isMutateLoading}) => {
    const [isModalVisible, setModalVisible] = useState(false)
    const [comment,setComment] = useState('')

    const handleSendCommentClick = () =>{
        if(comment){
            onCommentSubmit(comment)
            setComment('')
        }
    }

    return(
        <div className={cn("cnCardRoot", className)}>
            <ImageWithLoader className="cnCardImage" src={imgUrl} alt={imgUrl}/>
            <div className='cnCardHover'/>
            <div className='cnCardIcons'>
                <i className={cn(`${isLikedByYou ? 'fas' : 'far'} fa-heart`, 'cnCardIcon')} onClick={onLikeClick}/>
                <span className='cnCardNumber cnCardLikes'>{likes}</span>
                <i className={cn('far fa-comment','cnCardIcon')} onClick={() =>setModalVisible(true)}/>
                <span className='cnCardNumber'>{comments.length}</span>
            </div>
            <PhotoModal
                comments={comments}
                isOpen={isModalVisible}
                onClose={() => setModalVisible(false)}
                {...userData}
                commentValue={comment}
                setCommentValue={setComment}
                onCommentSubmit = {handleSendCommentClick}
                isCommentLoading={isMutateLoading}
                imgUrl={imgUrl}
                isLikedByYou={isLikedByYou}
                onLikeClick={()=> onLikeClick(id)}
            />
        </div>
    )
}
export default Card