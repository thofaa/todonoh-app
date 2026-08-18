<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TodoPack extends Model
{
    use HasFactory;

    protected $table = "todo_pack";

    //fillable atribute is used to protect our model from malicious input
    //especially for mass assignment process using create or update function
    protected $fillable = [
        'title'
    ];

    public function todopack(): HasMany {
        return $this->hasMany(TodoList::class, "idpack"); //this makes relationship one to many
    }
}
