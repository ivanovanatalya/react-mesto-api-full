import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const inputName = useRef(null);
  const inputLink = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {name: inputName.current.value, link: inputLink.current.value};
    onAddPlace(data);
  }

  return (
    <PopupWithForm title="Новое место" name="add-photo" isOpen={isOpen} onClose={onClose} buttonText='Создать' onSubmit={handleSubmit}>
          <div className="form__input-wrapper">
            <input type="text" placeholder="Название" className="form__input form__input_type_title" name="photo_title" minLength="2" maxLength="30" id="input-title" ref={inputName} required />
            <span className="form__input-error-message"></span>
          </div>
          <div className="form__input-wrapper">
            <input type="url" placeholder="Ссылка на картинку" className="form__input form__input_type_src" id="form__input_image_src" name="photo_link" ref={inputLink} required />
            <span className="form__input-error-message"></span>
          </div>
        </PopupWithForm>
  );
}

export default AddPlacePopup;