
import React, { useState, useEffect } from 'react';

const PakAsianShopMockup: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
    const [phase, setPhase] = useState<'browse' | 'cart' | 'ordered' | 'delivered'>('browse');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const sequence = () => {
            setPhase('browse');
            setCartCount(0);
            setTimeout(() => {
                setPhase('cart');
                setCartCount(1);
            }, 3000);
            setTimeout(() => {
                setPhase('ordered');
            }, 5500);
            setTimeout(() => {
                setPhase('delivered');
            }, 8500);
            setTimeout(sequence, 13000);
        };
        sequence();
    }, []);

    return (
        <div className="pakasian-mockup w-full h-full bg-[#991b1b] relative overflow-hidden font-sans text-white select-none">
            {/* Header - Scaled Down */}
            <div className={`absolute top-0 left-0 right-0 h-8 md:h-10 bg-white/10 backdrop-blur-md border-b border-white/10 px-3 flex items-center justify-between z-30 transition-all duration-500 ${phase === 'ordered' || phase === 'delivered' ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
                <div className="flex items-center gap-1.5">
                    <div className="size-4 md:size-5 bg-white rounded-full flex items-center justify-center shrink-0">
                        <div className="size-2.5 md:size-3 bg-red-700 rounded-full"></div>
                    </div>
                    {!isMobile && <span className="text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">Pak Asian</span>}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <span className="material-symbols-outlined text-xs md:text-sm">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 size-2.5 md:size-3 bg-primary text-background-dark text-[6px] md:text-[8px] font-black rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <div className="h-5 md:h-6 px-2 md:px-3 bg-white text-red-800 text-[7px] md:text-[8px] font-black rounded-full flex items-center whitespace-nowrap">SHOP</div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center ${phase === 'browse' || phase === 'cart' ? 'scale-100 opacity-100 blur-0' : 'scale-95 opacity-20 blur-lg'}`}>
                {/* Background Decorative Rings */}
                <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
                    <div className="w-[120%] aspect-square border border-white/20 rounded-full scale-50"></div>
                </div>

                <div className={`flex w-full h-full items-center ${isMobile ? 'flex-col pt-12 px-4 text-center' : 'flex-row px-8 pt-8 text-left'}`}>
                    {/* Text Side - Font sizes significantly reduced */}
                    <div className={`${isMobile ? 'w-full' : 'w-1/2'} z-10 space-y-2 md:space-y-4`}>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 border border-white/20 rounded-full text-[6px] md:text-[8px] font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[8px] md:text-[10px]">rocket_launch</span>
                            New
                        </div>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl lg:text-3xl'} font-black leading-tight tracking-tighter`}>
                            Glorynuts <br /> <span className="text-white/80 font-medium italic">Coated Peanuts</span>
                        </h2>
                        <p className={`text-white/60 ${isMobile ? 'text-[8px] line-clamp-2' : 'text-[10px] lg:text-xs'} leading-relaxed max-w-[200px] md:max-w-xs`}>
                            Premium peanuts coated with our secret recipe blend for the perfect crunch.
                        </p>
                        <button className={`bg-white text-red-900 font-black rounded-full transition-all flex items-center justify-center gap-2 mx-auto md:mx-0 shadow-xl ${isMobile ? 'px-4 py-1.5 text-[8px]' : 'px-6 py-2 text-[10px]'} ${phase === 'cart' ? 'bg-primary' : ''}`}>
                            {phase === 'cart' ? 'IN CART' : 'ADD TO CART'}
                        </button>
                    </div>

                    {/* Product Side */}
                    <div className={`relative flex items-center justify-center h-full ${isMobile ? 'w-full mt-2 h-auto flex-grow pb-4' : 'w-1/2'}`}>
                        <div className={`relative transition-all duration-700 ${phase === 'cart' ? 'scale-105' : 'scale-100'}`}>
                            <div className={`${isMobile ? 'w-16 h-24' : 'w-32 lg:w-40 h-48 lg:h-56'} bg-white rounded-lg shadow-xl border-2 border-red-500/20 overflow-hidden relative rotate-2`}>
                                <div className="absolute inset-0 bg-red-600 flex flex-col items-center justify-center p-2">
                                    <div className="text-[5px] font-black uppercase text-white/50 mb-0.5">Pak Asian</div>
                                    <div className={`font-black text-white italic tracking-tighter leading-none mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>GLORY<br />NUTS</div>
                                    <div className="w-1/2 aspect-square rounded-full bg-white/20 border border-white/20"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUCCESS OVERLAY */}
            <div className={`absolute inset-0 z-40 flex items-center justify-center p-4 transition-all duration-700 ${phase === 'ordered' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-2xl w-full max-w-[240px]">
                    <span className="material-symbols-outlined text-primary text-3xl mb-2 animate-bounce">check_circle</span>
                    <h3 className="text-sm font-black mb-1">Success!</h3>
                    <p className="text-white/60 text-[8px] mb-3 uppercase font-bold">Order Received</p>
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 text-[9px]">
                        <div className="text-left">
                            <div className="text-white/30 font-bold uppercase text-[6px]">ID</div>
                            <div className="font-black text-primary">#PAF-82</div>
                        </div>
                        <div className="text-right">
                            <div className="text-white/30 font-bold uppercase text-[6px]">Cost</div>
                            <div className="font-black">$24.90</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DELIVERY VIEW */}
            <div className={`absolute inset-0 z-50 transition-all duration-700 ${phase === 'delivered' ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-8'}`}>
                <div className="w-full h-full bg-[#0a0f0d] p-3 md:p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-[10px] font-bold">Track Order</div>
                        <div className="px-2 py-0.5 bg-primary text-background-dark text-[7px] font-black rounded-full uppercase">Arrived</div>
                    </div>

                    <div className="flex-grow bg-white/5 rounded-xl border border-white/10 relative overflow-hidden mb-3">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 bg-primary rounded-full shadow-[0_0_15px_#38e07b]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,224,123,0.1),transparent_70%)]"></div>
                    </div>

                    <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10 flex items-center px-3 gap-2">
                        {/* CSS-only avatar: previously hot-linked a stock stranger's
                            photo into a mockup of a live client system. */}
                        <div aria-hidden="true" className="size-6 rounded-full bg-primary/15 shrink-0 border border-primary/20 flex items-center justify-center text-primary text-[8px] font-bold">
                            H
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-[8px] font-bold truncate">Haseeb (Rider)</div>
                            <div className="text-[6px] text-primary font-bold">Delivered</div>
                        </div>
                        <button className="ml-auto px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[7px] font-black">RATE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PakAsianShopMockup;
