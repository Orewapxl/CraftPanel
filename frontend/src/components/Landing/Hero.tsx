import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react"

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-green-900"
        style={{background: "url('bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="pointer-events-none absolute inset-0"
            style={{
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgba(0,0,0,0.1)",
                 }}
            />
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



           <div className="absolute top-20 right-10 w-64 h-64 bg-lime-500/5 rounded-none blur-2xl animate-pulse"></div>
           <div
                className="absolute bottom-20 left-10 w-64 h-64 bg-lime-500/3 rounded-none blur-2xl animate-pulse"
                style={{ animationDelay: "0.7s" }}
            ></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
                style={{ animationDelay: "0.5s" }}
            >

            <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-none bg-lime-500/10 border-2 border-lime-500 mb-6 transition-all duration-700 ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >

            <Zap className="w-5 h-5 text-lime-500" />
            <span className="text-lime-500 font-medium">New</span>
        </div>

        <h1
            className={`text-6xl md:text-7xl font-black text-white mb-6 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{letterSpacing: "0.05em"}}
          >
            Minecraft Afk Bot
            </h1>

        <p
          className={`text-lg text-slate-100 mb-12 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Check out our packages below. Manage your bots successfully with the most powerful bot management tool!
        </p>


        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-400 ${ isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" }`}>
            <button className="px-8 py-3 border-2 border-lime-500 hover:border-lime-400 text-lime-400 font-bold rounded-none transition-all hover:bg-lime-500/10" >   
            discord
            <ArrowRight className="w-4 h-4 ml-2 inline" />
            </button>
          <button className="group px-8 py-3 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300
          hover:to-lime-400 text-slate-950 font-bold rounded-none transition-all hover:shadow-x1
          hover:show-lime-500/50 flex items-center justify-center gap-2 border-2 border-lime-300">
          Start Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
            </div>
         </div>
        </section>

    )
}

            