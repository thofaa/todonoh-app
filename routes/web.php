<?php

use App\Http\Controllers\TodoListController;
use App\Http\Controllers\TodoPackController;
use Illuminate\Support\Facades\Route;

//initial load page
Route::get('/', [TodoPackController::class, 'index'])->name('home');

//todopack part
Route::post('/addnewtodopack', [TodoPackController::class, 'addnewtodopack'])->name('todopack.addpack');
Route::post('/deletetodopack', [TodoPackController::class, 'deletetodopack'])->name('todopack.deletepack');
Route::post('/updatetodopack', [TodoPackController::class, 'updatetodopack'])->name('todopack.updatepack');

//todolist part
Route::get('/todolistall/{id}', [TodoListController::class, 'index'])->name('todolist.indexlist');
Route::post('/addnewtodolist', [TodoListController::class, 'addnewtodolist'])->name('todolist.addlist');
Route::post('/deletetodolist', [TodoListController::class, 'deletetodolist'])->name('todolist.deletelist');
Route::post('/updatetodolistdesc', [TodoListController::class, 'updatedesc'])->name('todolist.updatelistdesc');
Route::post('/updatetodolistchecked', [TodoListController::class, 'updatechecked'])->name('todolist.updatelistchecked');
