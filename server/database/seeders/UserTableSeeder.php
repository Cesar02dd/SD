<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = array(
            array('id' => '1','name' => 'Diogo','email' => 'test@gmail.com','password' => '$2y$10$4LzKs0hZlUU0Ox/P3gh0/e5MjRBg0wVf74R2DNrHlYHSXIAI4mska','remember_token' => 'AUUR94Z6cUHlrD4Vfup0bIgQ002ukD2woJjfK733UBpHJfSvL6yBF9kbueq6','created_at' => '2018-01-04 15:18:13','updated_at' => '2018-01-04 15:18:13'),
            array('id' => '2','name' => 'John','email' => 'john@gmail.com','password' => '$2y$10$.eFnvAeKtd9yoMTt/08uQ.8hg37ARUNzsXmG9WkzTO.5VQRPflbdy','remember_token' => 'AImnDfn4AVvaYuPacsiHacoz8LqIMMBPJQnIx2DMNSG32K9SX615b3XLUe6U','created_at' => '2018-01-04 15:44:07','updated_at' => '2018-01-04 15:44:07'),
            array('id' => '3','name' => 'Sara','email' => 'sara@gmail.com','password' => '$2y$10$.eFnvAeKtd9yoMTt/08uQ.8hg37ARUNzsXmG9WkzTO.5VQRPflbdy','remember_token' => '2JBWSad58JNr18lCThonR5QgYkcm5Aoua15gfo3E0hdvoBcoHRqcqQ4fXMAa','created_at' => '2018-01-04 15:44:07','updated_at' => '2018-01-04 15:44:07'),
            array('id' => '4','name' => 'Peter','email' => 'peter@gmail.com','password' => '$2y$10$.eFnvAeKtd9yoMTt/08uQ.8hg37ARUNzsXmG9WkzTO.5VQRPflbdy','remember_token' => 'SZCzqKUMsdOcI4yzRcaqRXBgVZLWqr10SVJpmAy0INqp5Z2VA4IOnkcJH9z1','created_at' => '2018-01-04 15:44:07','updated_at' => '2018-01-04 15:44:07'),
        );

        User::insert($users);
    }
}
