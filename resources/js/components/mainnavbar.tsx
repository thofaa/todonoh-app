import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MainNavBar(
    {todopackindex, todolistindex=[]} : {
    todopackindex: Array<{id: number, title: string}>,
    todolistindex? : Array<{id: number, todopack: Array<{id: number, desc: string, idpack: number, checked: boolean, created_at: string, updated_at: string}>}>}) {
        const headerRef = useRef<HTMLDivElement | null>(null);
        
        useEffect(() => {
            if (!headerRef.current) return;

            const tween = gsap.fromTo(
                headerRef.current,
                { y: -26, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            );
            return () => { tween.kill(); };
        }, []);

        return (
            <div ref={headerRef} className="relative z-10 flex items-center border border-white rounded-2xl h-14.25 w-full pl-5 pr-5 mt-2.5">
                <img src="/favicon.svg" className="w-9 h-9 mr-2.5"></img>
                <h2 className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-[30px]">{todopackindex.find((pack) => pack.id === todolistindex?.[0]?.id)?.title ?? "TODONOH..."}</h2>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-auto h-9 w-9">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
            </div>
        )
    }