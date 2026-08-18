import { updatelistchecked } from "@/routes/todolist";
import { router } from '@inertiajs/react';

export default function IndexTodoList({arrtodopack}: {arrtodopack: Array<{id: number, desc: string, idpack: number, checked: boolean, created_at: string, updated_at: string}>}) {
    function ToggleChecked(id: number, checked: boolean) {
        router.post(updatelistchecked.url(), {id, checked})
    }

    return arrtodopack.map(element => (
            <div id={`todolist-${element.id}`}>
                <div className="flex w-17 h-17 mr-3 justify-center items-center">
                    <input type="checkbox" checked={element.checked} onChange={() => ToggleChecked(element.id, element.checked)} className="w-14 h-14"></input>
                </div>
                <div className="flex h-17 w-full items-center pr-3">
                    <p className={`flex h-15 font-happy-markers font-stretch-extra-condensed text-white items-center ${element.checked ? "line-through" : ""}`}>{element.desc}</p>
                </div>
            </div>
        )
    )
}