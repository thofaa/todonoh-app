<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('todo_list');

        Schema::create('todo_list', function (Blueprint $table) {
            $table->id();
            $table->string("desc");
            $table->foreignId("idpack")->constrained("todo_pack")->cascadeOnDelete();
            $table->boolean("checked")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_list');
    }
};
