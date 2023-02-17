function PopupWithForm({title, name, children, isOpen, onClose, buttonText, onSubmit}) {
  return (
    <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="кнопка Закрыть" id="profileClose" onClick={onClose}>Закрыть</button>
        <form action="/" method="post" name={`${name}`} className="form" onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__submit" aria-label="кнопка Сохранить">{ buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;