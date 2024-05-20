import { Typewriter } from 'react-simple-typewriter'
import { useEffect, useState } from 'react'
import './FloatingText.css'


const textContent1 = [
    { content: "Selamat Datang di Candi Prambanan!", id: 1, category: "first" },
    { content: "Candi Prambanan merupakan Candi Hindu terbesar di Indonesia.", id: 2, category: "second" }
]

const textContent2 = [
    { content: "Selamat Datang di Candi Borobudur!", id: 3, category: "first" },
    { content: "Candi Borobudur merupakan Candi Buddha terbesar di Indonesia.", id: 4, category: "second" }
]

const textContent3 = [
    { content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nobis!", id: 5, category: "first" },
    { content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ASDAD, nobis!", id: 6, category: "second" }
]

const textContent4 = [
    { content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. WEWEW, nobis!", id: 7, category: "first" },
    { content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. KAKA, nobis!", id: 8, category: "second" }
]

const textContents = [
    textContent1, textContent2, textContent3, textContent4
]

export default function FloatingText({ hideFloatingText }) {
    const [contentIndex, setContentIndex] = useState(0);
    const [paragraphIndex, setParagraphIndex] = useState(0);
    const [isDisabled, setDisabled] = useState(false);
    const [isFinished, setFinished] = useState(false);

    const toggleButton = () => {
        setDisabled(!isDisabled);
    };

    // const disableButton = () => {
    //     setDisabled(true);
    //     console.log("button is disabled");
    // };

    // const enableButton = () => {
    //     setDisabled(false);
    //     console.log("button is enabled");
    // };

    const finish = () => {
        setFinished(!isFinished);
        console.log(isFinished);
    }

    const nextContent = () => {
        if (contentIndex === (textContents.length - 2)) {
            setDisabled(true);
        }

        if (paragraphIndex < textContents[contentIndex].length - 2) {
            setParagraphIndex(paragraphIndex + 2);
        } else {
            setParagraphIndex(0);
            setContentIndex((prevIndex) => (prevIndex + 1) % textContents.length);
        }
    };

    function mapContents(textContents) {
        const currentContent = textContents[contentIndex];
        return currentContent
            .slice(paragraphIndex, paragraphIndex + 2)
            .map((content) => (
                <p key={content.id} className={`content-${content.id} content-${content.category}-sentence floating-text-content`}>
                    {content.content}
                </p>
            ));
    }

    useEffect(() => {
        return () => { };
    }, [contentIndex, paragraphIndex]);

    return (
        <div className="floating-text-container">
            <div className="floating-text-content-container">{mapContents(textContents)}</div>
            <div className="content-btn-container">
                <div className="next-content-btn-container">
                    {/* <button className="skip-content-btn" onClick={() => { toggleButton() }} disabled={isDisabled}>Skip</button> */}
                    <button className="next-content-btn" onClick={nextContent} disabled={isDisabled}>Next</button>
                </div>
                <div className="finish-content-btn-container">
                    <button className="finish-content-btn" onClick={hideFloatingText} disabled={!isDisabled}>Finish</button>
                </div>
            </div>
        </div>
    );
}