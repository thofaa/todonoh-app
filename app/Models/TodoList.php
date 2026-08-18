<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TodoList extends Model
{
    use HasFactory;
    
    protected $table = "todo_list";

    protected $fillable = [
        "desc",
        "idpack"
    ];

    public function todolist(): BelongsTo {
        return $this->belongsTo(TodoPack::class, "idpack");
    }
}
