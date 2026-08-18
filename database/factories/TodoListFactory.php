<?php

namespace Database\Factories;

use App\Models\TodoList;
use App\Models\TodoPack;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TodoList>
 */
class TodoListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "desc" => fake()->sentence(),
            "idpack" => fake()->numberBetween(1, TodoPack::count()),
            "checked" => fake()->boolean()
        ];
    }

    public function nulldesc(): static 
    {
        return $this->state(["desc" => "lorem ipsum"]);
    }
}
