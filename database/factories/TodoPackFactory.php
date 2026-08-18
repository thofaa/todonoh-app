<?php

namespace Database\Factories;

use App\Models\TodoPack;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TodoPack>
 */
class TodoPackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => fake()->sentence()
        ];
    }

    public function nulltitle(): static
    {
        return $this->state(["title" => "lorem ipsum"]);
    }
}
