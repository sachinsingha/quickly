import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons';

function NewsCard({ news, language, translations }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setComment] = useState('');

    const readMore = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) console.log(`Navigating to full article for "${news.title[language]}"`);
    };

    const readNews = () => {
        const utterance = new SpeechSynthesisUtterance(news.summary[language]);
        utterance.lang = {
            en: 'en-US',
            hi: 'hi-IN',
            ta: 'ta-IN',
            te: 'te-IN',
            bn: 'bn-IN',
            mr: 'mr-IN',
            kn: 'kn-IN',
            ml: 'ml-IN',
            gu: 'gu-IN',
            pa: 'pa-IN',
            or: 'or-IN'
        }[language];
        window.speechSynthesis.speak(utterance);
    };

    const react = (type) => {
        console.log(`Reacted to "${news.title[language]}" with ${type}`);
    };

    const addComment = (e) => {
        if (e.key === 'Enter' && comment.trim()) {
            console.log(`Comment on "${news.title[language]}": ${comment}`);
            setComment('');
        }
    };

    return (
        <div className="news-card">
            <div className="news-card-image">
                <img src={news.image} alt={news.title[language]} loading="lazy" />
            </div>
            <div className="news-content">
                <h3>{news.title[language]}</h3>
                <p className={`summary ${isExpanded ? 'expanded' : ''}`}>
                    {news.summary[language]}
                </p>
                <button className="read-more-btn" onClick={readMore}>
                    {isExpanded ? translations.modal.readLess || 'Read Less' : translations.modal.readMore || 'Read More'}
                </button>
                <div className="news-meta">
                    {new Date(news.timestamp).toLocaleString()} | {translations.categories[news.category]}
                </div>
                <div className="actions">
                    <button on onClick={readNews}><FontAwesomeIcon icon={faVolumeUp} /></button>
                    <button onClick={() => react('thumbs-up')}><FontAwesomeIcon icon={faThumbsUp} /></button>
                    <button onClick={() => react('heart')}><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <div className="comments">
                    <input
                        type="text"
                        placeholder={translations.modal.commentPlaceholder || 'Write a comment...'}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyPress={addComment}
                    />
                </div>
            </div>
            <div className="news-card-video">
                <video src={news.video} controls poster={news.image}></video>
            </div>
        </div>
    );
}

export default NewsCard;