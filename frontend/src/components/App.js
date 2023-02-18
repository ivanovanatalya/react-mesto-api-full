import { useState, useEffect } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { authApi } from '../utils/authApi';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const initTooltipData = { isOpen: false, type: '', text: '' }
  const [tooltipData, setTooltipData] = useState(initTooltipData);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    userName: 'name',
    userDescription: 'description',
    userAvatar: 'avatar'
  });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState('');

  const history = useHistory();
  const successMsg = 'Вы успешно зарегистрировались!';
  const failMsg = 'Что-то пошло не так! Попробуйте ещё раз.';

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      authApi.checkToken(jwt)
        .then(res => {
          if (res) {
            api.setToken(jwt);
            setIsLoggedIn(true);
            setUserMail(res.data.email);
            history.replace('/');
          }
        })
        .catch(err => console.log(err));
    } else {
      history.replace('/sign-in');
    }
  }, [history]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then(res => {
          setCurrentUser(res);
        })
        .catch(err => console.log(err));
    }
  }, [history, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getCardList()
        .then(res => {
          setCards(res);
        })
        .catch(err => console.log(err));
    }
  }, [history, isLoggedIn]);

  const handleEditAvatarClick = () =>
    setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () =>
    setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () =>
    setIsAddPlacePopupOpen(true);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setTooltipData(initTooltipData);
    setSelectedCard(null);
  }

  const handleCardClick = (card) =>
    setSelectedCard(card);

  function handleLogin(email, password) {
    authApi.signIn(email, password)
      .then(res => {
        if (res) {
          const jwt = localStorage.getItem('token');
          api.setToken(jwt);
          setIsLoggedIn(true);
          setUserMail(email);
          history.replace('/');
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isOpen: true, type: 'fail', text: failMsg });
      });
  }

  function handleRegister(email, password) {
    authApi.signUp(email, password)
      .then(res => {
        if (res) {
          setTooltipData({ isOpen: true, type: 'success', text: successMsg });
          history.replace('/sign-in');
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isOpen: true, type: 'fail', text: failMsg });
      });
  }

  function handleUpdateUser(name, description) {
    api.setUserInfo(name, description)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(url) {
    api.setUserAvatar(url)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });

  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history.replace('/sign-in');
    setUserMail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header >
          {isLoggedIn ? (
            <>
              <div className="header__link">{userMail}</div>
              <button onClick={handleSignOut} className="header__button">Выйти</button>
            </>
          ) : (
            <Switch>
              <Route path="/sign-in">
                <Link to="/sign-up" className="header__link">Регистрация</Link>
              </Route>
              <Route path="/sign-up">
                <Link to="/sign-in" className="header__link">Войти</Link>
              </Route>
            </Switch>
          )}
        </Header>
        <Switch>
          <Route path="/sign-up" >
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/sign-in" >
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute path="/" isLoggedIn={isLoggedIn} >
            <Main 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick} 
              cards={cards} 
              onCardLike={handleCardLike} 
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>

          <Route path="*">
            <Redirect to="/sign-up" />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip tooltipType={tooltipData.type} tooltipText={tooltipData.text} isOpen={tooltipData.isOpen} onClose={closeAllPopups} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;