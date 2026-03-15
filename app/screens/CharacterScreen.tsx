import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Check, Palette, Sparkles, Shirt } from 'lucide-react';

import { Character } from '../components/Character';

// Import clothing assets
import greenHoodie from '../../assets/clothes/t shirt/character_green_hoodie.png';
import purpleShirt from '../../assets/clothes/t shirt/character_purple_shirt.png';
import redTshirt from '../../assets/clothes/t shirt/character_red_tshirt.png';
import stripedShirt from '../../assets/clothes/t shirt/character_striped_shirt.png';
import chefSet from '../../assets/clothes/set/character_chef_set.png';
import coolLook from '../../assets/clothes/set/character_cool_look.png';
import pirateHat from '../../assets/clothes/set/character_pirate_hat.png';
import royalSet from '../../assets/clothes/set/character_royal_set.png';
import vacationLook from '../../assets/clothes/set/character_vacation_look.png';
import vikingHat from '../../assets/clothes/set/character_viking_hat.png';
import winterSet from '../../assets/clothes/set/character_winter_set.png';
import wizardSet from '../../assets/clothes/set/character_wizard_set.png';


interface Item {
    id: string;
    name: string;
    image: string;
    type: 'hat' | 'shirt' | 'set' | 'accessory' | 'shoes' | 'skin' | 'model';
    price?: number;
}

export const CLOTHING_ITEMS: Item[] = [
    // T-Shirts
    { id: 'green_hoodie', name: 'הודי ירוק', image: greenHoodie, type: 'shirt' },
    { id: 'purple_shirt', name: 'חולצה סגולה', image: purpleShirt, type: 'shirt' },
    { id: 'red_tshirt', name: 'חולצה אדומה', image: redTshirt, type: 'shirt' },
    { id: 'striped_shirt', name: 'חולצת פסים', image: stripedShirt, type: 'shirt' },
    // Sets
    { id: 'chef_set', name: 'סט שף', image: chefSet, type: 'set' },
    { id: 'cool_look', name: 'לוק קריר', image: coolLook, type: 'set' },
    { id: 'royal_set', name: 'סט מלכותי', image: royalSet, type: 'set' },
    { id: 'vacation_look', name: 'לוק חופשה', image: vacationLook, type: 'set' },
    { id: 'winter_set', name: 'סט חורף', image: winterSet, type: 'set' },
    { id: 'wizard_set', name: 'סט קוסם', image: wizardSet, type: 'set' },
    // Hats
    { id: 'pirate_hat', name: 'כובע פיראט', image: pirateHat, type: 'hat' },
    { id: 'viking_hat', name: 'כובע ויקינג', image: vikingHat, type: 'hat' },
];


export const CharacterScreen = () => {
    const { t, characterState, updateCharacterState, isRTL, darkMode } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('skin');
    
    // Use the current character state instead of resetting
    const [localState, setLocalState] = useState(() => ({
        ...characterState,
    }));

    const tabs = [
        { id: 'skin', icon: Palette, label: "צבע" },
        { id: 'shirt', icon: Shirt, label: "חולצות" },
        { id: 'set', icon: Shirt, label: "סטים" },
        { id: 'hat', icon: Shirt, label: "כובעים" },
    ];


    const SKIN_COLORS: Item[] = [
        { id: 'normal', name: 'רגיל', image: '', type: 'skin' },
        { id: 'blue', name: 'כחול', image: '', type: 'skin' },
        { id: 'green', name: 'ירוק', image: '', type: 'skin' },
        { id: 'red', name: 'אדום', image: '', type: 'skin' },
        { id: 'purple', name: 'סגול', image: '', type: 'skin' },
        { id: 'orange', name: 'כתום', image: '', type: 'skin' },
        { id: 'yellow', name: 'צהוב', image: '', type: 'skin' },
        { id: 'pink', name: 'ורוד', image: '', type: 'skin' },
        { id: 'cyan', name: 'טורקיז', image: '', type: 'skin' },
    ];


    const handleSelect = (item: Item) => {
        if (item.type === 'skin') {
            setLocalState((prev: any) => ({
                ...prev,
                skin: item.id
            }));
        } else if (item.type === 'shirt' || item.type === 'set' || item.type === 'hat' || item.type === 'accessory') {
            setLocalState((prev: any) => ({
                ...prev,
                [item.type]: item.id
            }));
        }
    };

    const handleSave = () => {
        updateCharacterState(localState);
        navigate(-1);
    };

    const filteredItems = activeTab === 'skin' ? SKIN_COLORS : CLOTHING_ITEMS.filter(item => item.type === activeTab);

    // Map skin IDs to actual colors for the UI circles
    const SKIN_UI_COLORS: Record<string, string> = {
        normal: 'bg-[#FFDBAC]',
        blue: 'bg-blue-400',
        green: 'bg-green-400',
        red: 'bg-red-400',
        purple: 'bg-purple-400',
        orange: 'bg-orange-400',
        yellow: 'bg-yellow-400',
        pink: 'bg-pink-400',
        cyan: 'bg-cyan-400',
    };

    return (
        <MobileContainer className="min-h-screen relative flex flex-col"
        >

            {/* Header */}
            <div className="flex items-center justify-between p-6 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className={`p-3 rounded-full shadow-lg transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-500'}`}
                >
                    <ChevronLeft className={isRTL ? 'rotate-180 text-gray-500' : 'text-gray-500'} size={24} />
                </button>
                <h1 className="text-2xl font-black text-black drop-shadow-md">מעצב דמות</h1>
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors font-black text-sm flex items-center gap-2"
                >
                    <Check size={20} />
                    <span>שמור</span>
                </button>
            </div>

            {/* Character Preview */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">

                <div className="relative z-10 transform scale-[1.7] cursor-ns-resize bg-transparent">
                    <Character 
                        state={localState} 
                        width={240} 
                        clothingImages={{
                            shirt: CLOTHING_ITEMS.find(item => item.id === localState.shirt)?.image,
                            set: CLOTHING_ITEMS.find(item => item.id === localState.set)?.image,
                            hat: CLOTHING_ITEMS.find(item => item.id === localState.hat)?.image,
                        }}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className={`rounded-t-[4rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.2)] p-8 pb-14 min-h-[400px] ${darkMode ? 'bg-slate-700' : 'bg-white'}`}>
                <div className="flex justify-between mb-8 overflow-x-auto no-scrollbar gap-3 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center p-4 rounded-[2rem] transition-all min-w-[80px] ${activeTab === tab.id
                                ? 'bg-pink-100 text-pink-600 scale-110 shadow-lg shadow-pink-100'
                                : `${darkMode ? 'bg-slate-600 text-gray-400' : 'bg-gray-50 text-gray-400'} opacity-60`
                                }`}
                        >
                            <tab.icon size={28} />
                            <span className="text-[11px] mt-2 font-black tracking-tight whitespace-nowrap uppercase">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="pr-1">
                    <AnimatePresence mode="wait">
                        {filteredItems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`flex flex-col items-center justify-center py-16 rounded-[3rem] border-4 border-dashed ${darkMode ? 'text-gray-400 bg-slate-600 border-slate-500' : 'text-gray-400 bg-gray-50 border-gray-100'}`}
                            >
                                <div className={`p-4 rounded-3xl shadow-sm mb-4 ${darkMode ? 'bg-slate-700' : 'bg-white'}`}>
                                    <Sparkles className="text-pink-300" size={32} />
                                </div>
                                <p className="text-2xl font-black tracking-tight text-gray-400 uppercase italic">בקרוב מאוד!</p>
                                <p className="text-xs font-bold text-gray-300 mt-2 px-8 text-center leading-relaxed">אנחנו מעצבים פריטים חדשים שיתאימו בדיוק לסגנון שלך. הישארו מעודכנים!</p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {filteredItems.map((item) => {
                                    const isEquipped = localState[item.type] === item.id;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            whileTap={{ scale: 0.93 }}
                                            onClick={() => handleSelect(item)}
                                            className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${isEquipped
                                                ? 'border-pink-400 bg-pink-50 shadow-md'
                                                : 'border-slate-100 bg-slate-50 hover:border-pink-200'
                                                }`}
                                        >
                                            {item.type === 'skin' ? (
                                                <div className={`w-10 h-10 rounded-full shadow-inner border-2 border-white ${SKIN_UI_COLORS[item.id] || 'bg-gray-200'}`} />
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center">
                                                    <img src={item.image} alt="" className="max-w-full max-h-full object-contain" />
                                                </div>
                                            )}
                                            <p className="text-[9px] text-gray-500 font-bold mt-2 text-center leading-tight">{item.name}</p>

                                            {/* Equipped badge */}
                                            {isEquipped && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-sm"
                                                >
                                                    <Check size={8} className="text-white" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MobileContainer>
    );
};
