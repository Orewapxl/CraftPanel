import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react"

export default function Hero() {
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-900">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-b from-lime-500/10 via-transparent to-transparent"></div>
                <svg className="absolute w-full h-full" >
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                        </pattern>
                    </defs>
                    <rect width="%100" height="%100" fill="url(#grid)" className="text-lime-500"></rect> 
                </svg>
            </div>


           <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80 opacity-50 pointer-events-none"></div>
           <div
                className="absolute bottom-20 left-10 w-64 h-64 bg-lime-500/3 rounded-none blur-2xl animate-pulse"
                style={{ animationDelay: "0.7s" }}
            ></div>

            <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/3 rounded-none blur-2xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
            ></div>



            <div className=""
                    
       </section>

    )
}

            