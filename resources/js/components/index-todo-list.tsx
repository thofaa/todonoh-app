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
        <div className="flex mt-4">
            {OnEdit === element.id ? (
                <div className="flex h-14">
                    <input type="checkbox" checked={element.checked} onChange={() => ToggleChecked(element.id, element.checked)} className="w-14 h-14"></input>
                    <input 
                    value={NewText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(key) => {if (key.key === "Enter") {UpdateDesc(element.id, NewText)}}} 
                    placeholder="<edit your todo>"
                    className="h-14 w-full font-happy-markers items-center text-orange-300 placeholder:text-orange-300 border border-orange-300 rounded-2xl pr-3">
                    </input>
                </div>
            ) : (
                <div id={`todolist-${element.id}`} className="flex h-14">
                    <input type="checkbox" checked={element.checked} onChange={() => ToggleChecked(element.id, element.checked)} className="w-14 h-14"></input>
                    <div className="ml-2 mr-2">
                        <p className={`flex h-14 font-happy-markers text-white justify-center items-center ${element.checked ? "line-through" : ""}`}>{element.desc}</p>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center">
                <Pencil id="edit-icon"className="w-[40] h-[40] mr-2.5" onClick={() => {setNewText(element.desc); setOnEdit(element.id)}}/>
                <Trash2 id="trash-icon" className="w-[40] h-[40]" onClick={() => DeleteTodoList(element.id)}/>
            </div>
        </div>)
    )
}