function Sidebar({ isOpen, filterNews, activeCategory, translations }) {
    const categories = [
        'all', 'tech', 'politics', 'sports', 'business', 'entertainment', 
        'health', 'science', 'education', 'lifestyle', 'world'
    ];

    return (
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <div className="category-list">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={activeCategory === cat ? 'active' : ''}
                        onClick={() => filterNews(cat)}
                    >
                        {translations.categories[cat]}
                    </button>
                ))}
            </div>
            <div className="scroll-indicator">
                <span>↓ Scroll for more</span>
            </div>
        </div>
    );
}

export default Sidebar;