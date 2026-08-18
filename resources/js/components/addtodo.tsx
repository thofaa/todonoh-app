import { Trash2, Pencil, Check } from "lucide-react"
import { useState } from "react"

export default function Addtodo(
    {id, text, condition, ontoggle, onremove, onedit, edit, onsave} : { //this is the convention parameter for jsx function
        id: number,
        text: string,
        condition: boolean,
        ontoggle: (() => void),
        onremove: (() => void),
        onedit: (() => void),
        edit: boolean,
        onsave: ((newtext: string) => void)}) {

    const [newtext, setnewtext] = useState(text)

    return (
            <div id={`todo-${id}`} className="flex h-17">
                {edit ? (
                    <>
                        <div className="flex w-17 h-17 mr-3 justify-center items-center">
                            <input type="checkbox" checked={condition} onChange={() => ontoggle()} className="w-14 h-14"></input>
                        </div>
                        <div className="flex h-17 w-full items-center pr-3">
                            <input value={newtext}
                            onChange={(e) => setnewtext(e.target.value)} 
                            onKeyDown={(key) => {if (key.key === "Enter") {onsave(newtext)}}} 
                            placeholder="<edit your todo>"
                            className="h-15 w-full font-happy-markers font-stretch-extra-condensed items-center text-orange-300 placeholder:text-orange-300 border border-orange-300 rounded-2xl">
                            </input>
                        </div>
                    </>)
                    : (
                    )}
                <div className="flex justify-center items-center">
                    <Pencil id="edit-icon"className="w-[40] h-[40] mr-2.5" onClick={() => onedit()}/>
                    <Trash2 id="trash-icon" className="w-[40] h-[40]" onClick={() => onremove()}/>
                </div>
            </div>
    )
}