// DashLayout.jsx
// для рендерингу вкладених маршрутів у React додатку 
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
            <Outlet />
      </div>
      <DashFooter />
    </>
  )
}
export default DashLayout

/*
  DashLayout містить загальну структуру сторінки, 
  заголовок (DashHeader), контейнер для вмісту і підвал (DashFooter). 
  Вміст сторінки, який має бути рендерований в середині лейаута, 
  визначається за допомогою вкладених маршрутів.
*/