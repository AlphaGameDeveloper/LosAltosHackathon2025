import * as React from "react"
import { Mail as MailIcon } from "lucide-react"

interface MailLoadingAnimationProps {
    message?: string;
    speed?: number; // Duration in seconds
}

export function MailLoadingAnimation({ 
        message = "Cutting spam from your inbox...",
        speed = 0.75
}: MailLoadingAnimationProps) {
        const animationDuration = `${1.2 / speed}s`;
        
        return (
                <div className="flex flex-col items-center justify-center h-[400px]">
                        <div className="relative w-40 h-24">
                                {/* Red envelope (spam) */}
                                <div 
                                    className="absolute right-12 top-1"
                                    style={{
                                        animation: `receiveHit ${animationDuration} infinite`,
                                    }}
                                >
                                    <MailIcon className="h-10 w-10 text-red-500" />
                                </div>
                
                {/* Impact lines that appear during hit */}
                <div 
                    className="absolute right-12 top-0"
                    style={{
                        animation: `showImpact ${animationDuration} infinite`,
                        opacity: 0,
                    }}
                >
                    <div className="absolute h-1 w-4 bg-yellow-400 rotate-45 right-6 top-6"></div>
                    <div className="absolute h-1 w-4 bg-yellow-400 -rotate-45 right-2 top-6"></div>
                    <div className="absolute h-1 w-3 bg-yellow-400 rotate-90 right-4 top-8"></div>
                </div>
                
                {/* Regular mail envelope with baton that hits the red one */}
                <div 
                    className="absolute left-0 top-0"
                    style={{
                        animation: `runAtSpam ${animationDuration} infinite`,
                    }}
                >
                    <div className="relative">
                        <MailIcon className="h-12 w-12 text-primary" />
                        {/* Baton */}
                        <div 
                            className="absolute h-2 w-6 bg-orange-900 rounded-full left-10 top-7"
                            style={{ 
                                transformOrigin: "left center",
                                animation: `swingBaton ${animationDuration} infinite`
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <p className="mt-12 text-sm text-muted-foreground">{message}</p>
            
            <style>
                {`
                    @keyframes runAtSpam {
                        0% { transform: translateX(0) rotate(0); }
                        10% { transform: translateX(-3px) rotate(-5deg); }
                        20% { transform: translateX(0) rotate(5deg); }
                        30% { transform: translateX(15px) rotate(0); }
                        40% { transform: translateX(12px) rotate(-15deg); }
                        60% { transform: translateX(12px) rotate(-10deg); }
                        75% { transform: translateX(6px) rotate(0); }
                        100% { transform: translateX(0) rotate(0); }
                    }
                    @keyframes receiveHit {
                        0%, 30% { transform: translateX(0) rotate(0); }
                        40% { transform: translateX(10px) rotate(20deg); }
                        45% { transform: translateX(25px) rotate(60deg) scale(0.9); }
                        50% { transform: translateX(60px) rotate(180deg) scale(0.8); }
                        55% { transform: translateX(100px) rotate(360deg) scale(0.6); }
                        60% { transform: translateX(150px) rotate(720deg) scale(0.4); }
                        65% { transform: translateX(200px) rotate(1080deg) scale(0.2); opacity: 0.7; }
                        70% { transform: translateX(250px) rotate(1440deg) scale(0.1); opacity: 0; }
                        75% { transform: translateX(-50px) rotate(0) scale(0); opacity: 0; }
                        85% { transform: translateX(-20px) rotate(0) scale(0.6); opacity: 0.7; }
                        100% { transform: translateX(0) rotate(0) scale(1); opacity: 1; }
                    }
                    @keyframes swingBaton {
                        0% { transform: rotate(0); }
                        20% { transform: rotate(-10deg); }
                        30% { transform: rotate(-30deg); }
                        40% { transform: rotate(30deg); }
                        60% { transform: rotate(20deg); }
                        75% { transform: rotate(0); }
                        100% { transform: rotate(0); }
                    }
                    @keyframes showImpact {
                        0%, 38%, 70%, 100% { opacity: 0; }
                        40%, 50% { opacity: 1; }
                    }
                `}
            </style>
        </div>
    )
}
