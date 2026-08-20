<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoPack;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoListController extends Controller
{
    //todopack as a parent and todolist as a child
    public function index(int $id) {
        return Inertia::render('welcome', [
            'todopackindex' => TodoPack::all(),
            'todolistindex' => [TodoPack::with('todopack')->where('id', $id)->first()]]);
    }

    public function addnewtodolist(Request $request) {
        TodoList::create([
            "desc" => $request->input("desc"), //using post method, so that it will use input method
            "idpack" => $request->input("idpack")
        ]);

        //return redirect()->back();
    }

    public function updatedesc(int $id, string $newdesc) {
        TodoList::where('id', $id)->update(['desc' => $newdesc]);
    }

    public function updatechecked(int $id, bool $checked) {
        TodoList::where('id', $id)->update(['checked' => !$checked]);
    }

    public function deletetodolist(int $id) {
        $todolist = TodoList::find($id);
        $todolist->delete();
    }
}
