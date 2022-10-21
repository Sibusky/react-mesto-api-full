import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext, } from '../context/CurrentUserContext';
import { api } from '../utils/api.js'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import registrationSucsessImg from '../images/registration-sucsess.svg';
import registrationFailImg from '../images/registration-fail.svg';

function App() {

  // Объявляю переменные состояния через хук useState
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [userData, setUserData] = useState({
    _id: "",
    email: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState({
    image: "",
    caption: ""
  });

  const history = useHistory();

  // Проверяю выполнял ли пользователь вход ранее
  useEffect(() => {
    handleCheckToken();
  }, []);

  // Получаю данные пользователя и карточек
  useEffect(() => {
    if (loggedIn) {
      api.getProfile() // Загружаю данные пользователья
        .then((userData) => {
          setCurrentUser({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
            id: userData._id
          })
        })
        .catch(err => console.log(`Ошибка: ${err}`))

      api.getInitialCards() // Загружаю данные карточек
        .then((cardList) => {
          setCards(cardList)
        })
        .catch(err => console.log(`Ошибка: ${err}`))

      history.push("/"); // Если всё хорошо, то перехожу на начальную страницу с карточками
    }
  }, [loggedIn, history])

  // Функции для изменения состояния переменных (аватар, имя профиля, описание профиля, клинутая карточка)
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  // Функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard(null)
  }

  // Функция обновления данных пользователя после изменения
  const handleUpdateUser = ({ name, about }) => {
    api.editProfile(name, about)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция обновления аватара
  const handleUpdateAvatar = ({ avatar }) => {
    api.editAvatar(avatar)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция для установки лайка
  function handleCardLike(card) {
    // Проверяю, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    // Отправляю запрос в API и получаю обновлённые данные карточки
    // Запись setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); равносильна записи:
    // setCards(cards.map((c) => c._id === card._id ? newCard : c));
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция для удаления карточек
  function handleCardDelete(card) {
    // Отправляю запрос на удаление карточки и получаю обновлённые данные о карточках
    api.deleteCard(card._id)
      .then(() => {
        // Методом filter() возвращаю массив без удалённой карточки
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция добавления новых карточек
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция регистрации пользователя
  function handleRegister({ email, password }) {
    return Auth.register(email, password)
      .then((res) => {
        const { email } = res.data;
        setUserData({ ...userData, email });
        setIsInfoTooltipMessage({
          image: registrationSucsessImg,
          caption: "Вы успешно зарегистрировались!",
        });
        history.push("/signin");
      })
      .catch((err) => {
        console.log(`Ошибка...: ${err}`);
        setIsInfoTooltipMessage({
          image: registrationFailImg,
          caption: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  // Функция входа на сайт
  function handleLogin({ email, password }) {
    return Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);

          handleCheckToken();

          history.push("/"); // Если данные ещё есть в localstorage, пользователь переходит на главную
        }
      })
      .catch((err) => {
        console.log(`Ошибка...: ${err}`);
        setIsInfoTooltipMessage({
          image: registrationFailImg,
          caption: "Неверный email или пароль. Попробуйте ещё раз.",
        });
        setIsInfoTooltipOpen(true);
      });
  }

  // Функция проверки токена
  function handleCheckToken() {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      Auth.getContent(jwt)
        .then((res) => {
          const { _id, email } = res.data;
          setLoggedIn(true);
          setUserData({ _id, email });
        })
        .catch((err) => {
          console.log(`Ошибка...: ${err}`);
        });
    }
  }

  // Функция выхода пользователя
  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData({ _id: "", email: "" });
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>

      <div className="page">

        <Header
          userData={userData}
          handleLogOut={handleLogOut} />

        <Switch>

          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}>
          </ProtectedRoute>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn
              ? <Redirect to="/" />
              : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <Footer />

        {/* Попап загрузки аватара */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        {/* Попап изменения данных профиля */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/* Попап добавления новой карточки */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        {/* Попап открытия изображения карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* Попап регистрации или логина */}
        <InfoTooltip
          name="infotooltip"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          image={isInfoTooltipMessage.image}
          caption={isInfoTooltipMessage.caption}   >
        </InfoTooltip>

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;