<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoPack;
use Inertia\Inertia;

class TodoListController extends Controller
{
    //todopack as a parent and todolist as a child
    public function index(int $id) {
        return Inertia::render('welcome', ['todolistindex' => TodoPack::with('todopack')->where('id', $id)->first()]);
    }

    public function addnewtodolist(string $desc, int $idpack) {
        TodoList::create(["desc" => $desc, "idpack" => $idpack]); //create new row to database
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
