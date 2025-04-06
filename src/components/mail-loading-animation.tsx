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
                                    className="absolute right-0 top-1"
                                    style={{
                                        animation: `receiveHit ${animationDuration} infinite`,
                                    }}
                                >
                                    <MailIcon className="h-10 w-10 text-red-500" />
                                </div>
                
                {/* Impact lines that appear during hit */}
                <div 
                    className="absolute right-0 top-0"
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
                            className="absolute h-2 w-6 bg-orange-900 rounded-full right-0 top-7"
                            style={{ 
                                transformOrigin: "right center",
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
                        30% { transform: translateX(25px) rotate(0); }
                        40% { transform: translateX(20px) rotate(-15deg); }
                        60% { transform: translateX(20px) rotate(-10deg); }
                        75% { transform: translateX(10px) rotate(0); }
                        100% { transform: translateX(0) rotate(0); }
                    }
                    @keyframes receiveHit {
                        0%, 30% { transform: translateX(0) rotate(0); }
                        40% { transform: translateX(8px) rotate(15deg); }
                        50% { transform: translateX(12px) rotate(25deg); }
                        70% { transform: translateX(5px) rotate(10deg); }
                        100% { transform: translateX(0) rotate(0); }
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
                        0%, 35%, 70%, 100% { opacity: 0; }
                        40%, 55% { opacity: 1; }
                    }
                `}
            </style>
        </div>
    )
}
