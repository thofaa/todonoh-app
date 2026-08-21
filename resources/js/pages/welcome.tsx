import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import TodoSideBar from "@/components/index-todo-pack"
import { config, Form, router } from "@inertiajs/react"
import { addlist, deletelist } from "@/routes/todolist"
import todopack from '../routes/todopack/index';
import IndexTodoList from "@/components/index-todo-list"
import { getbackground } from "@/routes"

export default function Mainpage(
    {todopackindex, todolistindex=[]}: {
        todopackindex: Array<{id: number, title: string}>,
        todolistindex?: Array<{id: number, todopack: Array<{id: number, desc: string, idpack: number, checked: boolean, created_at: string, updated_at: string}>}>}) {

        const [todolistnew, settodolistnew] = useState("")

        return (
            <Sheet>
            <div className="relative flex w-full overflow-hidden">
                <img 
                src={getbackground.url('4476858ae6575574ee238ebddec16dfed5b3699ac9467c51e8b42fab0429e736')} 
                className="fixed inset-0 z-0 h-full w-full object-cover object-[0%_75%]">
                </img>
                <main className="w-full">
                    <div className="relative z-10 flex items-center border border-white rounded-2xl h-14.25 w-full pl-5 pr-5 mt-2.5">
                        <img src="/favicon.svg" className="w-9 h-9 mr-2.5"></img>
                        <h2 className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-[30px]">TODONOH...</h2>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-auto h-9 w-9">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                    </div>
                    <div id="todo-box" className="relative w-full z-10 flex-col mt-7 pl-2.5 pr-2.5">
                        {/* display all todo list in here*/}
                        {todolistindex?.length > 0
                            ? 
                            <>
                                {todolistindex.map(element =>
                                    <IndexTodoList arrtodopack={element.todopack}/>
                                )}
                                <div id='todo-list-add' className="flex h-11 mt-5">
                                    <div>
                                        <input type="checkbox" disabled className="w-11 h-11 text-teal-600 bg-neutral-secondary-medium border-default-medium rounded-xs focus:ring-teal-500 dark:focus:ring-teal-600 ring-offset-neutral-primary focus:ring-2"></input>
                                    </div>
                                    {/*add new list in here*/}
                                    <div className="flex items-center ml-2">
                                        <Form action={addlist.url()} method="post" resetOnSuccess>
                                            {({processing, errors}) => (
                                                <>
                                                    <input type="hidden" name="idpack" value={todolistindex[0]?.id ?? ""}></input>
                                                    <input
                                                    name="desc"
                                                    value={todolistnew}
                                                    onChange={(e) => settodolistnew(e.target.value)}
                                                    maxLength={250}
                                                    placeholder="<add new list>"
                                                    disabled={processing}
                                                    onKeyDown={(e) => {if (e.key === "Enter") {requestAnimationFrame(() => settodolistnew(""))}}}
                                                    className="[-webkit-text-stroke:0.3px_black] font-happy-markers font-stretch-extra-condensed items-center text-orange-300 placeholder:text-orange-300 border border-orange-300 rounded-2xl">
                                                    </input>
                                                </>
                                            )}
                                        </Form>
                                    </div>
                                </div>
                            </>
                            : ( 
                                <>
                                    <p className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-orange-300 text-center text-2xl mt-13">
                                    Hello!
                                    </p>
                                    <p className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-orange-300 text-center text-2xl mt-3">
                                    Select a pack from the sidebar
                                    </p>
                                </>
                            )
                        }
                    </div>
                </main>
            </div>
            <TodoSideBar todopacklist={todopackindex}/>
            </Sheet>
        )
    }