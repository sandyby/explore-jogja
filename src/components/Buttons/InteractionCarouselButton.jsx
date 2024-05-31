import question from '../../assets/game-question.png'
import './InteractionCarouselButton.css'

const InteractionCarouselButton = ({ openCarousel }) => {
  return (
    <div className="open-modal-btn-container position-absolute">
      <button className="open-modal-btn border-0 rounded-3 p-2" onClick={openCarousel}><img className="question-img" src={question} alt="" /></button>
    </div>
  );
};

export default InteractionCarouselButton;