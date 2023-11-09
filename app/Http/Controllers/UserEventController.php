<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Events;
use App\Models\User;
use App\Models\User_Event_Registration;
use Illuminate\Http\Request;

class UserEventController extends Controller
{
    public function getUserEvents($email){
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $events = $user->events()->select(['events.id', 'events.name', 'events.date', 'events.place'])->get();

        return response()->json($events, 200);
    }

    public function getAssistants($id){
        $event = Events::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $users = $event->assistants()->select(['users.name', 'users.email'])->get();

        return response()->json($users, 200);
    }

    public function getTotalAssistants($id){
        $event = Events::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $count = $event->assistants()->count();

        return response()->json($count, 200);
    }
}
