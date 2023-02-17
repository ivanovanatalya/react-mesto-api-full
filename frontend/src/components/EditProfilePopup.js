import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  function handleNameChange (e) {
    setName(e.target.value)
  }

  function handleDescriptionChange (e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit} >
    <div className="form__input-wrapper">
      <input type="text" placeholder="Ваше имя" className="form__input form__input_type_name" name="profile_name"
        minLength="2" maxLength="40" id="input-name" onChange={handleNameChange} value={name || ''} required />
      <span className="form__input-error-message"></span>
    </div>
    <div className="form__input-wrapper">
      <input type="text" placeholder="Чем занимаетесь?" className="form__input form__input_type_description" name="profile_title" minLength="2" maxLength="200" id="input-description" onChange={handleDescriptionChange} value={description || ''} required />
      <span className="form__input-error-message"></span>
    </div>
  </PopupWithForm>
  );
}
export default EditProfilePopup;