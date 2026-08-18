import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import TodoSideBar from "@/components/index-todo-pack"
import { Form, router } from "@inertiajs/react"
import { addlist, deletelist } from "@/routes/todolist"
import todopack from '../routes/todopack/index';
import IndexTodoList from "@/components/index-todo-list"

export default function Mainpage(
    {todopackindex, todolistindex}: {
        todopackindex: Array<{id: number, title: string}>,
        todolistindex: Array<{id: number, todopack: Array<{id: number, desc: string, idpack: number, checked: boolean, created_at: string, updated_at: string}>}>}) {

    function AddTodoList() {
        
    }

    return (
        <Sheet>
        <div className="relative flex w-full overflow-hidden">
            <img 
            src="/photos/4476858ae6575574ee238ebddec16dfed5b3699ac9467c51e8b42fab0429e736/cloudpict04.jpg" 
            className="fixed inset-0 z-0 h-full w-full object-cover object-center">
            </img>
            <main className="w-full">
                <div className="relative z-10 flex justify-between items-center border border-white rounded-2xl h-14.25 w-full pl-5 pr-5 mt-2.5">
                    <h2 className="font-happy-markers text-[23px]">Lorem Ipsum</h2>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                </div>
                <div id="todo-box" className="relative w-full z-10 flex-col mt-7 pl-2.5 pr-2.5">
                    {/* display all todo list in here*/}
                    {todolistindex.map(element => 
                        <IndexTodoList arrtodopack={element.todopack}/>
                    )}
                    <div id='todo-list-add' className="flex h-17">
                        <div className="flex w-17 h-17 mr-3 justify-center items-center">
                            <input type="checkbox" disabled className="w-14 h-14"></input>
                        </div>
                        {/*add new list in here*/}
                        <div className="flex h-17 w-full items-center pr-3">
                            <Form action={addlist.url()} method="post">
                                {({processing, errors}) => (
                                    <input
                                    name="desc"
                                    placeholder="<add new list>" 
                                    disabled={processing}
                                    className="font-happy-markers font-stretch-extra-condensed items-center text-orange-300 placeholder:text-orange-300 border border-orange-300 rounded-2xl">
                                    </input>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <TodoSideBar todopacklist={todopackindex}/>
        </Sheet>
    )
}