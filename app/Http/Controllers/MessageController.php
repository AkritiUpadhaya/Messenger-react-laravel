<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Group;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class MessageController extends Controller
{
    public function byUser(User $user)
    {
        $messages= Message::where('sender_id', Auth::id())
        ->where('receiver_id', $user->id)
        ->orWhere('sender_id', $user->id)
        ->where('receiver_id',Auth::id())
        ->latest()
        ->paginate(10);
        return inertia('Home',[
            'selectedConversation'=>$user->toconversationArray(),
            'messages'=> MessageResource::collection($messages)
        ]);
    } 
    public function byGroup(Group $group){

    }
    public function loadOlder(Message $message){

    }
    public function store(StoreMessageRequest $request){

    } 
    public function destroy(Message $message){

    }
};
