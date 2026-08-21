import { SheetContent, SheetTitle } from "./ui/sheet";
import AddTodoPack from "./add-todo-pack";
import { router, usePage } from '@inertiajs/react';
import { indexlist } from "@/routes/todolist";
import { Trash2, Pencil } from "lucide-react"
import { useState } from "react";
import { deletepack, updatepack } from "@/routes/todopack";

export default function TodoSideBar({todopacklist=[]}: {todopacklist?: Array<{id: number, title: string}>}) {
    const [OnEdit, setOnEdit] = useState<number | null>(null)
    const [NewTitle, setNewTitle] = useState("")

    const {url} = usePage()

    function GetTodoList(id: number) {
        router.get(indexlist.url({id}))
    }

    function DeleteTodoPack(id: number) {
        router.post(deletepack.url(), {id, url})
    }

    function UpdateTitle(id: number, newtitle: string) {
        router.post(updatepack.url(), {id, newtitle})
        setOnEdit(null)
        setNewTitle("")
    }

    return (
        <SheetContent side="right" className="w-170 sm:max-w-none items-center bg-transparent border border-white rounded-2xl">
            <SheetTitle className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-[20px] mt-5">MyTodo-Pack</SheetTitle>
            <div className="flex flex-col w-full mt-4">
                <ul className="list-disc pl-7">
                    {todopacklist?.map(pack => (
                        <div className="flex gap-1">
                        {OnEdit === pack.id ? (
                            <input 
                            value={NewTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            maxLength={60}
                            onKeyDown={(key) => {if (key.key === "Enter") {UpdateTitle(pack.id, NewTitle)}}} 
                            placeholder="<edit your pack>"
                            className="[-webkit-text-stroke:0.3px_black] h-14 w-full font-happy-markers items-center text-orange-500 placeholder:text-orange-500 border border-orange-300 rounded-2xl pr-3">
                            </input>
                        ) : (
                            <li id={`todopack-${pack.id}`} className="[-webkit-text-stroke:0.3px_black] rounded-md p-3 hover:bg-border active:bg-border font-happy-markers text-[17px]" onClick={() => GetTodoList(pack.id)}>
                                {pack.title}
                            </li>
                        )}
                            <div className="flex justify-center items-center">
                                <Pencil id="edit-icon"className="w-[40] h-[40] mr-2.5" onClick={() => {setNewTitle(pack.title); setOnEdit(pack.id)}}/>
                                <Trash2 id="trash-icon" className="w-[40] h-[40]" onClick={() => DeleteTodoPack(pack.id)}/>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>

            {/* manage input todo pack */}
            <div>
                <AddTodoPack />
            </div>
        </SheetContent>
    )
}