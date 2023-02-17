import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ data, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = data.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `photo-grid__delete ${isOwn ? 'photo-grid__delete_visible' : 'photo-grid__delete_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = data.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `photo-grid__like${isLiked ? ' photo-grid__like_active' : ''}`
  )

  function handleClick() {
    onCardClick(data);
  }

  function handleLikeClick(e) {
    e.stopPropagation();
    onCardLike(data);
  }

  function handleCardDelete(e) {
    e.stopPropagation();
    onCardDelete(data);
  }

  return (
    <div className="photo-grid__item" onClick={handleClick}>
      <button type="button" className={cardDeleteButtonClassName} onClick={ handleCardDelete}>Удалить</button>
      <img src={`${data?.link}`} alt={`${data?.name}`} className="photo-grid__pic" />
      <div className="photo-grid__item-description">
        <h2 className="photo-grid__title">{data?.name}</h2>
        <div className="photo-grid__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} >Нравится</button>
          <div className="photo-grid__like-counter">{data?.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;