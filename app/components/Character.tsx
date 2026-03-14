import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Character Assets
import baseV2 from '../../assets/character/base_v2.png';
import capImg from '../../assets/character/cap.jpeg';
import jerseyImg from '../../assets/character/jersey.jpeg';
import shadesImg from '../../assets/character/shades.jpeg';

interface CharacterProps {
    state: {
        skin: string;
        hat: string;
        shirt: string;
        set: string;
        accessory: string;
        hatPos?: { x: number; y: number };
        shirtPos?: { x: number; y: number };
        setPos?: { x: number; y: number };
        accessoryPos?: { x: number; y: number };
    };
    width?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    animate?: boolean;
    clothingImages?: {
        shirt?: string;
        set?: string;
        hat?: string;
        accessory?: string;
    };
}

const SIZE_PX: Record<string, number> = {
    sm: 128,
    md: 192,
    lg: 256,
    xl: 320,
};

export const Character = ({
    state,
    size = 'md',
    width,
    className = '',
    animate = false,
    clothingImages = {},
}: CharacterProps) => {
    const px = width ?? SIZE_PX[size] ?? 192;
    const spring = { type: 'spring', damping: 20, stiffness: 300 } as const;

    // Helper function to get clothing image URL
    const getClothingImageUrl = (type: string, id: string): string | undefined => {
        if (!id || id === 'none') return undefined;
        
        const imageMap: Record<string, Record<string, string>> = {
            shirt: {
                'green_hoodie': '../../assets/clothes/t shirt/character_green_hoodie.png',
                'purple_shirt': '../../assets/clothes/t shirt/character_purple_shirt.png',
                'red_tshirt': '../../assets/clothes/t shirt/character_red_tshirt.png',
                'striped_shirt': '../../assets/clothes/t shirt/character_striped_shirt.png',
            },
            set: {
                'chef_set': '../../assets/clothes/set/character_chef_set.png',
                'cool_look': '../../assets/clothes/set/character_cool_look.png',
                'royal_set': '../../assets/clothes/set/character_royal_set.png',
                'vacation_look': '../../assets/clothes/set/character_vacation_look.png',
                'winter_set': '../../assets/clothes/set/character_winter_set.png',
                'wizard_set': '../../assets/clothes/set/character_wizard_set.png',
            },
            hat: {
                'pirate_hat': '../../assets/clothes/set/character_pirate_hat.png',
                'viking_hat': '../../assets/clothes/set/character_viking_hat.png',
            }
        };
        
        return imageMap[type]?.[id] || undefined;
    };

    const getHueRotate = (skin: string) => {
        switch (skin) {
            case 'normal': return 'none';
            case 'tan': return 'sepia(0.3) saturate(1.2) brightness(0.95)';
            case 'blue': return 'none'; // Base is blue
            case 'green': return 'hue-rotate(120deg) saturate(1.5) brightness(1.1)';
            case 'red': return 'hue-rotate(240deg) saturate(1.5) brightness(1.1)';
            case 'purple': return 'hue-rotate(300deg) saturate(1.5) brightness(1.1)';
            case 'orange': return 'hue-rotate(30deg) saturate(1.5) brightness(1.1)';
            case 'yellow': return 'hue-rotate(60deg) saturate(1.5) brightness(1.1)';
            case 'pink': return 'hue-rotate(330deg) saturate(1.5) brightness(1.1)';
            case 'cyan': return 'hue-rotate(180deg) saturate(1.5) brightness(1.1)';
            default: return 'none';
        }
    };

    const idleVariants = {
        animate: {
            y: [0, -4, 0] as any,
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            className={`relative inline-block ${className}`}
            style={{ width: px }}
        >
            {/* ── Base Character ─────────────────────────────────── */}
            <img
                src={baseV2}
                alt="Character"
                className="block w-full h-auto relative z-0 transition-all duration-500"
                style={{ 
                    filter: getHueRotate(state.skin || 'normal'),
                    background: 'transparent',
                    backgroundColor: 'transparent'
                }}
                draggable={false}
            />

            {/* ── Sets ─────────────────────────────────────── */}
            <AnimatePresence>
                {state.set !== 'none' && (clothingImages.set || getClothingImageUrl('set', state.set)) && (
                    <motion.img
                        key="set"
                        src={clothingImages.set || getClothingImageUrl('set', state.set)}
                        alt=""
                        className="absolute z-20"
                        style={{
                            width: '100%',
                            top: '0%',
                            left: '0%',
                            height: 'auto',
                            mixBlendMode: 'normal',
                            filter: getHueRotate(state.skin || 'normal'),
                            opacity: 1,
                            x: state.setPos?.x || 0,
                            y: state.setPos?.y || 0
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 1, scale: 1 }}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Jersey / Shirt ────────────────────────────────── */}
            <AnimatePresence>
                {state.shirt !== 'none' && (clothingImages.shirt || getClothingImageUrl('shirt', state.shirt)) && (
                    <motion.img
                        key="shirt"
                        src={clothingImages.shirt || getClothingImageUrl('shirt', state.shirt)}
                        alt=""
                        className="absolute z-20"
                        style={{
                            width: '100%',
                            top: '0%',
                            left: '0%',
                            height: 'auto',
                            mixBlendMode: 'normal',
                            filter: getHueRotate(state.skin || 'normal'),
                            opacity: 1,
                            x: state.shirtPos?.x || 0,
                            y: state.shirtPos?.y || 0
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 1, scale: 1 }}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Cap / Hat ─────────────────────────────────────── */}
            <AnimatePresence>
                {state.hat !== 'none' && (clothingImages.hat || getClothingImageUrl('hat', state.hat)) && (
                    <motion.img
                        key="hat"
                        src={clothingImages.hat || getClothingImageUrl('hat', state.hat)}
                        alt=""
                        className="absolute z-20"
                        style={{
                            width: '100%',
                            top: '0%',
                            left: '0%',
                            height: 'auto',
                            mixBlendMode: 'normal',
                            filter: getHueRotate(state.skin || 'normal'),
                            opacity: 1,
                            x: state.hatPos?.x || 0,
                            y: state.hatPos?.y || 0
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 1, scale: 1 }}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Shades / Accessory ────────────────────────────── */}
            <AnimatePresence>
                {state.accessory !== 'none' && (clothingImages.accessory || getClothingImageUrl('accessory', state.accessory)) && (
                    <motion.img
                        key="accessory"
                        src={clothingImages.accessory || getClothingImageUrl('accessory', state.accessory)}
                        alt=""
                        className="absolute z-20"
                        style={{
                            width: '100%',
                            top: '0%',
                            left: '0%',
                            height: 'auto',
                            mixBlendMode: 'normal',
                            filter: getHueRotate(state.skin || 'normal'),
                            opacity: 1,
                            x: state.accessoryPos?.x || 0,
                            y: state.accessoryPos?.y || 0
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 1, scale: 1 }}
                        transition={spring}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
