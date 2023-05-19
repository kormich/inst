import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './style.css'
import UserCounter from "../UserCounter";
import Button from "../Button";
import Input from "../Input";
import FormTextArea from "../FormTextArea";

const requiredText = 'Поле обязательно!';


const validateText = (text, cb) => {

    if (!text) {
        cb(requiredText);
        return true;
    }

    if (text.length < 3) {
        cb('Слишком короткий текст!')
        return true;
    }

    if (text.length > 20) {
        cb('Слишком длинный текст!')
        return true;
    }

    if (/\s/g.test(text)) {
        cb('Не должно быть пробелов!')
        return true;
    }

    return false;
};

const validateTextDescription = (text, cb) => {

    if (!text) {
        cb(requiredText);
        return true;
    }

    if (text.length < 3) {
        cb('Слишком короткий текст!')
        return true;
    }

    if (text.length > 50) {
        cb('Слишком длинный текст!')
        return true;
    }

    return false;
};

const validateUrl = (text, cb) => {
    if (!text) {
        cb(requiredText);
        return true;
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(text)) {
        cb('Невалидная ссылка!')
        return true;
    }

    return false;
};

const UserBio = ({
                     avatarUrl,
                     nickname,
                     postsCount,
                     subscribed,
                     subscribers,
                     firstName,
                     lastName,
                     description,
                     url,
                     isMyPage,
                     isSubscribed,
                     onEdit,
                     onChangeSubscribers,
                     fromLoading
}) =>{
    const [btnProps, setBtnProps] = useState({ onClick: () => false, children: 'Подписаться' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [formUserName, setFormUserName] = useState(nickname);
    const [formFirstName, setFormFirstName] = useState(firstName);
    const [formLastName, setFormLastName] = useState(lastName);
    const [formDescription, setFormDescription] = useState(description);
    const [formUrl, setFormUrl] = useState(url);
    const [userNameError, setUserNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameErrorError] = useState('');
    const [descriptionError, setDescriptionErrorError] = useState('');
    const [urlError, setUrlErrorError] = useState('');

    const onSaveEditForm = useCallback(async () => {
        setUserNameError('')
        setFirstNameError('')
        setLastNameErrorError('')
        setUrlErrorError('')
        setDescriptionErrorError('')
        const isUserNameError = validateText(formUserName, setUserNameError);
        const isFirstNameError = validateText(formFirstName, setFirstNameError);
        const isLastNameError = validateText(formLastName, setLastNameErrorError);
        const isUrlError = validateUrl(formUrl, setUrlErrorError);
        const isDescriptionError = validateTextDescription(formDescription,setDescriptionErrorError)

        let isErrors = isUserNameError || isFirstNameError || isLastNameError || isUrlError || isDescriptionError;

        if (isErrors) {
            return;
        }

        await onEdit({
            firstName: formFirstName,
            lastName: formLastName,
            nickname: formUserName,
            description: formDescription,
            url: formUrl,
        });
        setIsEditMode(false);

    },  [formUserName, formFirstName, formLastName, formUrl, formDescription]);

    useEffect(() => {
        if (isMyPage) {
            if (isEditMode) {
                setBtnProps({ onClick: onSaveEditForm, children: 'Сохранить', className: 'cnUserEditButton', disabled: fromLoading });
            } else {
                setBtnProps({ onClick: () => setIsEditMode(true), children: 'Редактировать' });
            }
        } else if (isSubscribed) {
            setBtnProps({ onClick: () => onChangeSubscribers(true), children: 'Отписаться' })
        } else {
            setBtnProps({ onClick: () => onChangeSubscribers(false), children: 'Подписаться'})
        }
    }, [isMyPage, isSubscribed, isEditMode, fromLoading, onSaveEditForm, setBtnProps]);

    const fields = useMemo(() => {
        if (isEditMode) {
            return {
                userName: <Input value={formUserName} onChange={({ target: { value } }) => setFormUserName(value)} errorText={userNameError} className="cnInput" />,
                name: (
                    <>
                        <Input value={formFirstName} onChange={({ target: { value } }) => setFormFirstName(value)} className="cnInput" errorText={firstNameError} />
                        <Input value={formLastName} onChange={({ target: { value } }) => setFormLastName(value)} className="cnInput" errorText={lastNameError} />
                    </>
                ),
                description: <FormTextArea value={formDescription} onChange={({ target: { value } }) => setFormDescription(value)} className="cnInput" errorText={descriptionError} />,
                url: <Input value={formUrl} onChange={({ target: { value } }) => setFormUrl(value)} errorText={urlError} />,
                firstButtonClassName: 'cnUserBioButtonRow',
            }
        }

        return {
            userName: <span className='cnUserBioNickname'>{nickname}</span>,
            name: <span className='cnUserBioName'>{firstName} {lastName}</span>,
            description: <span>{description}</span>,
            url: <a href={url} >{url}</a>,
            firstButtonClassName: 'cnUserBioRow',
        }
    }, [isEditMode, nickname, firstName, lastName, description, url, formFirstName, formDescription, formLastName, formUrl, formUserName, userNameError, firstNameError, lastNameError, descriptionError, urlError]);


    return(
        <div className='cnUserBioRoot'>
            <div>
                <img className='cnUserBioAvatar' src={avatarUrl} alt="avatar"/>
            </div>
            <div className='cnUserBioInfo'>
                <div className={fields.firstButtonClassName}>
                    {fields.userName}
                    <Button {...btnProps}/>
                </div>
                <div className='cnUserBioRow'>
                    <UserCounter count={postsCount} text="Публикаций" className="cnUserBioCounter"/>
                    <UserCounter count={subscribers} text="Подписчиков" className="cnUserBioCounter"/>
                    <UserCounter count={subscribed} text="Подписок"/>
                </div>
                <div className='cnUserBioRow'>
                    {fields.name}
                </div>
                <div className='cnUserBioRow'>
                    {fields.description}
                </div>
                {fields.url}
            </div>
        </div>
    )
}
export default UserBio