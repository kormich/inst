import './styles.css';

const Comment = ({nickname,text}) =>{
    return (
        <div className="cnCommentRoot">
            <span className="cnCommentName">{nickname}:</span>
            <span className="cnCommentNames">{text}</span>
        </div>
    )
}
export default Comment;