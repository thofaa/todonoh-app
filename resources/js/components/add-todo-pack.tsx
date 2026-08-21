import { Form } from "@inertiajs/react"
import { addpack } from "@/routes/todopack"
import { useState } from "react"

export default function AddTodoPack() {
    const [todopacknew, settodopacknew] = useState("")

    return (
        <>
            <Form action={addpack.url()} method="post">
                {({processing, errors}) => (
                    <input
                    name="title"
                    value={todopacknew}
                    onChange={(e) => settodopacknew(e.target.value)}
                    maxLength={60}
                    placeholder="<add new pack>"
                    onKeyDown={(e) => {if (e.key === "Enter") {requestAnimationFrame(() => settodopacknew(""))}}}
                    disabled={processing}
                    className="[-webkit-text-stroke:0.3px_black] font-happy-markers text-orange-300 placeholder:text-orange-300 border border-orange-300 rounded-2xl">
                    </input>
                )}
            </Form>
        </>
    )
}