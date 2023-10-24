// DashFooter.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';

const DashFooter = () => {
  // хуки для навігації та визначення поточного шляху
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // функція для переходу на головну сторінку
  const onGoHomeClicked = () => navigate('/dash');

  let goHomeButton = null;
  // перевіряємо, чи поточний шлях не є "/dash" 
  // перед відображенням кнопки "Повернутися на головну"
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    )
  };

    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User:</p>
            <p>Status:</p>
        </footer>
    );
    return content;
}
export default DashFooter;
