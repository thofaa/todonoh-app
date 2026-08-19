import { SheetContent, SheetTitle } from "./ui/sheet";
import AddTodoPack from "./add-todo-pack";
import { router } from '@inertiajs/react';
import { indexlist } from "@/routes/todolist";

export default function TodoSideBar({todopacklist=[]}: {todopacklist?: Array<{id: number, title: string}>}) {
    function GetTodoList(id: number) {
        router.get(indexlist.url({id}))
    }

    return (
        <SheetContent side="right" className="w-100 items-center bg-transparent border border-white rounded-2xl">
            <SheetTitle className="font-happy-markers text-[20px] mt-5">Menu</SheetTitle>
            <div className="flex flex-col mt-4">
                <ul>
                    {todopacklist?.map(pack => 
                        <li id={`todopack-${pack.id}`} className="font-happy-markers text-[17px]" onClick={() => GetTodoList(pack.id)}>
                            {pack.title}
                        </li>
                    )}
                </ul>
            </div>

            {/* manage input todo pack */}
            <AddTodoPack />
        </SheetContent>
    )
}