function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_modal ${card && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" id="modalClose" onClick={onClose}>Закрыть</button>
        <img src={`${card?.link}`} className="popup__pic" alt={`${card?.name}`} />
        <h2 className="popup__pic-caption">{card?.name}</h2>
      </div>
    </div>

  );
}

export default ImagePopup;