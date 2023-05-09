import './styles.css'
import cn from "classnames";

const Card = ({ imgUrl, className, likes, comments, isLikedByYou, onLikeClick}) => {
    return(
        <div className={cn("cnCardRoot", className)}>
            <img src={imgUrl} alt={imgUrl} className="cnCardImage"/>
            <div className='cnCardHover'/>
            <div className='cnCardIcons'>
                <i className={cn(`${isLikedByYou ? 'fas' : 'far'} fa-heart`, 'cnCardIcon')} onClick={onLikeClick}/>
                <span className='cnCardNumber cnCardLikes'>{likes}</span>
                <i className={cn('far fa-comment','cnCardIcon')}/>
                <span className='cnCardNumber'>{comments}</span>
            </div>
        </div>
    )
}
export default Card