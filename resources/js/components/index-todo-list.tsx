import { deletelist, updatelistchecked, updatelistdesc } from "@/routes/todolist";
import { router } from '@inertiajs/react';
import { Trash2, Pencil } from "lucide-react"
import { useState } from "react";

export default function IndexTodoList({arrtodopack}: {arrtodopack: Array<{id: number, desc: string, idpack: number, checked: boolean, created_at: string, updated_at: string}>}) {
    const [OnEdit, setOnEdit] = useState<number | null>(null)
    const [NewText, setNewText] = useState("")

    function ToggleChecked(id: number, checked: boolean) {
        router.post(updatelistchecked.url(), {id, checked})
    }

    function DeleteTodoList(id: number) {
        router.post(deletelist.url(), {id})
    }

    function UpdateDesc(id: number, newdesc: string) {
        router.post(updatelistdesc.url(), {id, newdesc})
        setOnEdit(null)
        setNewText("")
    }

    return arrtodopack.map(element => (
        <div className="flex h-11 mt-6.5">
            <div>
                <input type="checkbox" checked={element.checked} onChange={() => ToggleChecked(element.id, element.checked)} 
                className="w-11 h-11 text-teal-600 bg-neutral-secondary-medium border-default-medium rounded-xs focus:ring-teal-500 dark:focus:ring-teal-600 ring-offset-neutral-primary focus:ring-2"></input>
            </div>
            {OnEdit === element.id ? (
                <div>
                    <input
                    value={NewText}
                    onChange={(e) => setNewText(e.target.value)}
                    maxLength={250}
                    onKeyDown={(key) => {if (key.key === "Enter") {UpdateDesc(element.id, NewText)}}} 
                    placeholder="<edit your todo>"
                    className="[-webkit-text-stroke:0.3px_black] h-11 font-happy-markers items-center text-orange-500 placeholder:text-orange-500 placeholder:justify-center border border-orange-500 rounded-2xl pr-3">
                    </input>
                </div>
            ) : (
                <div className="ml-2 mr-2">
                    <p className={`[-webkit-text-stroke:0.3px_black] flex h-11 font-happy-markers text-white justify-center items-center ${element.checked ? "line-through decoration-orange-400" : ""}`}>{element.desc}</p>
                </div>
            )}
            <div className="flex justify-center items-center">
                <Pencil id="edit-icon"className="w-[40] h-[40] mr-2.5" onClick={() => {setNewText(element.desc); setOnEdit(element.id)}}/>
                <Trash2 id="trash-icon" className="w-[40] h-[40]" onClick={() => DeleteTodoList(element.id)}/>
            </div>
        </div>)
    )
}