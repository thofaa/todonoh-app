<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoPack;
use Inertia\Inertia;

class TodoPackController extends Controller
{
    //display all todopack with NO todolist child
    public function index() {
        return Inertia::render('welcome', ["todopackindex" => TodoPack::all()]);
    }

    //display all todolists as a parent and the todopacks as a child
    public function search() {
        $todolistdata = TodoList::with("todolist")->get();
        return view("todolistview", ["todolistdata" => $todolistdata]);
    }

    public function addnewtodopack(string $title) {
        TodoPack::create(["title" => $title]);
    }

    public function updatetodopack(int $id, string $title) {
        TodoPack::where('id', $id)->update(['title' => $title]);
    }

    public function deletetodopack(int $id) {
        $todopack = TodoPack::find($id);
        $todopack->delete();
    }
}
