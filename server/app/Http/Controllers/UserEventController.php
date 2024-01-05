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
        $events = $user->events()->select('events.id', 'events.name', 'events.date', 'events.place')->get();

        return response()->json($events);
    }

    public function getAssistants($id){
        $event = Events::where('IdEvents', $id)->first();

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $users = $event->assistants()->select('users.name', 'users.email')->get();

        return response()->json($users);
    }

    public function getTotalAssistants($id){
        $event = Events::where('IdEvents', $id)->first();

        if (!$event) {
            return response()->json(0);
        }
        $count = $event->assistants()->count();

        return response()->json($count);
    }

    public function getPaidAssistants($id){
        $event = Events::where('IdEvents', $id)->first();

        if (!$event) {
            return response()->json(0);
        }
        $data = $event->assistants()->select('users.name', 'users.email', 'user_event_registration.registered_date', 'user_event_registration.payment_id')->where('user_event_registration.paid_date', '!=', null)->get();

        return response()->json($data);
    }

    public function registeredEventsFromUser($email){
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $data = $user->registeredEvents()->select('events.id', 'events.name', 'events.date', 'events.place', 'user_event_registration.registered_date', 'user_event_registration.paid_date')->get();

        return response()->json($data);
    }

    public function paidEventsFromUser($email){
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $data = $user->registeredEvents()->select('events.id', 'events.name', 'events.date', 'events.place', 'user_event_registration.registered_date', 'user_event_registration.paid_date')
                                        ->where('user_event_registration.paid_date', '!=', null)->get();

        return response()->json($data);
    }
}
