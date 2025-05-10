
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import NewsCard from './components/NewsCard';
import Modal from './components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import './assets/styles.css';

// UI Translations (unchanged from previous)
const uiTranslations = {
    en: {
        appTitle: 'Quickly',
        searchPlaceholder: 'Search news...',
        categories: {
            all: 'All',
            tech: 'Tech',
            politics: 'Politics',
            sports: 'Sports',
            business: 'Business',
            entertainment: 'Entertainment',
            health: 'Health',
            science: 'Science',
            education: 'Education',
            lifestyle: 'Lifestyle',
            world: 'World'
        },
        tabs: {
            feed: 'Feed',
            trending: 'Trending',
            digest: 'Daily Digest'
        },
        modal: {
            title: 'Manage News',
            newsTitle: 'News Title',
            summary: 'Summary (60 words)',
            image: 'Image URL',
            video: 'Video URL',
            category: 'Select Category',
            language: 'Select Language',
            publish: 'Publish News',
            success: 'News published successfully!',
            readMore: 'Read More',
            readLess: 'Read Less',
            commentPlaceholder: 'Write a comment...'
        }
    },
    hi: {
        appTitle: 'क्विकली',
        searchPlaceholder: 'समाचार खोजें...',
        categories: {
            all: 'सभी',
            tech: 'तकनीक',
            politics: 'राजनीति',
            sports: 'खेल',
            business: 'व्यवसाय',
            entertainment: 'मनोरंजन',
            health: 'स्वास्थ्य',
            science: 'विज्ञान',
            education: 'शिक्षा',
            lifestyle: 'जीवनशैली',
            world: 'विश्व'
        },
        tabs: {
            feed: 'फ़ीड',
            trending: 'ट्रेंडिंग',
            digest: 'दैनिक संक्षेप'
        },
        modal: {
            title: 'समाचार प्रबंधन',
            newsTitle: 'समाचार शीर्षक',
            summary: 'सारांश (60 शब्द)',
            image: 'छवि URL',
            video: 'वीडियो URL',
            category: 'श्रेणी चुनें',
            language: 'भाषा चुनें',
            publish: 'समाचार प्रकाशित करें',
            success: 'समाचार सफलतापूर्वक प्रकाशित!',
            readMore: 'और पढ़ें',
            readLess: 'कम पढ़ें',
            commentPlaceholder: 'टिप्पणी लिखें...'
        }
    },
    ta: {
        appTitle: 'விரைவாக',
        searchPlaceholder: 'செய்திகளைத் தேடு...',
        categories: {
            all: 'அனைத்து',
            tech: 'தொழில்நுட்பம்',
            politics: 'அரசியல்',
            sports: 'விளையாட்டு',
            business: 'வணிகம்',
            entertainment: 'பொழுதுபோக்கு',
            health: 'ஆரோக்கியம்',
            science: 'அறிவியல்',
            education: 'கல்வி',
            lifestyle: 'வாழ்க்கைமுறை',
            world: 'உலகம்'
        },
        tabs: {
            feed: 'ஊட்டம்',
            trending: 'பிரபலமானவை',
            digest: 'தினசரி சுருக்கம்'
        },
        modal: {
            title: 'செய்திகளை நிர்வகி',
            newsTitle: 'செய்தி தலைப்பு',
            summary: 'சுருக்கம் (60 வார்த்தைகள்)',
            image: 'பட URL',
            video: 'வீடியோ URL',
            category: 'வகை தேர்ந்தெடு',
            language: 'மொழி தேர்ந்தெடு',
            publish: 'செய்தி வெளியிடு',
            success: 'செய்தி வெற்றிகரமாக வெளியிடப்பட்டது!',
            readMore: 'மேலும் படிக்க',
            readLess: 'குறைவாக படிக்க',
            commentPlaceholder: 'கருத்து எழுது...'
        }
    },
    te: {
        appTitle: 'క్విక్లీ',
        searchPlaceholder: 'వార్తలను శోధించండి...',
        categories: {
            all: 'అన్నీ',
            tech: 'టెక్',
            politics: 'రాజకీయాలు',
            sports: 'క్రీడలు',
            business: 'వ్యాపారం',
            entertainment: 'వినోదం',
            health: 'ఆరోగ్యం',
            science: 'విజ్ఞానం',
            education: 'విద్య',
            lifestyle: 'జీవనశైలి',
            world: 'ప్రపంచం'
        },
        tabs: {
            feed: 'ఫీడ్',
            trending: 'ట్రెండింగ్',
            digest: 'డైలీ డైజెస్ట్'
        },
        modal: {
            title: 'వార్తలను నిర్వహించండి',
            newsTitle: 'వార్తల శీర్షిక',
            summary: 'సారాంశం (60 పదాలు)',
            image: 'చిత్రం URL',
            video: 'వీడియో URL',
            category: 'వర్గం ఎంచుకోండి',
            language: 'భాష ఎంచుకోండి',
            publish: 'వార్తలను ప్రచురించండి',
            success: 'వార్తలు విజయవంతంగా ప్రచురించబడ్డాయి!',
            readMore: 'మరింత చదవండి',
            readLess: 'తక్కువ చదవండి',
            commentPlaceholder: 'వ్యాఖ్య రాయండి...'
        }
    },
    bn: {
        appTitle: 'কুইকলি',
        searchPlaceholder: 'সংবাদ অনুসন্ধান করুন...',
        categories: {
            all: 'সব',
            tech: 'প্রযুক্তি',
            politics: 'রাজনীতি',
            sports: 'ক্রীড়া',
            business: 'ব্যবসা',
            entertainment: 'বিনোদন',
            health: 'স্বাস্থ্য',
            science: 'বিজ্ঞান',
            education: 'শিক্ষা',
            lifestyle: 'জীবনধারা',
            world: 'বিশ্ব'
        },
        tabs: {
            feed: 'ফিড',
            trending: 'ট্রেন্ডিং',
            digest: 'দৈনিক সংক্ষেপ'
        },
        modal: {
            title: 'সংবাদ ব্যবস্থাপনা',
            newsTitle: 'সংবাদ শিরোনাম',
            summary: 'সারসংক্ষেপ (৬০ শব্দ)',
            image: 'চিত্র URL',
            video: 'ভিডিও URL',
            category: 'বিভাগ নির্বাচন করুন',
            language: 'ভাষা নির্বাচন করুন',
            publish: 'সংবাদ প্রকাশ করুন',
            success: 'সংবাদ সফলভাবে প্রকাশিত!',
            readMore: 'আরও পড়ুন',
            readLess: 'কম পড়ুন',
            commentPlaceholder: 'মন্তব্য লিখুন...'
        }
    },
    mr: {
        appTitle: 'क्विकली',
        searchPlaceholder: 'बातम्या शोधा...',
        categories: {
            all: 'सर्व',
            tech: 'तंत्रज्ञान',
            politics: 'राजकारण',
            sports: 'क्रीडा',
            business: 'व्यवसाय',
            entertainment: 'मनोरंजन',
            health: 'आरोग्य',
            science: 'विज्ञान',
            education: 'शिक्षण',
            lifestyle: 'जीवनशैली',
            world: 'जागतिक'
        },
        tabs: {
            feed: 'फीड',
            trending: 'ट्रेंडिंग',
            digest: 'दैनिक सार'
        },
        modal: {
            title: 'बातम्या व्यवस्थापित करा',
            newsTitle: 'बातम्यांचे शीर्षक',
            summary: 'सारांश (६० शब्द)',
            image: 'प्रतिमा URL',
            video: 'व्हिडिओ URL',
            category: 'श्रेणी निवडा',
            language: 'भाषा निवडा',
            publish: 'बातम्या प्रकाशित करा',
            success: 'बातम्या यशस्वीरित्या प्रकाशित!',
            readMore: 'अधिक वाचा',
            readLess: 'कमी वाचा',
            commentPlaceholder: 'टिप्पणी लिहा...'
        }
    },
    kn: {
        appTitle: 'ಕ್ವಿಕ್ಲಿ',
        searchPlaceholder: 'ಸುದ್ದಿಗಳನ್ನು ಹುಡುಕಿ...',
        categories: {
            all: 'ಎಲ್ಲಾ',
            tech: 'ತಂತ್ರಜ್ಞಾನ',
            politics: 'ರಾಜಕೀಯ',
            sports: 'ಕ್ರೀಡೆ',
            business: 'ವ್ಯಾಪಾರ',
            entertainment: 'ಮನರಂಜನೆ',
            health: 'ಆರೋಗ್ಯ',
            science: 'ವಿಜ್ಞಾನ',
            education: 'ಶಿಕ್ಷಣ',
            lifestyle: 'ಜೀವನಶೈಲಿ',
            world: 'ವಿಶ್ವ'
        },
        tabs: {
            feed: 'ಫೀಡ್',
            trending: 'ಟ್ರೆಂಡಿಂಗ್',
            digest: 'ದೈನಂದಿನ ಸಂಕ್ಷೇಪ'
        },
        modal: {
            title: 'ಸುದ್ದಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
            newsTitle: 'ಸುದ್ದಿ ಶೀರ್ಷಿಕೆ',
            summary: 'ಸಾರಾಂಶ (೬೦ ಪದಗಳು)',
            image: 'ಚಿತ್ರ URL',
            video: 'ವೀಡಿಯೊ URL',
            category: 'ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ',
            language: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
            publish: 'ಸುದ್ದಿಗಳನ್ನು ಪ್ರಕಟಿಸಿ',
            success: 'ಸುದ್ದಿಗಳು ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟಿತವಾದವು!',
            readMore: 'ಇನ್ನಷ್ಟು ಓದಿ',
            readLess: 'ಕಡಿಮೆ ಓದಿ',
            commentPlaceholder: 'ಟಿಪ್ಪಣಿ ಬರೆಯಿರಿ...'
        }
    },
    ml: {
        appTitle: 'ക്വിക്ലി',
        searchPlaceholder: 'വാർത്തകൾ തിരയുക...',
        categories: {
            all: 'എല്ലാം',
            tech: 'സാങ്കേതികവിദ്യ',
            politics: 'രാഷ്ട്രീയം',
            sports: 'കായികം',
            business: 'ബിസിനസ്',
            entertainment: 'വിനോദം',
            health: 'ആരോഗ്യം',
            science: 'ശാസ്ത്രം',
            education: 'വിദ്യാഭ്യാസം',
            lifestyle: 'ജീവിതശൈലി',
            world: 'ലോകം'
        },
        tabs: {
            feed: 'ഫീഡ്',
            trending: 'ട്രെൻഡിംഗ്',
            digest: 'ദൈനംദിന സംഗ്രഹം'
        },
        modal: {
            title: 'വാർത്തകൾ കൈകാര്യം ചെയ്യുക',
            newsTitle: 'വാർത്താ ശീർഷകം',
            summary: 'സംഗ്രഹം (60 വാക്കുകൾ)',
            image: 'ചിത്ര URL',
            video: 'വീഡിയോ URL',
            category: 'വിഭാഗം തിരഞ്ഞെടുക്കുക',
            language: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
            publish: 'വാർത്ത പ്രസിദ്ധീകരിക്കുക',
            success: 'വാർത്ത വിജയകരമായി പ്രസിദ്ധീകരിച്ചു!',
            readMore: 'കൂടുതൽ വായിക്കുക',
            readLess: 'കുറച്ച് വായിക്കുക',
            commentPlaceholder: 'അഭിപ്രായം എഴുതുക...'
        }
    },
    gu: {
        appTitle: 'ક્વિકલી',
        searchPlaceholder: 'સમાચાર શોધો...',
        categories: {
            all: 'બધા',
            tech: 'ટેક',
            politics: 'રાજકારણ',
            sports: 'રમતગમત',
            business: 'વ્યવસાય',
            entertainment: 'મનોરંજન',
            health: 'આરોગ્ય',
            science: 'વિજ્ઞાન',
            education: 'શિક્ષણ',
            lifestyle: 'જીવનશૈલી',
            world: 'વિશ્વ'
        },
        tabs: {
            feed: 'ફીડ',
            trending: 'ટ્રેન્ડિંગ',
            digest: 'દૈનિક સાર'
        },
        modal: {
            title: 'સમાચાર સંચાલન',
            newsTitle: 'સમાચાર શીર્ષક',
            summary: 'સારાંશ (૬૦ શબ્દો)',
            image: 'છબી URL',
            video: 'વિડિયો URL',
            category: 'શ્રેણી પસંદ કરો',
            language: 'ભાષા પસંદ કરો',
            publish: 'સમાચાર પ્રકાશિત કરો',
            success: 'સમાચાર સફળતાપૂર્વક પ્રકાશિત!',
            readMore: 'વધુ વાંચો',
            readLess: 'ઓછું વાંચો',
            commentPlaceholder: 'ટિપ્પણી લખો...'
        }
    },
    pa: {
        appTitle: 'ਕੁਇਕਲੀ',
        searchPlaceholder: 'ਖਬਰਾਂ ਖੋਜੋ...',
        categories: {
            all: 'ਸਾਰੇ',
            tech: 'ਤਕਨੀਕ',
            politics: 'ਰਾਜਨੀਤੀ',
            sports: 'ਖੇਡਾਂ',
            business: 'ਵਪਾਰ',
            entertainment: 'ਮਨੋਰੰਜਨ',
            health: 'ਸਿਹਤ',
            science: 'ਵਿਗਿਆਨ',
            education: 'ਸਿੱਖਿਆ',
            lifestyle: 'ਜੀਵਨਸ਼ੈਲੀ',
            world: 'ਸੰਸਾਰ'
        },
        tabs: {
            feed: 'ਫੀਡ',
            trending: 'ਟ੍ਰੈਂਡਿੰਗ',
            digest: 'ਰੋਜ਼ਾਨਾ ਸੰਖੇਪ'
        },
        modal: {
            title: 'ਖਬਰਾਂ ਦਾ ਪ੍ਰਬੰਧਨ',
            newsTitle: 'ਖਬਰ ਸਿਰਲੇਖ',
            summary: 'ਸੰਖੇਪ (60 ਸ਼ਬਦ)',
            image: 'ਤਸਵੀਰ URL',
            video: 'ਵੀਡੀਓ URL',
            category: 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ',
            language: 'ਭਾਸ਼ਾ ਚੁਣੋ',
            publish: 'ਖਬਰ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ',
            success: 'ਖਬਰ ਸਫਲਤਾਪੂਰਵਕ ਪ੍ਰਕਾਸ਼ਿਤ!',
            readMore: 'ਹੋਰ ਪੜ੍ਹੋ',
            readLess: 'ਘੱਟ ਪੜ੍ਹੋ',
            commentPlaceholder: 'ਟਿੱਪਣੀ ਲਿਖੋ...'
        }
    },
    or: {
        appTitle: 'କ୍ୱିକଲି',
        searchPlaceholder: 'ଖବର ଖୋଜନ୍ତୁ...',
        categories: {
            all: 'ସମସ୍ତ',
            tech: 'ଟେକ',
            politics: 'ରାଜନୀତି',
            sports: 'କ୍ରୀଡ଼ା',
            business: 'ବ୍ୟବସାୟ',
            entertainment: 'ମନୋରଞ୍ଜନ',
            health: 'ସ୍ୱାସ୍ଥ୍ୟ',
            science: 'ବିଜ୍ଞାନ',
            education: 'ଶିକ୍ଷା',
            lifestyle: 'ଜୀବନଶୈଳୀ',
            world: 'ବିଶ୍ୱ'
        },
        tabs: {
            feed: 'ଫିଡ୍',
            trending: 'ଟ୍ରେଣ୍ଡିଂ',
            digest: 'ଦୈନିକ ସଂକ୍ଷେପ'
        },
        modal: {
            title: 'ଖବର ପରିଚାଳନା',
            newsTitle: 'ଖବର ଶୀର୍ଷକ',
            summary: 'ସାରାଂଶ (୬୦ ଶବ୍ଦ)',
            image: 'ଛବି URL',
            video: 'ଭିଡିଓ URL',
            category: 'ବର୍ଗ ଚୟନ କରନ୍ତୁ',
            language: 'ଭାଷା ଚୟନ କରନ୍ତୁ',
            publish: 'ଖବର ପ୍ରକାଶନ କରନ୍ତୁ',
            success: 'ଖବର ସଫଳତାରେ ପ୍ରକାଶିତ!',
            readMore: 'ଅଧିକ ପଢ଼ନ୍ତୁ',
            readLess: 'କମ୍ ପଢ଼ନ୍ତୁ',
            commentPlaceholder: 'ମନ୍ତବ୍ୟ ଲେଖନ୍ତୁ...'
        }
    }
};

// Sample News (unchanged from previous)
const sampleNews = [
    {
        id: 1,
        title: {
            en: "AI Startup Raises $500M",
            hi: "एआई स्टार्टअप ने $500M जुटाए",
            ta: "AI ஸ்டார்ட்அப் $500M திரட்டியது",
            te: "AI స్టార్టప్ $500M సమీకరించింది",
            bn: "AI স্টার্টআপ $500M সংগ্রহ করেছে",
            mr: "AI स्टार्टअपने $500M उभारले",
            kn: "AI ಸ್ಟಾರ್ಟ್ಅಪ್ $500M ಸಂಗ್ರಹಿಸಿದೆ",
            ml: "AI സ്റ്റാർട്ടപ്പ് $500M സമാഹരിച്ചു",
            gu: "AI સ્ટાર્ટઅપે $500M એકત્ર કર્યા",
            pa: "AI ਸਟਾਰਟਅਪ ਨੇ $500M ਇਕੱਠੇ ਕੀਤੇ",
            or: "AI ଷ୍ଟାର୍ଟଅପ୍ $500M ସଂଗ୍ରହ କରିଛି"
        },
        summary: {
            en: "A leading AI startup secured $500M to develop healthcare solutions, focusing on diagnostics and personalized treatment.",
            hi: "एक प्रमुख एआई स्टार्टअप ने डायग्नोस्टिक्स और व्यक्तिगत उपचार पर ध्यान केंद्रित करते हुए $500M जुटाए।",
            ta: "முன்னணி AI ஸ்டார்ட்அப், நோயறிதல் மற்றும் தனிப்பயனாக்கப்பட்ட சிகிச்சையில் கவனம் செலுத்தி $500M திரட்டியது。",
            te: "ప్రముఖ AI స్టార్టప్ డయాగ్నోస్టిక్స్ మరియు వ్యక్తిగతీకరించిన చికిత్సపై దృష్టి సారించి $500M సమీకరించింది。",
            bn: "একটি শীর্ষস্থানীয় AI স্টার্টআপ ডায়াগনস্টিক্স এবং ব্যক্তিগতকৃত চিকিৎসার উপর ফোকাস করে $500M সংগ্রহ করেছে।",
            mr: "एक अग्रगण्य AI स्टार्टअपने डायग्नोस्टिक्स आणि वैयक्तिक उपचारांवर लक्ष केंद्रित करत $500M उभारले।",
            kn: "ಪ್ರಮುಖ AI ಸ್ಟಾರ್ಟ್ಅಪ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ ಮತ್ತು ವೈಯಕ್ತಿಕ ಚಿಕಿತ್ಸೆಯ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ $500M ಸಂಗ್ರಹಿಸಿದೆ।",
            ml: "ഒരു പ്രമുഖ AI സ്റ്റാർട്ടപ്പ് ഡയഗ്നോസ്റ്റിക്സിനും വ്യക്തിഗതവൽക്കരിച്ച ചികിത്സയ്ക്കും ശ്രദ്ധ കേന്ദ്രീകരിച്ച് $500M സമാഹരിച്ചു।",
            gu: "અગ્રણી AI સ્ટાર્ટઅપે ડાયગ્નોસ્ટિક્સ અને વ્યક્તિગત સારવાર પર ધ્યાન કેન્દ્રિત કરીને $500M એકત્ર કર્યા।",
            pa: "ਇੱਕ ਪ੍ਰਮੁੱਖ AI ਸਟਾਰਟਅਪ ਨੇ ਡਾਇਗਨੌਸਟਿਕਸ ਅਤੇ ਵਿਅਕਤੀਗਤ ਇਲਾਜ 'ਤੇ ਧਿਆਨ ਕੇਂਦਰਿਤ ਕਰਦੇ ਹੋਏ $500M ਇਕੱਠੇ ਕੀਤੇ।",
            or: "ଏକ ଅଗ୍ରଣୀ AI ଷ୍ଟାର୍ଟଅପ୍ ଡାଇଗ୍ନୋଷ୍ଟିକ୍ସ ଏବଂ ବ୍ୟକ୍ତିଗତ ଚିକିତ୍ସା ଉପରେ ଧ୍ୟାନ ଦେଇ $500M ସଂଗ୍ରହ କରିଛି।"
        },
        image: "https://images.unsplash.com/photo-1516321310766-61f6f7c0e96f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        category: "tech",
        timestamp: "2025-04-13 10:15",
        language: "en"
    },
    {
        id: 2,
        title: {
            en: "T20 World Cup Highlights",
            hi: "टी20 विश्व कप हाइलाइट्स",
            ta: "T20 உலகக் கோப்பை முக்கிய அம்சங்கள்",
            te: "T20 వరల్డ్ కప్ హైలైట్స్",
            bn: "T20 বিশ্বকাপ হাইলাইটস",
            mr: "T20 विश्वचषक हायलाइट्स",
            kn: "T20 ವಿಶ್ವಕಪ್ ಹೈಲೈಟ್ಸ್",
            ml: "T20 ലോകകപ്പ് ഹൈലൈറ്റുകൾ",
            gu: "T20 વર્લ્ડ કપ હાઇલાઇટ્સ",
            pa: "T20 ਵਿਸ਼ਵ ਕੱਪ ਹਾਈਲਾਈਟਸ",
            or: "T20 ବିଶ୍ୱକପ ହାଇଲାଇଟସ୍"
        },
        summary: {
            en: "India clinched a thrilling victory in the T20 World Cup semi-finals with a stunning performance.",
            hi: "भारत ने टी20 विश्व कप सेमीफाइनल में शानदार प्रदर्शन के साथ रोमांचक जीत हासिल की।",
            ta: "இந்தியா T20 உலகக் கோப்பை அரையிறுதியில் அற்புதமான ஆட்டத்துடன் பரபரப்பான வெற்றியைப் பெற்றது。",
            te: "భారత్ T20 వరల్డ్ కప్ సెమీఫైనల్స్‌లో అద్భుతమైన ప్రదర్శనతో ఉత్కంఠభరిత విజయాన్ని సాధించింది。",
            bn: "ভারত T20 বিশ্বকাপ সেমিফাইনালে অসাধারণ পারফরম্যান্সের সাথে রোমাঞ্চকর জয় পেয়েছে।",
            mr: "भारताने T20 विश्वचषक उपांत्य फेरीत अप्रतिम कामगिरीसह रोमांचक विजय मिळवला।",
            kn: "ಭಾರತವು T20 ವಿಶ್ವಕಪ್ ಸೆಮಿಫೈನಲ್‌ನಲ್ಲಿ ಅದ್ಭುತ ಪ್ರದರ್ಶನದೊಂದಿಗೆ ರೋಮಾಂಚಕ ಗೆಲುವು ಸಾಧಿಸಿತು।",
            ml: "ഇന്ത്യ T20 ലോകകപ്പ് സെമിഫൈനലിൽ അതിശയകരമായ പ്രകടനത്തോടെ ആവേശകരമായ വിജയം നേടി。",
            gu: "ભારતે T20 વર્લ્ડ કપ સેમિફાઇનલમાં અદ્ભુત પ્રદર્શન સાથે રોમાંચક વિજય મેળવ્યો।",
            pa: "ਭਾਰਤ ਨੇ T20 ਵਿਸ਼ਵ ਕੱਪ ਸੈਮੀਫਾਈਨਲ ਵਿੱਚ ਸ਼ਾਨਦਾਰ ਪ੍ਰਦਰਸ਼ਨ ਨਾਲ ਰੋਮਾਂਚਕ ਜਿੱਤ ਹਾਸਲ ਕੀਤੀ।",
            or: "ଭାରତ T20 ବିଶ୍ୱକପ ସେମିଫାଇନାଲରେ ଚମତ୍କାର ପ୍ରଦର୍ଶନ ସହିତ ରୋମାଞ୍ଚକର ବିଜୟ ହାସଲ କରିଛି।"
        },
        image: "https://images.unsplash.com/photo-1552673466-79ae37d6e9e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
        category: "sports",
        timestamp: "2025-04-13 09:45",
        language: "en"
    },
    {
        id: 3,
        title: {
            en: "New Exoplanet Discovered",
            hi: "नया एक्सोप्लैनेट खोजा गया",
            ta: "புதிய எக்ஸோபிளானட் கண்டுபிடிக்கப்பட்டது",
            te: "కొత్త ఎక్సోప్లానెట్ కనుగొనబడింది",
            bn: "নতুন এক্সোপ্ল্যানেট আবিষ্কৃত",
            mr: "नवीन एक्सोप्लॅनेट सापडला",
            kn: "ಹೊಸ ಎಕ್ಸೋಪ್ಲಾನೆಟ್ ಕಂಡುಹಿಡಿಯಲಾಗಿದೆ",
            ml: "പുതിയ എക്സോപ്ലാനറ്റ് കണ്ടെത്തി",
            gu: "નવું એક્સોપ્લેનેટ શોધાયું",
            pa: "ਨਵਾਂ ਐਕਸੋਪਲੈਨੇਟ ਖੋਜਿਆ ਗਿਆ",
            or: "ନୂଆ ଏକ୍ସୋପ୍ଲାନେଟ୍ ଆବିଷ୍କୃତ ହେଲା"
        },
        summary: {
            en: "Astronomers found a potentially habitable exoplanet orbiting a nearby star.",
            hi: "खगोलविदों ने एक निकटवर्ती तारे की परिक्रमा करने वाला संभावित रूप से रहने योग्य एक्सोप्लैनेट खोजा।",
            ta: "வானியலாளர்கள் அருகிலுள்ள நட்சத்திரத்தைச் சுற்றி வாழக்கூடிய எக்ஸோபிளானட்டைக் கண்டறிந்தனர்।",
            te: "ఖగోళ శాస్త్రవేత్తలు సమీప నక్షత్రం చుట్టూ నివసించగల ఎక్సోప్లానెట్‌ను కనుగొన్నారు।",
            bn: "জ্যোতির্বিজ্ঞানীরা একটি নিকটবর্তী নক্ষত্রের চারপাশে সম্ভাব্য বাসযোগ্য এক্সোপ্ল্যানেট খুঁজে পেয়েছেন।",
            mr: "खगोलशास्त्रज्ञांनी जवळच्या ताऱ्याभोवती संभाव्य राहण्यायोग्य एक्सोप्लॅनेट शोधला।",
            kn: "ಖಗೋಳಶಾಸ್ತ್ರಜ್ಞರು ಸಮೀಪದ ನಕ್ಷತ್ರವನ್ನು ಸುತ್ತುವ ಸಂಭಾವ್ಯ ವಾಸಯೋಗ್ಯ ಎಕ್ಸೋಪ್ಲಾನೆಟ್ ಕಂಡುಹಿಡಿದಿದ್ದಾರೆ।",
            ml: "നക്ഷത്രശാസ്ത്രജ്ഞർ അടുത്തുള്ള ഒരു നക്ഷത്രത്തെ ചുറ്റുന്ന ജനവാസയോഗ്യമായ എക്സോപ്ലാനറ്റ് കണ്ടെത്തി।",
            gu: "ખગોળશાસ્ત્રીઓએ નજીકના તારાની આસપાસ રહેવા યોગ્ય એક્સોપ્લેનેટ શોધ્યું।",
            pa: "ਤਾਰਾ ਵਿਗਿਆਨੀਆਂ ਨੇ ਨੇੜਲੇ ਤਾਰੇ ਦੇ ਚੱਕਰ ਵਿੱਚ ਸੰਭਾਵੀ ਰਹਿਣ ਯੋਗ ਐਕਸੋਪਲੈਨੇਟ ਲੱਭਿਆ।",
            or: "ଖଗୋଳ ବିଜ୍ଞାନୀମାନେ ନିକଟବର୍ତ୍ତୀ ତାରାକୁ ପରିକ୍ରମା କରୁଥିବା ସମ୍ଭାବ୍ୟ ବାସଯୋଗ୍ୟ ଏକ୍ସୋପ୍ଲାନେଟ୍ ଆବିଷ୍କାର କରିଛନ୍ତି।"
        },
        image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        category: "science",
        timestamp: "2025-04-13 08:30",
        language: "en"
    },
    {
        id: 4,
        title: {
            en: "Online Learning Platform Expands",
            hi: "ऑनलाइन शिक्षण मंच का विस्तार",
            ta: "ஆன்லைன் கல்வி தளம் விரிவடைகிறது",
            te: "ఆన్‌లైన్ లెర్నింగ్ ప్లాట్‌ఫారమ్ విస్తరిస్తుంది",
            bn: "অনলাইন লার্নিং প্ল্যাটফর্ম সম্প্রসারিত হয়",
            mr: "ऑनलाइन शिक्षण व्यासपीठाचा विस्तार",
            kn: "ಆನ್‌ಲೈನ್ ಲರ್ನಿಂಗ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ವಿಸ್ತರಿಸುತ್ತದೆ",
            ml: "ഓൺലൈൻ പഠന പ്ലാറ്റ്ഫോം വിപുലീകരിക്കുന്നു",
            gu: "ઓનલાઇન લર્નિંગ પ્લેટફોર્મનું વિસ્તરણ",
            pa: "ਆਨਲਾਈਨ ਸਿੱਖਣ ਪਲੇਟਫਾਰਮ ਦਾ ਵਿਸਤਾਰ",
            or: "ଅନଲାଇନ୍ ଶିକ୍ଷଣ ପ୍ଲାଟଫର୍ମ ବିସ୍ତାର କରୁଛି"
        },
        summary: {
            en: "A global edtech platform added new courses in AI and sustainability.",
            hi: "एक वैश्विक एडटेक मंच ने AI और स्थिरता में नए पाठ्यक्रम जोड़े।",
            ta: "ஒரு உலகளாவிய எட்டெக் தளம் AI மற்றும் நிலைத்தன்மையில் புதிய படிப்புகளைச் சேர்த்தது।",
            te: "ఒక గ్లోబల్ ఎడ్‌టెక్ ప్లాట్‌ఫారమ్ AI మరియు సస్టైనబిలిటీలో కొత్త కోర్సులను జోడించింది。",
            bn: "একটি বিশ্বব্যাপী এডটেক প্ল্যাটফর্ম AI এবং স্থায়িত্বের নতুন কোর্স যুক্ত করেছে।",
            mr: "जागतिक एडटेक व्यासपीठाने AI आणि शाश्वततेत नवीन अभ्यासक्रम जोडले।",
            kn: "ಜಾಗತಿಕ ಎಡ್‌ಟೆಕ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ AI ಮತ್ತು ಸುಸ್ಥಿರತೆಯಲ್ಲಿ ಹೊಸ ಕೋರ್ಸ್‌ಗಳನ್ನು ಸೇರಿಸಿದೆ।",
            ml: "ഒരു ആഗോള എഡ്‌ടെക് പ്ലാറ്റ്‌ഫോം AI-ലും സുസ്ഥിരതയിലും പുതിയ കോഴ്‌സുകൾ ചേർത്തു।",
            gu: "વૈશ્વિક એડટેક પ્લેટફોર્મે AI અને ટકાઉપણામાં નવા અભ્યાસક્રમો ઉમેર્યા।",
            pa: "ਇੱਕ ਗਲੋਬਲ ਐਡਟੈਕ ਪਲੇਟਫਾਰਮ ਨੇ AI ਅਤੇ ਸਸਟੇਨੇਬਿਲਟੀ ਵਿੱਚ ਨਵੇਂ ਕੋਰਸ ਸ਼ਾਮਲ ਕੀਤੇ।",
            or: "ଏକ ବିଶ୍ୱବ୍ୟାପୀ ଏଡ଼ଟେକ୍ ପ୍ଲାଟଫର୍ମ AI ଏବଂ ସ୍ଥାୟୀତ୍ୱରେ ନୂଆ ପାଠ୍ୟକ୍ରମ ଯୋଡ଼ିଛି।"
        },
        image: "https://images.unsplash.com/photo-1516321310766-61f6f7c0e96f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        category: "education",
        timestamp: "2025-04-13 07:00",
        language: "en"
    },
    {
        id: 5,
        title: {
            en: "Minimalist Living Trend Grows",
            hi: "मिनिमलिस्ट जीवनशैली का चलन बढ़ा",
            ta: "மினிமலிஸ்ட் வாழ்க்கை முறை போக்கு வளர்கிறது",
            te: "మినిమలిస్ట్ లివింగ్ ట్రెండ్ పెరుగుతోంది",
            bn: "মিনিমালিস্ট জীবনযাত্রার প্রবণতা বাড়ছে",
            mr: "मिनिमलिस्ट जीवनशैलीचा ट्रेंड वाढतोय",
            kn: "ಮಿನಿಮಲಿಸ್ಟ್ ಲಿವಿಂಗ್ ಟ್ರೆಂಡ್ ಬೆಳೆಯುತ್ತಿದೆ",
            ml: "മിനിമലിസ്റ്റ് ജീവിതശൈലി ട്രെൻഡ് വളരുന്നു",
            gu: "મિનિમલિસ્ટ જીવનશૈલીનો ટ્રેન્ડ વધી રહ્યો છે",
            pa: "ਮਿਨੀਮਲਿਸਟ ਜੀਵਨਸ਼ੈਲੀ ਦਾ ਰੁਝਾਨ ਵਧ ਰਿਹਾ ਹੈ",
            or: "ମିନିମାଲିଷ୍ଟ ଜୀବନଶୈଳୀ ଟ୍ରେଣ୍ଡ ବଢ଼ୁଛି"
        },
        summary: {
            en: "More people are embracing minimalist lifestyles, focusing on sustainability and simplicity.",
            hi: "अधिक लोग मिनिमलिस्ट जीवनशैली अपना रहे हैं, जो स्थिरता और सादगी पर केंद्रित है।",
            ta: "பலர் மினிமலிஸ்ட் வாழ்க்கை முறைகளை ஏற்றுக்கொள்கிறார்கள், நிலைத்தன்மை மற்றும் எளிமையில் கவனம் செலுத்துகிறார்கள்。",
            te: "ఎక్కువ మంది మినిమలిస్ట్ జీవనశైలిని స్వీకరిస్తున్నారు, సస్టైనబిలిటీ మరియు సరళతపై దృష్టి పెడుతున్నారు。",
            bn: "আরও বেশি মানুষ মিনিমালিস্ট জীবনযাত্রা গ্রহণ করছে, স্থায়িত্ব এবং সরলতার উপর ফোকাস করে।",
            mr: "अधिक लोक मिनिमलिस्ट जीवनशैली स्वीकारत आहेत, जी शाश्वतता आणि साधेपणावर केंद्रित आहे।",
            kn: "ಹೆಚ್ಚಿನ ಜನರು ಮಿನಿಮಲಿಸ್ಟ್ ಜೀವನಶೈಲಿಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತಿದ್ದಾರೆ, ಸುಸ್ಥಿರತೆ ಮತ್ತು ಸರಳತೆಯ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸುತ್ತಿದ್ದಾರೆ।",
            ml: "കൂടുതൽ ആളുകൾ മിനിമലിസ്റ്റ് ജീവിതശൈലി സ്വീകരിക്കുന്നു, സുസ്ഥിരതയും ലാളിത്യവും കേന്ദ്രീകരിക്കുന്നു।",
            gu: "વધુ લોકો મિનિમલિસ્ટ જીવનશૈલી અપનાવી રહ્યા છે, જે ટકાઉપણું અને સરળતા પર કેન્દ્રિત છે।",
            pa: "ਹੋਰ ਲੋਕ ਮਿਨੀਮਲਿਸਟ ਜੀਵਨਸ਼ੈਲੀ ਨੂੰ ਅਪਣਾ ਰਹੇ ਹਨ, ਜੋ ਸਸਟੇਨੇਬਿਲਟੀ ਅਤੇ ਸਾਦਗੀ 'ਤੇ ਕੇਂਦਰਿਤ ਹੈ।",
            or: "ଅଧିକ ଲୋକେ ମିନିମାଲିଷ୍ଟ ଜୀବନଶୈଳୀ ଗ୍ରହଣ କରୁଛନ୍ତି, ଯାହା ସ୍ଥାୟୀତ୍ୱ ଏବଂ ସରଳତା ଉପରେ କେନ୍ଦ୍ରୀତ।"
        },
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        category: "lifestyle",
        timestamp: "2025-04-13 06:30",
        language: "en"
    },
    {
        id: 6,
        title: {
            en: "Global Peace Summit Planned",
            hi: "वैश्विक शांति शिखर सम्मेलन की योजना",
            ta: "உலகளாவிய அமைதி உச்சி மாநாடு திட்டமிடப்பட்டது",
            te: "గ్లోబల్ పీస్ సమ్మిట్ ప్లాన్ చేయబడింది",
            bn: "বৈশ্বিক শান্তি সম্মেলন পরিকল্পিত",
            mr: "जागतिक शांती परिषदेची योजना",
            kn: "ಜಾಗತಿಕ ಶಾಂತಿ ಶೃಂಗಸಭೆ ಯೋಜನೆ",
            ml: "ആഗോള സമാധാന ഉച്ചകോടി ആസൂത്രണം ചെയ്തു",
            gu: "વૈશ્વિક શાંતિ સંમેલનનું આયોજન",
            pa: "ਗਲੋਬਲ ਪੀਸ ਸੰਮੇਲਨ ਦੀ ਯੋਜਨਾ",
            or: "ବିଶ୍ୱ ଶାନ୍ତି ଶିଖର ସମ୍ମେଳନ ଯୋଜନା କରାଯାଇଛି"
        },
        summary: {
            en: "World leaders plan a summit to address global conflicts and promote peace.",
            hi: "विश्व नेता वैश्विक संघर्षों को संबोधित करने और शांति को बढ़ावा देने के लिए एक शिखर सम्मेलन की योजना बना रहे हैं।",
            ta: "உலக தலைவர்கள் உலகளாவிய மோதல்களைத் தீர்க்கவும் அமைதியை மேம்படுத்தவும் ஒரு உச்சி மாநாட்டைத் திட்டமிடுகின்றனர்。",
            te: "ప్రపంచ నాయకులు గ్లోబల్ సంఘర్షణలను పరిష్కరించడానికి మరియు శాంతిని ప్రోత్సహించడానికి ఒక సమ్మిట్‌ను ప్లాన్ చేస్తున్నారు。",
            bn: "বিশ্ব নেতারা বিশ্বব্যাপী সংঘাত মোকাবেলা এবং শান্তি প্রচারের জন্য একটি সম্মেলন পরিকল্পনা করছেন।",
            mr: "जागतिक नेते जागतिक संघर्षांचे निराकरण करण्यासाठी आणि शांतीला चालना देण्यासाठी परिषदेची योजना आखत आहेत।",
            kn: "ವಿಶ್ವ ನಾಯಕರು ಜಾಗತಿಕ ಸಂಘರ್ಷಗಳನ್ನು ತೀರ್ಮಾನಿಸಲು ಮತ್ತು ಶಾಂತಿಯನ್ನು ಉತ್ತೇಜಿಸಲು ಶೃಂಗಸಭೆಯನ್ನು ಯೋಜಿಸುತ್ತಿದ್ದಾರೆ।",
            ml: "ലോക നേതാക്കൾ ആഗോള സംഘർഷങ്ങൾ പരിഹരിക്കാനും സമാധാനം പ്രോത്സാഹിപ്പിക്കാനും ഒരു ഉച്ചകോടി ആസൂത്രണം ചെയ്യുന്നു।",
            gu: "વિશ્વ નેતાઓ વૈશ્વિક સંઘર્ષોનું નિરાકરણ કરવા અને શાંતિને પ્રોત્સાહન આપવા માટે સંમેલનનું આયોજન કરી રહ્યા છે।",
            pa: "ਵਿਸ਼ਵ ਆਗੂ ਗਲੋਬਲ ਟਕਰਾਅ ਨੂੰ ਹੱਲ ਕਰਨ ਅਤੇ ਸ਼ਾਂਤੀ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨ ਲਈ ਇੱਕ ਸੰਮੇਲਨ ਦੀ ਯੋਜਨਾ ਬਣਾ ਰਹੇ ਹਨ।",
            or: "ବିଶ୍ୱ ନେତାମାନେ ବିଶ୍ୱବ୍ୟାପୀ ସଂଘର୍ଷର ସମାଧାନ କରିବା ଏବଂ ଶାନ୍ତିକୁ ପ୍ରୋତ୍ସାହନ ଦେବା ପାଇଁ ଏକ ଶିଖର ସମ୍ମେଳନର ଯୋଜନା କରୁଛନ୍ତି।"
        },
        image: "https://images.unsplash.com/photo-1522202176988-66273c2b6a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        category: "world",
        timestamp: "2025-04-13 05:00",
        language: "en"
    }
];

function App() {
    const [news, setNews] = useState(sampleNews);
    const [currentTab, setCurrentTab] = useState('feed');
    const [language, setLanguage] = useState(() => {
        // Load language from localStorage, default to 'en' if not set
        return localStorage.getItem('selectedLanguage') || 'en';
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Load sidebar state from localStorage, default to false if not set
        return localStorage.getItem('isSidebarOpen') === 'true';
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [page, setPage] = useState(1);

    // Save language to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('selectedLanguage', language);
    }, [language]);

    // Save sidebar state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('isSidebarOpen', isSidebarOpen);
    }, [isSidebarOpen]);

    // Handle dark mode toggle
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    // Infinite scroll for news feed
    useEffect(() => {
        const handleScroll = () => {
            if (currentTab === 'feed' && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setPage(prev => prev + 1);
                setNews(prev => [...prev, ...sampleNews]);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentTab]);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
        if (isModalOpen) setIsModalOpen(false);
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const openModal = () => {
        setIsModalOpen(true);
        setIsSidebarOpen(false);
    };

    const closeModal = () => setIsModalOpen(false);

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = sampleNews.filter(item =>
            item.title[language].toLowerCase().includes(query) ||
            item.summary[language].toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        setNews(query ? filtered : sampleNews);
        setCurrentTab('feed');
    };

    const filterNews = (cat) => {
        setCategory(cat);
        const filtered = cat === 'all' ? sampleNews : sampleNews.filter(item => item.category === cat);
        setNews(filtered);
        setIsSidebarOpen(false);
        setCurrentTab('feed');
    };

    const addNews = (newItem) => {
        const newNews = {
            id: news.length + 1,
            title: { [language]: newItem.title },
            summary: { [language]: newItem.summary },
            image: newItem.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            video: newItem.video || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            category: newItem.category,
            timestamp: new Date().toISOString(),
            language
        };
        setNews(prev => [newNews, ...prev]);
    };

    const renderNews = () => {
        if (currentTab === 'trending') return [news[0]];
        if (currentTab === 'digest') return news;
        return news;
    };

    return (
        <div>
            <Navbar
                toggleSidebar={toggleSidebar}
                toggleTheme={toggleTheme}
                openModal={openModal}
                isDarkMode={isDarkMode}
                translations={uiTranslations[language]}
            />
            <Sidebar
                isOpen={isSidebarOpen}
                filterNews={filterNews}
                activeCategory={category}
                translations={uiTranslations[language]}
            />
            <div className="container">
                <div className="top-bar">
                    <div className="select-wrapper">
                        <FontAwesomeIcon icon={faLanguage} className="select-icon" />
                        <select className="language-selector" onChange={(e) => changeLanguage(e.target.value)} value={language}>
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
                    <input
                        type="text"
                        className="search-bar"
                        placeholder={uiTranslations[language].searchPlaceholder}
                        onInput={handleSearch}
                        value={searchQuery}
                    />
                </div>
                <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} translations={uiTranslations[language]} />
                <div id="feed" className="news-feed" style={{ display: currentTab === 'feed' ? 'flex' : 'none' }}>
                    
                        <NewsCard  language={language} translations={uiTranslations[language]} />
                    
                </div>
                
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                addNews={addNews}
                language={language}
                translations={uiTranslations[language]}
            />
        </div>
    );
}

export default App;

