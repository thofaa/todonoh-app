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

        return redirect()->back();
    }

    public function updatedesc(Request $request) {
        $id = $request->input('id');
        $newdesc = $request->input('newdesc');
        TodoList::where('id', $id)->update(['desc' => $newdesc]);

        return redirect()->back();
    }

    public function updatechecked(int $id, bool $checked) {
        TodoList::where('id', $id)->update(['checked' => !$checked]);
    }

    public function deletetodolist(Request $request) {
        $id = $request->input('id');
        TodoList::find($id)->delete();

        return redirect()->back();
    }
}
