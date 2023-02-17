import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
  const inputAvatar = useRef(null);

  useEffect(() => {
    if (isOpen){
      inputAvatar.current.value = "";
    }
  }, [isOpen]); 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(inputAvatar.current.value
      /* Значение инпута, полученное с помощью рефа */
    );
  } 

  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
    <div className="form__input-wrapper">
      <input type="url" placeholder="Ссылка на аватар" className="form__input form__input_type_src" id="form__input_avatar_src" name="avatar_link" ref={inputAvatar} required />
      <span className="form__input-error-message"></span>
    </div>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;