import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

function Modal({ isOpen, closeModal, addNews, language, translations }) {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        image: '',
        video: '',
        category: '',
        language: language
    });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addNews(formData);
        setFormData({ title: '', summary: '', image: '', video: '', category: '', language });
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            closeModal();
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className="modal-content">
                <span className="close-btn" onClick={closeModal}>×</span>
                <h2>{translations.modal.title}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder={translations.modal.newsTitle}
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="summary"
                        placeholder={translations.modal.summary}
                        maxLength="400"
                        value={formData.summary}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <input
                        type="url"
                        name="image"
                        placeholder={translations.modal.image}
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        name="video"
                        placeholder={translations.modal.video}
                        value={formData.video}
                        onChange={handleChange}
                        required
                    />
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="" disabled>{translations.modal.category}</option>
                        <option value="tech">{translations.categories.tech}</option>
                        <option value="politics">{translations.categories.politics}</option>
                        <option value="sports">{translations.categories.sports}</option>
                        <option value="business">{translations.categories.business}</option>
                        <option value="entertainment">{translations.categories.entertainment}</option>
                        <option value="health">{translations.categories.health}</option>
                    </select>
                    <div className="select-wrapper">
                        <FontAwesomeIcon icon={faLanguage} className="select-icon" />
                        <select name="language" value={formData.language} onChange={handleChange} required>
                            <option value="" disabled>{translations.modal.language}</option>
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="ta">Tamil</option>
                            <option value="te">Telugu</option>
                            <option value="bn">Bengali</option>
                            <option value="mr">Marathi</option>
                            <option value="kn">Kannada</option>
                            <option value="ml">Malayalam</option>
                            <option value="gu">Gujarati</option>
                            <option value="pa">Punjabi</option>
                            <option value="or">Odia</option>
                        </select>
                    </div>
                    <button type="submit">{translations.modal.publish}</button>
                </form>
                <div className="success-message" style={{ display: success ? 'block' : 'none' }}>
                    {translations.modal.success}
                </div>
            </div>
        </div>
    );
}

export default Modal;