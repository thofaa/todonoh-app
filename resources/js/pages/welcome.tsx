import { useEffect, useRef, useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import TodoSideBar from "@/components/index-todo-pack"
import { config, Form, router } from "@inertiajs/react"
import { addlist, deletelist } from "@/routes/todolist"
import todopack from '../routes/todopack/index';
import IndexTodoList from "@/components/index-todo-list"
import MainNavBar from "@/components/mainnavbar"
import { gsap } from "gsap"

export default function Mainpage(
    {todopackindex, todolistindex=[]}: {
        todopackindex: Array<{id: number, title: string}>,
        todolistindex?: Array<{id: number, todopack: Array<{id: number, desc: string, idpack: number, checked: boolean, created_at: string, updated_at: string}>}>}) {
            //todolistindex will have null element in first load page, and vice verca.
            const headerRef = useRef<HTMLDivElement | null>(null);
        
            useEffect(() => {
                if (!headerRef.current) return;

                const tween = gsap.fromTo(
                    headerRef.current,
                    { y: -30, opacity: 0.25 },
                    { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' },
                );
                return () => { tween.kill(); };
            }, []);

            return (
                <Sheet>
                <div className="relative flex w-full overflow-hidden">
                    <img 
                    src="/cloudpict04.jpg" 
                    className="fixed inset-0 z-0 h-full w-full object-cover object-[0%_75%]">
                    </img>
                    <main className="w-full">
                        <MainNavBar todopackindex={todopackindex} todolistindex={todolistindex}/>
                        <div id="todo-box" className="relative w-full z-10 flex-col mt-7 pl-2.5 pr-2.5">
                            {/* display all todo list in here*/}
                            {todolistindex.length > 0
                                ? 
                                <>
                                    {todolistindex.map(element =>
                                        <IndexTodoList arrtodopack={element.todopack} idpack={element.id}/>
                                    )}
                                </>
                                : ( 
                                    <div ref={headerRef}>
                                        <p className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-orange-300 text-center text-2xl mt-13">
                                        Hello!
                                        </p>
                                        <p className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-orange-300 text-center text-2xl mt-3">
                                        Select a pack from the sidebar
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </main>
                </div>
                <TodoSideBar todopacklist={todopackindex}/>
                </Sheet>
            )
        }