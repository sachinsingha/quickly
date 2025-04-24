function Tabs({ currentTab, setCurrentTab, translations }) {
    const tabs = ['feed', 'trending', 'digest'];

    return (
        <div className="tabs">
            {tabs.map(tab => (
                <div
                    key={tab}
                    className={`tab ${currentTab === tab ? 'active' : ''}`}
                    onClick={() => setCurrentTab(tab)}
                >
                    {translations.tabs[tab]}
                </div>
            ))}
        </div>
    );
}

export default Tabs;