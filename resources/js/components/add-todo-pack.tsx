import { Form } from "@inertiajs/react"
import { addpack } from "@/routes/todopack"

export default function AddTodoPack() {
    return (
        <div>
            <Form action={addpack.url()} method="post">
                {({processing, errors}) => (
                    <input
                    name="title"
                    placeholder="<add new pack>" 
                    disabled={processing}
                    className="font-happy-markers font-stretch-extra-condensed items-center text-orange-300 placeholder:text-orange-300 border border-orange-300 rounded-2xl">
                    </input>
                )}
            </Form>
        </div>
    )
}