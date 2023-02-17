import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={`${currentUser.avatar}`} alt="Аватарка профиля" className="profile__avatar" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button type="button" className="profile__button-edit" aria-label="кнопка Редактировать" onClick={onEditProfile}>Редактировать</button>
        </div>
        <button type="button" className="profile__button-add " aria-label="кнопка Добавить" onClick={onAddPlace}>Добавить фотографию</button>
      </section>
      <section className="elements">
        <ul className="photo-grid">{cards.map(item => (
          <li key={item._id}>
            <Card data={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          </li>
        ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;