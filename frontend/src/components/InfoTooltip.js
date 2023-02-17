function InfoTooltip({ tooltipType, isOpen, onClose, tooltipText }) {
  return (
    <div className={`tooltip${isOpen ? ' tooltip_opened' : ''}`}>
      <div className="tooltip__container">
        <button type="button" onClick={onClose} className="tooltip__close" aria-label="кнопка Закрыть" id="profileClose">Закрыть</button>
        <img className={`tooltip__pic tooltip__pic_${tooltipType}`}></img>
        <div className="tooltip__text">{tooltipText}
        </div>
      </div>
    </div>
  )
}
export default InfoTooltip;