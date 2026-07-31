import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const [hovered, setHovered] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const checkTheme = () => {
            setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
        };
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
            return;
        }

        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };

        const addHover = () => setHovered(true);
        const removeHover = () => setHovered(false);
        const hide = () => setHidden(true);
        const show = () => setHidden(false);

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseleave', hide);
        document.addEventListener('mouseenter', show);

        const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        return () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseleave', hide);
            document.removeEventListener('mouseenter', show);
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Outer ring — spring-lagged */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                    borderRadius: '9999px',
                    border: theme === 'light' ? '1.5px solid rgba(18, 32, 23, 0.3)' : '1.5px solid rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
                animate={{
                    width: hovered ? 56 : 32,
                    height: hovered ? 56 : 32,
                    opacity: hidden ? 0 : 0.65,
                    borderColor: hovered ? '#38e07b' : (theme === 'light' ? 'rgba(18, 32, 23, 0.3)' : 'rgba(255,255,255,0.4)'),
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            />

            {/* Inner dot — instant */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 6,
                    height: 6,
                    borderRadius: '9999px',
                    backgroundColor: '#38e07b',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
                animate={{ opacity: hidden ? 0 : 1 }}
            />
        </>
    );
};

export default CustomCursor;
