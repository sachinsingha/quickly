// import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVolumeUp, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// function NewsCardList() {
//     const [newsList, setNewsList] = useState([]);
//     const [language, setLanguage] = useState('en');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const translations = {
//         modal: {
//             readMore: 'Read More',
//             readLess: 'Read Less',
//             commentPlaceholder: 'Write a comment...'
//         },
//         categories: {
//             disaster: 'Disaster',
//             education: 'Education',
//             politics: 'Politics',
//             wired: 'Technology', // Added for the API response categories
//             'the-verge': 'Tech News' // Added for the API response categories
//         }
//     };

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(
//                 `https://newsapi.org/v2/everything?q=apple&from=2025-05-05&to=2025-05-05&sortBy=popularity&apiKey=6174c0d3a94842e4a9c14a8435ec9fcd`
//             );
            
//             // Transform API data to match our expected format
//             const formattedNews = response.data.articles.map(article => ({
//                 title: { en: article.title },
//                 summary: { en: article.description || 'No description available' },
//                 image: article.urlToImage || 'https://via.placeholder.com/300x200',
//                 video: 'https://www.w3schools.com/html/mov_bbb.mp4', // Default video since API doesn't provide
//                 timestamp: article.publishedAt,
//                 category: article.source.id || 'general'
//             }));

//             setNewsList(formattedNews);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching news:", error);
//             setError(error.message);
//             setLoading(false);
            
            
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     if (loading) {
//         return <div className="loading">Loading news...</div>;
//     }

//     if (error) {
//         return <div className="error">Error: {error}</div>;
//     }

//     return (
//         <div className="news-list">
//             <div className="language-selector">
//                 <select 
//                     value={language} 
//                     onChange={(e) => setLanguage(e.target.value)}
//                 >
//                     <option value="en">English</option>
//                     <option value="hi">Hindi</option>
//                 </select>
//             </div>
            
//             {newsList.map((news, index) => (
//                 <NewsCard 
//                     key={index} 
//                     news={news} 
//                     language={language} 
//                     translations={translations} 
//                 />
//             ))}
//         </div>
//     );
// }

// function NewsCard({ news, language, translations }) {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [comment, setComment] = useState('');

//     const readMore = () => {
//         setIsExpanded(!isExpanded);
//     };

//     const readNews = () => {
//         const utterance = new SpeechSynthesisUtterance(news.summary[language] || news.summary.en);
//         utterance.lang = {
//             en: 'en-US',
//             hi: 'hi-IN',
//             ta: 'ta-IN',
//             te: 'te-IN',
//             bn: 'bn-IN',
//             mr: 'mr-IN',
//             kn: 'kn-IN',
//             ml: 'ml-IN',
//             gu: 'gu-IN',
//             pa: 'pa-IN',
//             or: 'or-IN'
//         }[language];
//         window.speechSynthesis.speak(utterance);
//     };

//     const react = (type) => {
//         console.log(`Reacted to "${news.title[language] || news.title.en}" with ${type}`);
//     };

//     const addComment = (e) => {
//         if (e.key === 'Enter' && comment.trim()) {
//             console.log(`Comment: ${comment}`);
//             setComment('');
//         }
//     };

//     return (
//         <div className="news-card">
//             <div className="news-card-image">
//                 <img 
//                     src={news.image} 
//                     alt={news.title[language] || news.title.en} 
//                     loading="lazy" 
//                     onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300x200';
//                     }}
//                 />
//             </div>
//             <div className="news-content">
//                 <h3>{news.title[language] || news.title.en}</h3>
//                 <p className={`summary ${isExpanded ? 'expanded' : ''}`}>
//                     {news.summary[language] || news.summary.en}
//                 </p>
//                 <button className="read-more-btn" onClick={readMore}>
//                     {isExpanded ? translations.modal.readLess : translations.modal.readMore}
//                 </button>
//                 <div className="news-meta">
//                     {new Date(news.timestamp).toLocaleString()} | 
//                     {translations.categories[news.category] || news.category}
//                 </div>
//                 <div className="actions">
//                     <button onClick={readNews}><FontAwesomeIcon icon={faVolumeUp} /></button>
//                     <button onClick={() => react('thumbs-up')}><FontAwesomeIcon icon={faThumbsUp} /></button>
//                     <button onClick={() => react('heart')}><FontAwesomeIcon icon={faHeart} /></button>
//                 </div>
//                 <div className="comments">
//                     <input
//                         type="text"
//                         placeholder={translations.modal.commentPlaceholder}
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         onKeyPress={addComment}
//                     />
//                 </div>
//             </div>
//             <div className="news-card-video">
//                 <video src={news.video} controls poster={news.image}></video>
//             </div>
//         </div>
//     );
// }

// export default NewsCardList;
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function NewsCardList() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=apple&from=2025-05-05&to=2025-05-05&sortBy=popularity&apiKey=6174c0d3a94842e4a9c14a8435ec9fcd`
            );

            const formattedNews = response.data.articles.map(article => ({
                title: article.title,
                summary: article.description || 'No description available',
                image: article.urlToImage || 'https://via.placeholder.com/300x200',
                video: 'https://www.w3schools.com/html/mov_bbb.mp4',
                timestamp: article.publishedAt,
                category: article.source.id || 'general'
            }));

            setNewsList(formattedNews);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading news...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="news-list">
            {newsList.map((news, index) => (
                <NewsCard key={index} news={news} />
            ))}
        </div>
    );
}

function NewsCard({ news }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setComment] = useState('');

    const readMore = () => setIsExpanded(!isExpanded);

    const readNews = () => {
        const utterance = new SpeechSynthesisUtterance(news.summary);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const react = (type) => {
        console.log(`Reacted to "${news.title}" with ${type}`);
    };

    const addComment = (e) => {
        if (e.key === 'Enter' && comment.trim()) {
            console.log(`Comment: ${comment}`);
            setComment('');
        }
    };

    const categoryMap = {
        disaster: 'Disaster',
        education: 'Education',
        politics: 'Politics',
        wired: 'Technology',
        'the-verge': 'Tech News'
    };

    return (
        <div className="news-card">
            <div className="news-card-image">
                <img
                    src={news.image}
                    alt={news.title}
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200';
                    }}
                />
            </div>
            <div className="news-content">
                <h3>{news.title}</h3>
                <p className={`summary ${isExpanded ? 'expanded' : ''}`}>
                    {news.summary}
                </p>
                <button className="read-more-btn" onClick={readMore}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
                <div className="news-meta">
                    {new Date(news.timestamp).toLocaleString()} | {categoryMap[news.category] || news.category}
                </div>
                <div className="actions">
                    <button onClick={readNews}><FontAwesomeIcon icon={faVolumeUp} /></button>
                    <button onClick={() => react('thumbs-up')}><FontAwesomeIcon icon={faThumbsUp} /></button>
                    <button onClick={() => react('heart')}><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <div className="comments">
                    <input
                        type="text"
                        placeholder="Write a comment..."
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

export default NewsCardList;
