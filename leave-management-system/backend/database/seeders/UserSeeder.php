<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role_id' => Role::where('name', 'admin')->first()->id,
        ]);

        // Employee user
        User::create([
            'name' => 'Employee One',
            'email' => 'employee1@example.com',
            'password' => bcrypt('password'),
            'role_id' => Role::where('name', 'employee')->first()->id,
        ]);
    }
}
